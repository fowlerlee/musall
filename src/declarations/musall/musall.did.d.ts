import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

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
export interface anon_class_21_1 {
  'creator_contract_submitted' : ActorMethod<[UserSubmission], Result>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_21_1 {}
