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
import Types "./Types";

//Note: All credit to the maintainers of repo: git@github.com:dfinity/examples.git 
// see example -> # DIP721 NFT Container

//({ caller = initializer })

shared ({ caller = initializer }) actor class () {
  stable var transactionId: Types.TransactionId = 0;

  private let MAX_CONTRACTS = 1_000;
  private let MAX_NOTES_PER_USER = 100;
  private let MAX_NOTE_CHARS = 500;
  private let MAX_DEVICE_ALIAS_LENGTH = 200;
  private let MAX_PUBLIC_KEY_LENGTH = 500;
  private let MAX_CYPHERTEXT_LENGTH = 40_000;

  private type PrincipalName = Text;
  private var contractsByUser = Map.HashMap<PrincipalName, List.List<Contract>>(0, Text.equal, Text.hash);

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

  public type Contract = {
    id: Nat;
    contract_description: Text;
    scope_of_work: Text;
    price_of_contract: Nat;
    terms_of_ownership: Text;
    creator: Principal;
    creator_rating: Nat;
    allowed_number_of_owners: Nat;
    buyers : List.List<Principal>;
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

    public shared({caller}) func submit_contract(contract: Contract) : async Result.Result<Nat, Text> {
    assert not Principal.isAnonymous(caller);
    assert contract.contract_description.size() <= MAX_NOTE_CHARS;
    assert contract.scope_of_work.size() <= MAX_NOTE_CHARS;
    assert contract.terms_of_ownership.size() <= MAX_NOTE_CHARS;
    assert contract.allowed_number_of_owners > 0;
    assert contract.id <= MAX_CONTRACTS;
                
            let id : Nat = contract.id;
            let next_proposal_id : Nat = id + 1;
            let principalName = Principal.toText(caller);
            let userContracts : List.List<Contract> = Option.get(contractsByUser.get(principalName), List.nil<Contract>());

            let new_contract : Contract = {
                id = contract.id;
                contract_description = contract.contract_description;
                scope_of_work = contract.scope_of_work;
                terms_of_ownership = contract.terms_of_ownership;
                creator = caller;
                price_of_contract = contract.price_of_contract;
                creator_rating = contract.creator_rating;
                allowed_number_of_owners = contract.allowed_number_of_owners;
                buyers = contract.buyers;
            };
            
            contractsByUser.put(principalName, List.push(new_contract, userContracts));
            #ok(id)
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