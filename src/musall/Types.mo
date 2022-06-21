import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Int "mo:base/Int";

module {

  public type Account = { owner : Principal; tokens : Tokens };
  public type Tokens = { amount_e8s : Nat };
  public type TransferArgs = { to : Principal; amount : Tokens };

  public type Result<S, E> = {
    #Ok : S;
    #Err : E;
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

  public type TransactionId = Nat;
  public type TokenId = Nat64;

  public type UpdateSystemParamsPayload = {
    transfer_fee : ?Tokens;
    contract_create_threshold : ?Tokens;
    contract_submission_deposit : ?Tokens;
  };

  public type SystemParams = {
    transfer_fee: Tokens;

    // The amount of tokens needed to vote "yes" to accept, or "no" to reject, a proposal
    contract_create_threshold: Tokens;

    // The amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    contract_submission_deposit: Tokens;
  };

  public func contract_key(t: Nat) : Trie.Key<Nat> = { key = t; hash = Int.hash t };
  public func account_key(t: Principal) : Trie.Key<Principal> = { key = t; hash = Principal.hash t };

  public func accounts_fromArray(arr: [Account]) : Trie.Trie<Principal, Tokens> {
      var s = Trie.empty<Principal, Tokens>();
      for (account in arr.vals()) {
          s := Trie.put(s, account_key(account.owner), Principal.equal, account.tokens).0;
      };
      s
  };
  
  public func contracts_fromArray(arr: [Contract]) : Trie.Trie<Nat, Contract> {
      var s = Trie.empty<Nat, Contract>();
      for (contract in arr.vals()) {
          s := Trie.put(s, contract_key(contract.id), Nat.equal, contract).0;
      };
      s
  };

  public type MusallStableStorage = {
    accounts: [Account];
    contracts: [Contract];
    system_params: SystemParams;
  };

  public let oneToken = { amount_e8s = 10_000_000 };
  public let zeroToken = { amount_e8s = 0 }; 

};
