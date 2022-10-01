mod service;
mod types;

use ic_cdk::export::{
    candid::{CandidType, Deserialize},
    Principal,
};
use ic_cdk_macros::*;
use std::cell::RefCell;
use crate::service::BasicDaoService;
use crate::types::*;

thread_local! {
  static SERVICE: RefCell<MusallService> = RefCell::default();
}

#[query]
#[ic_cdk::export::candid::candid_method(query)]
fn get_system_params() -> SystemParams {
    SERVICE.with(|service| service.borrow().system_params.clone())
}

#[update]
#[ic_cdk::export::candid::candid_method]
fn transfer(args: TransferArgs) -> Result<(), String> {
    SERVICE.with(|service| service.borrow_mut().transfer(args))
}
