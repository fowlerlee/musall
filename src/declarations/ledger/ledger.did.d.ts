import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface AccountBalanceArgs { 'account' : AccountIdentifier }
export type AccountIdentifier = string;
export interface ArchiveOptions {
  'num_blocks_to_archive' : bigint,
  'trigger_threshold' : bigint,
  'max_message_size_bytes' : [] | [bigint],
  'node_max_memory_size_bytes' : [] | [bigint],
  'controller_id' : Principal,
}
export type BlockHeight = bigint;
export interface Duration { 'secs' : bigint, 'nanos' : number }
export interface ICPTs { 'e8s' : bigint }
export interface LedgerCanisterInitPayload {
  'send_whitelist' : Array<Principal>,
  'minting_account' : AccountIdentifier,
  'transaction_window' : [] | [Duration],
  'max_message_size_bytes' : [] | [bigint],
  'archive_options' : [] | [ArchiveOptions],
  'initial_values' : Array<[AccountIdentifier, ICPTs]>,
}
export type Memo = bigint;
export interface NotifyCanisterArgs {
  'to_subaccount' : [] | [SubAccount],
  'from_subaccount' : [] | [SubAccount],
  'to_canister' : Principal,
  'max_fee' : ICPTs,
  'block_height' : BlockHeight,
}
export interface SendArgs {
  'to' : AccountIdentifier,
  'fee' : ICPTs,
  'memo' : Memo,
  'from_subaccount' : [] | [SubAccount],
  'created_at_time' : [] | [TimeStamp],
  'amount' : ICPTs,
}
export type SubAccount = Array<number>;
export interface TimeStamp { 'timestamp_nanos' : bigint }
export interface Transaction {
  'memo' : Memo,
  'created_at' : BlockHeight,
  'transfer' : Transfer,
}
export type Transfer = {
    'Burn' : { 'from' : AccountIdentifier, 'amount' : ICPTs }
  } |
  { 'Mint' : { 'to' : AccountIdentifier, 'amount' : ICPTs } } |
  {
    'Send' : {
      'to' : AccountIdentifier,
      'from' : AccountIdentifier,
      'amount' : ICPTs,
    }
  };
export interface _SERVICE {
  'account_balance_dfx' : ActorMethod<[AccountBalanceArgs], ICPTs>,
  'notify_dfx' : ActorMethod<[NotifyCanisterArgs], undefined>,
  'send_dfx' : ActorMethod<[SendArgs], BlockHeight>,
}
