import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Contract {
  'id' : bigint,
  'scope_of_work' : string,
  'creator' : Principal,
  'price_of_contract' : bigint,
  'creator_rating' : bigint,
  'contract_description' : string,
  'buyers' : List,
  'allowed_number_of_owners' : bigint,
  'terms_of_ownership' : string,
}
export type List = [] | [[Principal, List]];
export type Result = { 'ok' : string } |
  { 'err' : string };
export interface anon_class_21_1 {
  'submit_contract' : ActorMethod<[Contract], Result>,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_21_1 {}
