import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export type PriceOfContract = bigint;
export type Result = { 'ok' : string } |
  { 'err' : string };
export type ScopeOfWork = string;
export type TermsOfOwnership = string;
export type URL = string;
export interface anon_class_22_1 {
  'creator_contract_submitted' : ActorMethod<
    [string, string, bigint, string, bigint, string],
    Result,
  >,
  'get_all_contracts' : ActorMethod<[], Array<Contract>>,
  'get_first_contract' : ActorMethod<[], Contract>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_22_1 {}
