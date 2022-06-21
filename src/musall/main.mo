import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import List "mo:base/List";
import Map "mo:base/HashMap";
import Nat "mo:base/Nat";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Blob";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Trie "mo:base/Trie";
import Types "./Types";


shared ({ caller = initializer }) actor class Musall(init: Types.MusallStableStorage) = Self {
  stable var accounts = Types.accounts_fromArray(init.accounts);
  stable var contracts = Types.contracts_fromArray(init.contracts);
  // stable var next_contract_id : Nat = 0;
  stable var system_params : Types.SystemParams = init.system_params;

  func account_get(id : Principal) : ?Types.Tokens = Trie.get(accounts, Types.account_key(id), Principal.equal);
  func account_put(id : Principal, tokens : Types.Tokens) {
    accounts := Trie.put(accounts, Types.account_key(id), Principal.equal, tokens).0;
  };

  func contract_get(id : Nat) : ?Types.Contract = Trie.get(contracts, Types.contract_key(id), Nat.equal);
  func contract_put(id : Nat, contract : Types.Contract) {
    contracts := Trie.put(contracts, Types.contract_key(id), Nat.equal, contract).0;
  };

  stable var transactionId: Types.TransactionId = 0;

  private let MAX_CONTRACTS = 1_000;
  private let MAX_CONTRACTS_PER_USER = 5;
  private let MAX_NOTE_CHARS = 500;
  private let MAX_DEVICE_ALIAS_LENGTH = 200;
  private let MAX_PUBLIC_KEY_LENGTH = 500;
  private let MAX_CYPHERTEXT_LENGTH = 40_000;

  private type PrincipalName = Text;
  private stable var nextContractId: Nat = 1;

  public type buffer = Buffer.Buffer<Types.Contract>;
  public type bufferForPrincipals = Buffer.Buffer<Principal>;

  private var bufOfContracts : buffer = Buffer.Buffer<Types.Contract>(0);
  private var bufOfBuyers : bufferForPrincipals = Buffer.Buffer<Principal>(0);

  public shared({ caller }) func whoami(): async Text {
     return Principal.toText(caller);
  };

  type Profile = {
      id: Principal;
      account : Types.Account;
  };


    // type Result<Ok, Err> = { #ok : Ok; #err : Err };
  public type Result<T, E> = Result.Result<T, E>;
  public type BuyStakeError = { #notFound; #soldOut; #stakeAvailable };
  public type OperationStatus = { #complete; #failed };

//debug function to help assert code - like try-catch
  private func expect_operationstatus<T>(opt: ?T, violation_msg: Text): T {
        switch (opt) {
            case (null) {
                Debug.trap(violation_msg);
            };
            case (?x) {
                x
            };
        };
  };
  

  stable var profiles : Trie.Trie<Principal, Profile> = Trie.empty();

  public shared({ caller }) func create (account : Types.Account) : async Result.Result<Text, Text> {
        // Get caller principal
        let callerId = caller;

        // Reject AnonymousIdentity - check return type
        if(Principal.toText(callerId) == "2vxsx-fae") {
            throw Error.reject("Access denied to anonymous user. Please provide a Principal Id.")
        };

        // Associate user account with their principal and tokens
        let userProfile: Profile = {
            id = callerId;
            account = account;
        };

        let (newProfiles, existing) = Trie.put(
            profiles,           // Target trie
            key(callerId),      // Key
            Principal.equal,    // Equality checker
            userProfile
        );

       // If there is an original value, do not update
        switch(existing) {
            // If there are no matches, update profiles
            case null {
              profiles := newProfiles;
                 #ok("Profile created for Principal " #Principal.toText(caller))
            };
            // Matches pattern of type - opt Profile
            case (? v) {
              throw Error.reject("Profile exists for Principal " #Principal.toText(caller))
            };
        };

  };

  public shared({caller}) func creator_contract_submitted(userDescription: Text,
                                                          userScopeOfWork: Text,
                                                          priceOfContract: Nat,
                                                          termsOfOwnership: Text,
                                                          numberOfTokens: Nat,
                                                          url: Text): async Result.Result<Text, Text>{
    
    // assert not Principal.isAnonymous(caller); //add the II to this app asap like
    assert userDescription.size() <= MAX_NOTE_CHARS;
    assert userScopeOfWork.size() <= MAX_NOTE_CHARS;
    assert termsOfOwnership.size() <= MAX_NOTE_CHARS;
    assert numberOfTokens  > 0;

            let user_submit : Types.UserSubmission = {
                contract_description = userDescription;
                scope_of_work = userScopeOfWork;
                price_of_contract = priceOfContract;
                terms_of_ownership = termsOfOwnership;
                number_of_tokens = numberOfTokens;
                image_url = url;
            };

    bufOfBuyers.add(caller);

    //create contract
    switch(?submit_contract(user_submit, caller)){
      case(null){
        throw Error.reject("Contract submission not available at present")
      };
      case(value){
        #ok("Your contract submission was successfull")
      };
    };
  };

  private func submit_contract(us: Types.UserSubmission, creator: Principal) : async Result.Result<Text, Text> {
    
    assert nextContractId <= MAX_CONTRACTS;
                
        let principalName = Principal.toText(creator);
            let new_contract : Types.Contract = {
                id = nextContractId;
                contract_description = us.contract_description;
                scope_of_work = us.scope_of_work;
                terms_of_ownership = us.terms_of_ownership;
                creator = creator;
                price_of_contract = us.price_of_contract;
                creator_rating = 1;
                number_of_tokens = us.number_of_tokens;
                url = us.image_url;
                buyers = bufOfBuyers;
            };
            nextContractId += 1;
            Debug.print("Adding contract...");

            switch(?bufOfContracts.add(new_contract)){
              case(null){
                throw Error.reject("Contract not added")
              };
              case(value){
                #ok("Contract added by Principal " # principalName)
              };
            };
    };

    public func get_first_contract() : async Types.Contract {
        return bufOfContracts.get(0);
    };

    public func get_all_contracts(): async [Types.Contract] {
      return bufOfContracts.toArray();
    };

    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };

  let null_address : Principal = Principal.fromText("aaaaa-aa");

}