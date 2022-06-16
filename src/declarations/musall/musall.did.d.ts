import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Contract {
  'id' : bigint,
  'scope_of_work' : ScopeOfWork,
  'creator' : Principal,
  'number_of_tokens' : bigint,
  'price_of_contract' : PriceOfContract,
  'creator_rating' : bigint,
  'contract_description' : ContractDescription,
  'terms_of_ownership' : TermsOfOwnership,
}
export type ContractDescription = string;
export type NumberOfTokens = bigint;
export type PriceOfContract = bigint;
export type Result = { 'ok' : string } |
  { 'err' : string };
export type ScopeOfWork = string;
export type TermsOfOwnership = string;
export interface UserSubmission {
  'scope_of_work' : ScopeOfWork,
  'number_of_tokens' : NumberOfTokens,
  'price_of_contract' : PriceOfContract,
  'contract_description' : ContractDescription,
  'terms_of_ownership' : TermsOfOwnership,
}
export interface anon_class_22_1 {
  'creator_contract_submitted' : ActorMethod<[UserSubmission], Result>,
  'getAllContracts' : ActorMethod<[], Array<Contract>>,
  'getFirstContract' : ActorMethod<[], Contract>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_22_1 {}
