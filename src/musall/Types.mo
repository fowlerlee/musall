import Nat "mo:base/Nat";
import Nat8 "mo:base/Nat8";
import Nat16 "mo:base/Nat16";
import Nat32 "mo:base/Nat32";
import Nat64 "mo:base/Nat64";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";

//All credit to the maintainers of repo: git@github.com:dfinity/examples.git
//see example -> # DIP721 NFT Container

module {

  public type Result<S, E> = {
    #Ok : S;
    #Err : E;
  };
  
  public type TransactionId = Nat;
  public type TokenId = Nat64;

};
