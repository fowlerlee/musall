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

  public type buffer = Buffer.Buffer<Contract>;
  public type bufferForPrincipals = Buffer.Buffer<Principal>;

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

  public type ContractDescription = Text;
  public type ScopeOfWork = Text;
  public type PriceOfContract = Nat;
  public type TermsOfOwnership = Text;
  public type NumberOfTokens = Nat;
  public type URL = Text;

  public type UserSubmission = {
    contract_description: ContractDescription;
    scope_of_work: ScopeOfWork;
    price_of_contract: PriceOfContract;
    terms_of_ownership: TermsOfOwnership;
    number_of_tokens: NumberOfTokens;
    image_url : URL;
  };

  public type Contract = {
    id: Nat;
    contract_description: ContractDescription;
    scope_of_work: ScopeOfWork;
    price_of_contract: PriceOfContract;
    terms_of_ownership: TermsOfOwnership;
    creator: Principal;
    creator_rating: Nat;
    number_of_tokens: Nat;
    url: URL;
    // buyers : bufferForPrincipals;
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
                                                          numberOfTokens: Nat,
                                                          url: Text): async Result.Result<Text, Text>{
    
    // assert not Principal.isAnonymous(caller); //add the II to this app asap like
    assert userDescription.size() <= MAX_NOTE_CHARS;
    assert userScopeOfWork.size() <= MAX_NOTE_CHARS;
    assert termsOfOwnership.size() <= MAX_NOTE_CHARS;
    assert numberOfTokens  > 0;

            let user_submit : UserSubmission = {
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


    private func submit_contract(us: UserSubmission, creator: Principal) : async Result.Result<Text, Text> {
    
    assert nextNoteId <= MAX_CONTRACTS;
                
        let principalName = Principal.toText(creator);
            let new_contract : Contract = {
                id = nextNoteId;
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
            nextNoteId += 1;
            Debug.print("Adding note...");

            switch(?bufOfContracts.add(new_contract)){
              case(null){
                throw Error.reject("Contract not added")
              };
              case(value){
                #ok("Contract added by Principal " # principalName)
              };
            };
    };


    public func get_first_contract() : async Contract {
        return bufOfContracts.get(0);
    };

    public func get_all_contracts(): async [Contract] {
      return bufOfContracts.toArray();
    };


  let null_address : Principal = Principal.fromText("aaaaa-aa");

}