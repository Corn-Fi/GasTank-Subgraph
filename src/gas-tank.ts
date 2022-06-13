import { Address, BigDecimal, BigInt, dataSource } from "@graphprotocol/graph-ts"
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

const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
const BIG_INT_ZERO = BigInt.fromI32(0)
const BIG_DECIMAL_ZERO = BigDecimal.zero()
const PRECISION = BigInt.fromI32(10).pow(18).toBigDecimal()


export function fetchGasTankContract(): GasTankContract {
  return GasTankContract.bind(dataSource.address())
}


export function getGasTank(): GasTank {
  let gastank = GasTank.load(dataSource.address().toHex())
  if(gastank === null) {
    gastank = new GasTank(dataSource.address().toHex())
    gastank.paused = false;
    gastank.balance = BIG_DECIMAL_ZERO
    gastank.owner = ADDRESS_ZERO
    gastank.feesCollected = BIG_DECIMAL_ZERO
    gastank.fee = fetchGasTankContract().txFee().toBigDecimal().div(PRECISION)
    gastank.save()
  }
  return gastank as GasTank
}

export function getPayee(_payee: Address): Payee {
  let payee = Payee.load(_payee.toHexString())
  if(payee === null) {
    let gastank = getGasTank()

    payee = new Payee(_payee.toHexString())
    payee.approved = false
    payee.gasTank = getGasTank().id
    payee.save()

    const gtPayees = gastank.payees
    const payeeArray = [payee.id]
    if(gtPayees === null) {
      gastank.payees = payeeArray
    }
    else {
      gastank.payees = gtPayees.concat(payeeArray)
    }
    gastank.save()
  }
  return payee as Payee
}

export function getPayer(_payer: Address): Payer {
  let payer = Payer.load(_payer.toHexString())
  if(payer === null) {
    let gastank = getGasTank()

    payer = new Payer(_payer.toHexString())
    payer.amountDeposited = BIG_DECIMAL_ZERO
    payer.totalAmountSpent = BIG_DECIMAL_ZERO
    payer.gasTank = gastank.id
    payer.save()

    const gtPayers = gastank.payers
    const payerArray = [payer.id]
    if(gtPayers === null) {
      gastank.payers = payerArray
    }
    else {
      gastank.payers = gtPayers.concat(payerArray)
    }
    gastank.save()
  }
  return payer as Payer
}

export function getPayerPayee(_payer: Address, _payee: Address): PayerPayee {
  const id = _payer.toHexString().concat('-').concat(_payee.toHexString())
  let payerPayee = PayerPayee.load(id)

  if (payerPayee === null) {
    payerPayee = new PayerPayee(id)
    payerPayee.payer = getPayer(_payer).id
    payerPayee.payee = getPayee(_payee).id
    payerPayee.approved = false
    payerPayee.save()

    let payer = getPayer(_payer)
    const payerPayees = payer.payees
    const payeeArray = [payerPayee.id]
    if(payerPayees === null) {
      payer.payees = payeeArray
    }
    else {
      payer.payees = payerPayees.concat(payeeArray)
    }
    payer.save()
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
  const depositAmount = event.params.amount.toBigDecimal().div(PRECISION)
  payer.amountDeposited = payer.amountDeposited.plus(depositAmount)
  payer.save()

  let gastank = getGasTank()
  gastank.balance = gastank.balance.plus(depositAmount)
  gastank.save()
}

export function handleWithdrawGas(event: WithdrawGas): void {
  let payer = getPayer(event.params.user)
  const withdrawAmount = event.params.amount.toBigDecimal().div(PRECISION)
  payer.amountDeposited = payer.amountDeposited.minus(withdrawAmount)
  payer.save()

  let gastank = getGasTank()
  gastank.balance = gastank.balance.minus(withdrawAmount)
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
  let gastank = getGasTank()

  const payAmount = event.params.amount.toBigDecimal().div(PRECISION)
  const amountWithFee = payAmount.plus(gastank.fee)

  gastank.balance = gastank.balance.minus(amountWithFee)
  gastank.feesCollected = gastank.feesCollected.plus(gastank.fee)
  gastank.save()

  let payer = getPayer(event.params.payer)
  payer.amountDeposited = payer.amountDeposited.minus(amountWithFee)
  payer.totalAmountSpent = payer.totalAmountSpent.plus(amountWithFee)
  payer.save()
}

export function handleUnpaused(event: Unpaused): void {
  let gastank = getGasTank()
  gastank.paused = false
  gastank.save()
}
