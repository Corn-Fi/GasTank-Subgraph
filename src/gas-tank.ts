import { Address, BigInt, dataSource } from "@graphprotocol/graph-ts"
import {
  GasTank as GasTankContract,
  Approved,
  DepositGas,
  OwnershipTransferred,
  Paused,
  Pay,
  Unpaused,
  WithdrawGas
} from "../generated/undefined/GasTank"
import { GasTank, Payer, Payee, PayerPayee } from "../generated/schema"


export function getGasTank(): GasTank {
  let gastank = GasTank.load(dataSource.address().toHex())
  if(gastank === null) {
    gastank = new GasTank(dataSource.address().toHex())
    gastank.paused = false;
    gastank.balance = BigInt.fromI32(0)
    gastank.owner = Address.fromString('0x0000000000000000000000000000000000000000')
    gastank.feesCollected = BigInt.fromI32(0)
    gastank.save()
  }
  return gastank as GasTank
}

export function getPayee(_payee: Address): Payee {
  let payee = Payee.load(_payee.toHex())
  if(payee === null) {
    payee = new Payee(_payee.toHex())
    payee.approved = false
    payee.totalAmountPaid = BigInt.fromI32(0)
    payee.gasTank = getGasTank().id
    payee.save()
  }
  return payee as Payee
}

export function getPayer(_payer: Address): Payer {
  let payer = Payer.load(_payer.toHex())
  if(payer === null) {
    payer = new Payer(_payer.toHex())
    payer.amountDeposited = BigInt.fromI32(0)
    payer.totalAmountSpent = BigInt.fromI32(0)
    payer.gasTank = getGasTank().id
    payer.save()
  }
  return payer as Payer
}

export function getPayerPayee(_payer: Address, _payee: Address): PayerPayee {
  const id = _payer.toHex().concat('-').concat(_payee.toHex())
  let payerPayee = PayerPayee.load(id)

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (payerPayee === null) {
    payerPayee = new PayerPayee(id)
    payerPayee.payer = getPayer(_payer).id
    payerPayee.payee = getPayee(_payee).id
    payerPayee.totalAmountPaid = BigInt.fromI32(0)
    payerPayee.approved = false
    payerPayee.save()
  }

  return payerPayee as PayerPayee
}




export function handleApproved(event: Approved): void {
  let payerPayee = getPayerPayee(event.params.payer, event.params.payee)
  payerPayee.approved = event.params.approved
  payerPayee.save()
}


export function handleDepositGas(event: DepositGas): void {
  let payer = getPayer(event.params.user)
  payer.amountDeposited = payer.amountDeposited.plus(event.params.amount)
  payer.save()

  let gastank = getGasTank()
  gastank.balance = gastank.balance.plus(event.params.amount)
  gastank.save()
}

export function handleWithdrawGas(event: WithdrawGas): void {
  let payer = getPayer(event.params.user)
  payer.amountDeposited = payer.amountDeposited.minus(event.params.amount)
  payer.save()

  let gastank = getGasTank()
  gastank.balance = gastank.balance.minus(event.params.amount)
  gastank.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let gastank = getGasTank()
  gastank.owner = event.params.newOwner
  gastank.save()
}

export function handlePaused(event: Paused): void {
  let gastank = getGasTank()
  gastank.paused = true
  gastank.save()
}

export function handlePay(event: Pay): void {
  const fee = BigInt.fromI64(10000000000000000)
  const amountWithFee = event.params.amount.plus(fee)
  let payer = getPayer(event.params.payer)
  payer.amountDeposited = payer.amountDeposited.minus(amountWithFee)
  payer.totalAmountSpent = payer.totalAmountSpent.plus(amountWithFee)
  payer.save()

  let payee = getPayee(event.params.payee)
  payee.totalAmountPaid = payee.totalAmountPaid.plus(event.params.amount)
  payee.save()

  let payerPayee = getPayerPayee(event.params.payer, event.transaction.from)
  payerPayee.totalAmountPaid = payerPayee.totalAmountPaid.plus(event.params.amount)
  payerPayee.save()

  let gastank = getGasTank()
  gastank.balance = gastank.balance.minus(amountWithFee)
  gastank.feesCollected = gastank.feesCollected.plus(fee)
  gastank.save()
}

export function handleUnpaused(event: Unpaused): void {
  let gastank = getGasTank()
  gastank.paused = false
  gastank.save()
}
