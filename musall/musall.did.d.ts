import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account { 'owner' : Principal, 'tokens' : Tokens }
export interface Contract {
  'id' : bigint,
  'url' : URL,
  'scope_of_work' : ScopeOfWork,
  'creator' : Principal,
  'number_of_tokens' : bigint,
  'price_of_contract' : PriceOfContract,
  'creator_rating' : bigint,
  'contract_description' : ContractDescription,
  'terms_of_ownership' : TermsOfOwnership,
}
export type ContractDescription = string;
export interface Musall {
  'create' : ActorMethod<[Account], Result>,
  'creator_contract_submitted' : ActorMethod<
    [string, string, bigint, string, bigint, string],
    Result,
  >,
  'get_all_contracts' : ActorMethod<[], Array<Contract>>,
  'get_first_contract' : ActorMethod<[], Contract>,
  'whoami' : ActorMethod<[], string>,
}
export interface MusallStableStorage {
  'system_params' : SystemParams,
  'contracts' : Array<Contract>,
  'accounts' : Array<Account>,
}
export type PriceOfContract = bigint;
export type Result = { 'ok' : string } |
  { 'err' : string };
export type ScopeOfWork = string;
export interface SystemParams {
  'transfer_fee' : Tokens,
  'contract_submission_deposit' : Tokens,
  'contract_create_threshold' : Tokens,
}
export type TermsOfOwnership = string;
export interface Tokens { 'amount_e8s' : bigint }
export type URL = string;
export interface _SERVICE extends Musall {}
