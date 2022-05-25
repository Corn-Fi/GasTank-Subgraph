// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approved extends ethereum.Event {
  get params(): Approved__Params {
    return new Approved__Params(this);
  }
}

export class Approved__Params {
  _event: Approved;

  constructor(event: Approved) {
    this._event = event;
  }

  get payer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get payee(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class DepositGas extends ethereum.Event {
  get params(): DepositGas__Params {
    return new DepositGas__Params(this);
  }
}

export class DepositGas__Params {
  _event: DepositGas;

  constructor(event: DepositGas) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Pay extends ethereum.Event {
  get params(): Pay__Params {
    return new Pay__Params(this);
  }
}

export class Pay__Params {
  _event: Pay;

  constructor(event: Pay) {
    this._event = event;
  }

  get payer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get payee(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class WithdrawGas extends ethereum.Event {
  get params(): WithdrawGas__Params {
    return new WithdrawGas__Params(this);
  }
}

export class WithdrawGas__Params {
  _event: WithdrawGas;

  constructor(event: WithdrawGas) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class GasTank extends ethereum.SmartContract {
  static bind(address: Address): GasTank {
    return new GasTank("GasTank", address);
  }

  _approvedPayees(param0: Address): boolean {
    let result = super.call(
      "_approvedPayees",
      "_approvedPayees(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBoolean();
  }

  try__approvedPayees(param0: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "_approvedPayees",
      "_approvedPayees(address):(bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  approvedPayees(param0: BigInt): Address {
    let result = super.call(
      "approvedPayees",
      "approvedPayees(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_approvedPayees(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "approvedPayees",
      "approvedPayees(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  feeAddress(): Address {
    let result = super.call("feeAddress", "feeAddress():(address)", []);

    return result[0].toAddress();
  }

  try_feeAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("feeAddress", "feeAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  txFee(): BigInt {
    let result = super.call("txFee", "txFee():(uint256)", []);

    return result[0].toBigInt();
  }

  try_txFee(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("txFee", "txFee():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userGasAmounts(param0: Address): BigInt {
    let result = super.call(
      "userGasAmounts",
      "userGasAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_userGasAmounts(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userGasAmounts",
      "userGasAmounts(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  userPayeeApprovals(param0: Address, param1: Address): boolean {
    let result = super.call(
      "userPayeeApprovals",
      "userPayeeApprovals(address,address):(bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );

    return result[0].toBoolean();
  }

  try_userPayeeApprovals(
    param0: Address,
    param1: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "userPayeeApprovals",
      "userPayeeApprovals(address,address):(bool)",
      [ethereum.Value.fromAddress(param0), ethereum.Value.fromAddress(param1)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class AddPayeeCall extends ethereum.Call {
  get inputs(): AddPayeeCall__Inputs {
    return new AddPayeeCall__Inputs(this);
  }

  get outputs(): AddPayeeCall__Outputs {
    return new AddPayeeCall__Outputs(this);
  }
}

export class AddPayeeCall__Inputs {
  _call: AddPayeeCall;

  constructor(call: AddPayeeCall) {
    this._call = call;
  }

  get _payee(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class AddPayeeCall__Outputs {
  _call: AddPayeeCall;

  constructor(call: AddPayeeCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get _payee(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _approve(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class DepositGasCall extends ethereum.Call {
  get inputs(): DepositGasCall__Inputs {
    return new DepositGasCall__Inputs(this);
  }

  get outputs(): DepositGasCall__Outputs {
    return new DepositGasCall__Outputs(this);
  }
}

export class DepositGasCall__Inputs {
  _call: DepositGasCall;

  constructor(call: DepositGasCall) {
    this._call = call;
  }

  get _receiver(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DepositGasCall__Outputs {
  _call: DepositGasCall;

  constructor(call: DepositGasCall) {
    this._call = call;
  }
}

export class EmergencyWithdrawCall extends ethereum.Call {
  get inputs(): EmergencyWithdrawCall__Inputs {
    return new EmergencyWithdrawCall__Inputs(this);
  }

  get outputs(): EmergencyWithdrawCall__Outputs {
    return new EmergencyWithdrawCall__Outputs(this);
  }
}

export class EmergencyWithdrawCall__Inputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class EmergencyWithdrawCall__Outputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PayCall extends ethereum.Call {
  get inputs(): PayCall__Inputs {
    return new PayCall__Inputs(this);
  }

  get outputs(): PayCall__Outputs {
    return new PayCall__Outputs(this);
  }
}

export class PayCall__Inputs {
  _call: PayCall;

  constructor(call: PayCall) {
    this._call = call;
  }

  get _payer(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _payee(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _amount(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class PayCall__Outputs {
  _call: PayCall;

  constructor(call: PayCall) {
    this._call = call;
  }
}

export class RemovePayeeCall extends ethereum.Call {
  get inputs(): RemovePayeeCall__Inputs {
    return new RemovePayeeCall__Inputs(this);
  }

  get outputs(): RemovePayeeCall__Outputs {
    return new RemovePayeeCall__Outputs(this);
  }
}

export class RemovePayeeCall__Inputs {
  _call: RemovePayeeCall;

  constructor(call: RemovePayeeCall) {
    this._call = call;
  }

  get _payee(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RemovePayeeCall__Outputs {
  _call: RemovePayeeCall;

  constructor(call: RemovePayeeCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class WithdrawGasCall extends ethereum.Call {
  get inputs(): WithdrawGasCall__Inputs {
    return new WithdrawGasCall__Inputs(this);
  }

  get outputs(): WithdrawGasCall__Outputs {
    return new WithdrawGasCall__Outputs(this);
  }
}

export class WithdrawGasCall__Inputs {
  _call: WithdrawGasCall;

  constructor(call: WithdrawGasCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawGasCall__Outputs {
  _call: WithdrawGasCall;

  constructor(call: WithdrawGasCall) {
    this._call = call;
  }
}