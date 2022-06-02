import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import List "mo:base/List";
import Array "mo:base/Array";
import Option "mo:base/Option";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Types "./Types";
import Debug "mo:base/Debug";
import Order "mo:base/Order";

//Note: All credit to the maintainers of repo: git@github.com:dfinity/examples.git 
// see example -> # DIP721 NFT Container

//({ caller = initializer })

shared ({ caller = initializer }) actor class Dip721NFT(custodian: Principal, init : Types.Dip721NonFungibleToken) = Self {
  stable var transactionId: Types.TransactionId = 0;
  stable var nfts = List.nil<Types.Nft>();
  stable var custodians = List.make<Principal>(custodian);
  stable var logo : Types.LogoResult = init.logo;
  stable var name : Text = init.name;
  stable var symbol : Text = init.symbol;
  stable var maxLimit : Nat16 = init.maxLimit;

  private let MAX_USERS = 1_000;
  private let MAX_NOTES_PER_USER = 500;
  private let MAX_DEVICES_PER_USER = 6;
  private let MAX_NOTE_CHARS = 500;
  private let MAX_DEVICE_ALIAS_LENGTH = 200;
  private let MAX_PUBLIC_KEY_LENGTH = 500;
  private let MAX_CYPHERTEXT_LENGTH = 40_000;

  private type PrincipalName = Text;

  public shared({ caller }) func whoami(): async Text {
     return Principal.toText(caller);
  };

  public type Contract = {
    id: Nat;
    contract_description: Text;
    scope_of_work: Text;
    price_of_contract: Nat;
    terms_of_ownership: Text;
    creator: Text;
    creator_rating: Nat;
    allowed_number_of_owners: Nat;
  };

  // public type Description = {
  //   description: Text;
  // }

  // private func is_user_registered(principal: Principal): Bool {
  //     Option.isSome(users.get(principal));
  // };  

public shared ({caller}) func create_contract(id: Nat, description: Text, scopeOfWork: Text, price: Nat, terms: Text, creator: Text, rating: Nat, maxOwners: Nat){
    assert not Principal.isAnonymous(caller);
    assert description.size() <= MAX_NOTE_CHARS;
    assert scopeOfWork.size() <= MAX_NOTE_CHARS;
    assert terms.size() <= MAX_NOTE_CHARS;
  
  // create the contract object with these params and call each method - eg. pass descrip into add_description
};

public shared({ caller }) func add_description(description: Text): async () {
    assert not Principal.isAnonymous(caller);
    // assert is_user_registered(caller);
    assert description.size() <= MAX_NOTE_CHARS;

      Debug.print("Adding note...");

    let principalName = Principal.toText(caller);
    //create contract and add description to it
    //contract must be some hashmap or structure that allows to hold the data
    //perhaps make a custom structure that can hold all the data in a unique way

    };

//debug function to help assert code - like try-catch
  private func expect<T>(opt: ?T, violation_msg: Text): T {
    switch (opt) {
        case (null) {
            Debug.trap(violation_msg);
        };
        case (?x) {
             x
        };
    };
  };
  

  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");

  public query func balanceOfDip721(user: Principal) : async Nat64 {
    return Nat64.fromNat(
      List.size(
        List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user })
      )
    );
  };

  public query func ownerOfDip721(token_id: Types.TokenId) : async Types.OwnerResult {
    let item = List.get(nfts, Nat64.toNat(token_id));
    switch (item) {
      case (null) {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.owner);
      };
    };
  };

  public shared({ caller }) func safeTransferFromDip721(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {  
    if (to == null_address) {
      return #Err(#ZeroAddress);
    } else {
      return transferFrom(from, to, token_id, caller);
    };
  };

  public shared({ caller }) func transferFromDip721(from: Principal, to: Principal, token_id: Types.TokenId) : async Types.TxReceipt {
    return transferFrom(from, to, token_id, caller);
  };

  func transferFrom(from: Principal, to: Principal, token_id: Types.TokenId, caller: Principal) : Types.TxReceipt {
    let item = List.get(nfts, Nat64.toNat(token_id));
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        if (
          caller != token.owner and
          not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })
        ) {
          return #Err(#Unauthorized);
        } else if (Principal.notEqual(from, token.owner)) {
          return #Err(#Other);
        } else {
          nfts := List.map(nfts, func (item : Types.Nft) : Types.Nft {
            if (item.id == token.id) {
              let update : Types.Nft = {
                owner = to;
                id = item.id;
                metadata = token.metadata;
              };
              return update;
            } else {
              return item;
            };
          });
          transactionId += 1;
          return #Ok(transactionId);   
        };
      };
    };
  };

  public query func supportedInterfacesDip721() : async [Types.InterfaceId] {
    return [#TransferNotification, #Burn, #Mint];
  };

  public query func logoDip721() : async Types.LogoResult {
    return logo;
  };

  public query func nameDip721() : async Text {
    return name;
  };

  public query func symbolDip721() : async Text {
    return symbol;
  };

  public query func totalSupplyDip721() : async Nat64 {
    return Nat64.fromNat(
      List.size(nfts)
    );
  };

  public query func getMetadataDip721(token_id: Types.TokenId) : async Types.MetadataResult {
    let item = List.get(nfts, Nat64.toNat(token_id));
    switch (item) {
      case null {
        return #Err(#InvalidTokenId);
      };
      case (?token) {
        return #Ok(token.metadata);
      }
    };
  };

  public query func getMaxLimitDip721() : async Nat16 {
    return maxLimit;
  };

  public func getMetadataForUserDip721(user: Principal) : async Types.ExtendedMetadataResult {
    let item = List.find(nfts, func(token: Types.Nft) : Bool { token.owner == user });
    switch (item) {
      case null {
        return #Err(#Other);
      };
      case (?token) {
        return #Ok({
          metadata_desc = token.metadata;
          token_id = token.id;
        });
      }
    };
  };

  public query func getTokenIdsForUserDip721(user: Principal) : async [Types.TokenId] {
    let items = List.filter(nfts, func(token: Types.Nft) : Bool { token.owner == user });
    let tokenIds = List.map(items, func (item : Types.Nft) : Types.TokenId { item.id });
    return List.toArray(tokenIds);
  };

  public shared({ caller }) func mintDip721(to: Principal, metadata: Types.MetadataDesc) : async Types.MintReceipt {
    if (not List.some(custodians, func (custodian : Principal) : Bool { custodian == caller })) {
      return #Err(#Unauthorized);
    };

    let newId = Nat64.fromNat(List.size(nfts));
    let nft : Types.Nft = {
      owner = to;
      id = newId;
      metadata = metadata;
    };

    nfts := List.push(nft, nfts);

    transactionId += 1;

    return #Ok({
      token_id = newId;
      id = transactionId;
    });
  };
}