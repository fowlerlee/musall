export const idlFactory = ({ IDL }) => {
  const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat });
  const SystemParams = IDL.Record({
    'transfer_fee' : Tokens,
    'contract_submission_deposit' : Tokens,
    'contract_create_threshold' : Tokens,
  });
  const URL = IDL.Text;
  const ScopeOfWork = IDL.Text;
  const PriceOfContract = IDL.Nat;
  const ContractDescription = IDL.Text;
  const TermsOfOwnership = IDL.Text;
  const Contract = IDL.Record({
    'id' : IDL.Nat,
    'url' : URL,
    'scope_of_work' : ScopeOfWork,
    'creator' : IDL.Principal,
    'number_of_tokens' : IDL.Nat,
    'price_of_contract' : PriceOfContract,
    'creator_rating' : IDL.Nat,
    'contract_description' : ContractDescription,
    'terms_of_ownership' : TermsOfOwnership,
  });
  const Account = IDL.Record({ 'owner' : IDL.Principal, 'tokens' : Tokens });
  const MusallStableStorage = IDL.Record({
    'system_params' : SystemParams,
    'contracts' : IDL.Vec(Contract),
    'accounts' : IDL.Vec(Account),
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Musall = IDL.Service({
    'create' : IDL.Func([Account], [Result], []),
    'creator_contract_submitted' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Nat, IDL.Text],
        [Result],
        [],
      ),
    'get_all_contracts' : IDL.Func([], [IDL.Vec(Contract)], []),
    'get_first_contract' : IDL.Func([], [Contract], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return Musall;
};
export const init = ({ IDL }) => {
  const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat });
  const SystemParams = IDL.Record({
    'transfer_fee' : Tokens,
    'contract_submission_deposit' : Tokens,
    'contract_create_threshold' : Tokens,
  });
  const URL = IDL.Text;
  const ScopeOfWork = IDL.Text;
  const PriceOfContract = IDL.Nat;
  const ContractDescription = IDL.Text;
  const TermsOfOwnership = IDL.Text;
  const Contract = IDL.Record({
    'id' : IDL.Nat,
    'url' : URL,
    'scope_of_work' : ScopeOfWork,
    'creator' : IDL.Principal,
    'number_of_tokens' : IDL.Nat,
    'price_of_contract' : PriceOfContract,
    'creator_rating' : IDL.Nat,
    'contract_description' : ContractDescription,
    'terms_of_ownership' : TermsOfOwnership,
  });
  const Account = IDL.Record({ 'owner' : IDL.Principal, 'tokens' : Tokens });
  const MusallStableStorage = IDL.Record({
    'system_params' : SystemParams,
    'contracts' : IDL.Vec(Contract),
    'accounts' : IDL.Vec(Account),
  });
  return [MusallStableStorage];
};
