import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ApiError = { 'ZeroAddress' : null } |
  { 'InvalidTokenId' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : null };
export interface Dip721NFT {
  'add_description' : ActorMethod<[string], undefined>,
  'balanceOfDip721' : ActorMethod<[Principal], bigint>,
  'create_contract' : ActorMethod<
    [bigint, string, string, bigint, string, string, bigint, bigint],
    undefined,
  >,
  'getMaxLimitDip721' : ActorMethod<[], number>,
  'getMetadataDip721' : ActorMethod<[TokenId], MetadataResult>,
  'getMetadataForUserDip721' : ActorMethod<[Principal], ExtendedMetadataResult>,
  'getTokenIdsForUserDip721' : ActorMethod<[Principal], Array<TokenId>>,
  'logoDip721' : ActorMethod<[], LogoResult>,
  'mintDip721' : ActorMethod<[Principal, MetadataDesc], MintReceipt>,
  'nameDip721' : ActorMethod<[], string>,
  'ownerOfDip721' : ActorMethod<[TokenId], OwnerResult>,
  'safeTransferFromDip721' : ActorMethod<
    [Principal, Principal, TokenId],
    TxReceipt,
  >,
  'supportedInterfacesDip721' : ActorMethod<[], Array<InterfaceId>>,
  'symbolDip721' : ActorMethod<[], string>,
  'totalSupplyDip721' : ActorMethod<[], bigint>,
  'transferFromDip721' : ActorMethod<
    [Principal, Principal, TokenId],
    TxReceipt,
  >,
  'whoami' : ActorMethod<[], string>,
}
export interface Dip721NonFungibleToken {
  'maxLimit' : number,
  'logo' : LogoResult,
  'name' : string,
  'symbol' : string,
}
export type ExtendedMetadataResult = {
    'Ok' : { 'token_id' : TokenId, 'metadata_desc' : MetadataDesc }
  } |
  { 'Err' : ApiError };
export type InterfaceId = { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Approval' : null } |
  { 'TransactionHistory' : null } |
  { 'TransferNotification' : null };
export interface LogoResult { 'data' : string, 'logo_type' : string }
export type MetadataDesc = Array<MetadataPart>;
export interface MetadataKeyVal { 'key' : string, 'val' : MetadataVal }
export interface MetadataPart {
  'data' : Array<number>,
  'key_val_data' : Array<MetadataKeyVal>,
  'purpose' : MetadataPurpose,
}
export type MetadataPurpose = { 'Preview' : null } |
  { 'Rendered' : null };
export type MetadataResult = { 'Ok' : MetadataDesc } |
  { 'Err' : ApiError };
export type MetadataVal = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'Nat8Content' : number } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'BlobContent' : Array<number> } |
  { 'TextContent' : string };
export type MintReceipt = { 'Ok' : MintReceiptPart } |
  { 'Err' : ApiError };
export interface MintReceiptPart { 'id' : bigint, 'token_id' : TokenId }
export type OwnerResult = { 'Ok' : Principal } |
  { 'Err' : ApiError };
export type TokenId = bigint;
export type TxReceipt = { 'Ok' : bigint } |
  { 'Err' : ApiError };
export interface _SERVICE extends Dip721NFT {}
