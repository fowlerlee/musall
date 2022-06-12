import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'ok' : string } |
  { 'err' : string };
export interface anon_class_21_1 {
  'creator_contract_submitted' : ActorMethod<
    [string, string, bigint, string, bigint],
    Result,
  >,
  'submit_contract' : ActorMethod<
    [string, string, bigint, string, bigint, Principal],
    Result,
  >,
  'whoami' : ActorMethod<[], string>,
}
export interface _SERVICE extends anon_class_21_1 {}
