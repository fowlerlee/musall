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
import Types "./Types";


shared ({ caller = initializer }) actor class () {
  stable var transactionId: Types.TransactionId = 0;

  private let MAX_CONTRACTS = 1_000;
  private let MAX_CONTRACTS_PER_USER = 5;
  private let MAX_NOTE_CHARS = 500;
  private let MAX_DEVICE_ALIAS_LENGTH = 200;
  private let MAX_PUBLIC_KEY_LENGTH = 500;
  private let MAX_CYPHERTEXT_LENGTH = 40_000;

  private type PrincipalName = Text;
  private stable var nextNoteId: Nat = 1;

  type buffer = Buffer.Buffer<Contract>;
  type bufferForPrincipals = Buffer.Buffer<Principal>;

  private var bufOfContracts : buffer = Buffer.Buffer<Contract>(0);
  private var bufOfBuyers : bufferForPrincipals = Buffer.Buffer<Principal>(0);

  public shared({ caller }) func whoami(): async Text {
     return Principal.toText(caller);
  };

  public type SystemParams = {
    contract_creation_fee: Tokens;
    cost_per_token: Tokens;
  };

  public type ContractMarketStorage = {
    accounts: [Account];
    contracts: [Contract];
    system_params: SystemParams;
  };

  private type Contract = {
    id: Nat;
    contract_description: Text;
    scope_of_work: Text;
    price_of_contract: Nat;
    terms_of_ownership: Text;
    creator: Principal;
    creator_rating: Nat;
    allowed_number_of_owners: Nat;
    buyers : bufferForPrincipals;
  };

    // type Result<Ok, Err> = { #ok : Ok; #err : Err };
    public type Result<T, E> = Result.Result<T, E>;
    public type BuyStakeError = { #notFound; #soldOut; #stakeAvailable };
    public type OperationStatus = { #complete; #failed };
    public type Tokens = { amount_e8s : Nat }; 
    public type Account = { owner : Principal; tokens : Tokens };
    // public let oneToken = { amount_e8s = 10_000_000 };
    // public let zeroToken = { amount_e8s = 0 }; 
    public type TransferArgs = { to : Principal; amount : Tokens };

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

  public shared({caller}) func creator_contract_submitted(userDescription: Text,
                                                          userScopeOfWork: Text,
                                                          priceOfContract: Nat,
                                                          termsOfOwnership: Text,
                                                          numberOfTokens: Nat): async Result.Result<Text, Text>{
    
    // assert not Principal.isAnonymous(caller); //add the II to this app asap like
    assert userDescription.size() <= MAX_NOTE_CHARS;
    assert userScopeOfWork.size() <= MAX_NOTE_CHARS;
    assert termsOfOwnership.size() <= MAX_NOTE_CHARS;
    assert numberOfTokens  > 0;

    bufOfBuyers.add(caller);

    //create contract
    switch(?submit_contract(userDescription, userScopeOfWork, priceOfContract, termsOfOwnership, numberOfTokens, caller)){
      case(null){
        throw Error.reject("Contract submission not available at present")
      };
      case(value){
        #ok("Your contract submission was successfull")
      };
    };
  };

    public func submit_contract(userDescription: Text, 
                                                  userScopeOfWork: Text, 
                                                  priceOfContract: Nat, 
                                                  termsOfOwnership: Text, 
                                                  numberOfTokens: Nat,
                                                  creator: Principal) : async Result.Result<Text, Text> {
    
    assert nextNoteId <= MAX_CONTRACTS;
                
        let principalName = Principal.toText(creator);
            let new_contract : Contract = {
                id = nextNoteId;
                contract_description = userDescription;
                scope_of_work = userScopeOfWork;
                terms_of_ownership = termsOfOwnership;
                creator = creator;
                price_of_contract = priceOfContract;
                creator_rating = 1;
                allowed_number_of_owners = numberOfTokens;
                buyers = bufOfBuyers;
            };
            nextNoteId += 1;
            Debug.print("Adding note...");

            switch(?bufOfContracts.add(new_contract)){
              case(null){
                throw Error.reject("Not Found")
              };
              case(value){
                #ok("Contract added by Principal " # principalName)
              };
            };
    };


    // func deduct_contract_creation_fee(caller : Principal) : Types.Result<(), Text> {
    //     switch (account_get(caller)) {
    //     case null { #err "Caller needs an account to submit a proposal" };
    //     case (?from_tokens) {
    //              let threshold = system_params.proposal_submission_deposit.amount_e8s;
    //              if (from_tokens.amount_e8s < threshold) {
    //                  #err ("Caller's account must have at least " # debug_show(threshold) # " to submit a proposal")
    //              } else {
    //                  let from_amount : Nat = from_tokens.amount_e8s - threshold;
    //                  account_put(caller, { amount_e8s = from_amount });
    //                  #ok
    //              };
    //          };
    //     };
    // };

    // func account_get(id : Principal) : ?Tokens = Trie.get(accounts, Types.account_key(id), Principal.equal);
    // func account_put(id : Principal, tokens : Tokens) {
    //     accounts := Trie.put(accounts, Types.account_key(id), Principal.equal, tokens).0;
    // };
    // func proposal_get(id : Nat) : ?Contract = Trie.get(proposals, Types.proposal_key(id), Nat.equal);
    // func proposal_put(id : Nat, proposal : Contract) {
    //     proposals := Trie.put(proposals, Types.proposal_key(id), Nat.equal, proposal).0;
    // };


  // https://forum.dfinity.org/t/is-there-any-address-0-equivalent-at-dfinity-motoko/5445/3
  let null_address : Principal = Principal.fromText("aaaaa-aa");

}