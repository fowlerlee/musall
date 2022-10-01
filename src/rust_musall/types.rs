
use ic_cdk::export::{
  candid::{CandidType, Deserialize},
  Principal,
};
use std::ops::{Add, AddAssign, SubAssign, Mul};

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct MusallStableStorage {
    pub accounts: Vec<Account>,
    pub proposals: Vec<Proposal>,
    pub system_params: SystemParams,
}

#[derive(Clone, Debug, Default, CandidType, Deserialize)]
pub struct Tokens {
  pub amount_e8s: u64,
}

impl Add for Tokens {
  type Output = Self;

  fn add(self, other: Self) -> Self {
      Tokens { amount_e8s: self.amount_e8s + other.amount_e8s }
  }
}

impl AddAssign for Tokens {
  fn add_assign(&mut self, other: Self) {
      self.amount_e8s += other.amount_e8s;
  }
}

impl SubAssign for Tokens {
  fn sub_assign(&mut self, other: Self) {
      self.amount_e8s -= other.amount_e8s;
  }
}

impl Mul<u64> for Tokens {
  type Output = Tokens;
  fn mul(self, rhs: u64) -> Self {
      Tokens { amount_e8s: self.amount_e8s * rhs }
  }
}

#[derive(Clone, Debug, CandidType, Deserialize, PartialEq)]
pub enum ContractState {
    // The proposal is open for voting
    Open,

    // Enough "yes" votes have been cast to accept the proposal, and it will soon be executed
    Accepted,

    // Enough "no" votes have been cast to reject the proposal, and it will not be executed
    Rejected,

    // The proposal is currently being executed
    Closed,

}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Contract {
    pub id: u64,
    pub timestamp: u64,
    pub creator: Principal,
    pub state: ContractState,
    pub fee: Tokens,
    pub cost: Tokens,
    pub owners: Vec<Principal>,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Account {
    pub owner: Principal,
    pub tokens: Tokens,
}

#[derive(Clone, Default, Debug, CandidType, Deserialize)]
pub struct SystemParams {
    // The fee incurred by transferring tokens
    pub transfer_fee: Tokens,

    // The amount of tokens needed to vote "yes" to accept, or "no" to reject, a proposal
    pub proposal_vote_threshold: Tokens,

    // The amount of tokens that will be temporarily deducted from the account of
    // a user that submits a proposal. If the proposal is Accepted, this deposit is returned,
    // otherwise it is lost. This prevents users from submitting superfluous proposals.
    pub proposal_submission_deposit: Tokens,
}