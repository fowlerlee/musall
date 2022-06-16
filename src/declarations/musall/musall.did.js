export const idlFactory = ({ IDL }) => {
  const ScopeOfWork = IDL.Text;
  const NumberOfTokens = IDL.Nat;
  const PriceOfContract = IDL.Nat;
  const ContractDescription = IDL.Text;
  const TermsOfOwnership = IDL.Text;
  const UserSubmission = IDL.Record({
    'scope_of_work' : ScopeOfWork,
    'number_of_tokens' : NumberOfTokens,
    'price_of_contract' : PriceOfContract,
    'contract_description' : ContractDescription,
    'terms_of_ownership' : TermsOfOwnership,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const Contract = IDL.Record({
    'id' : IDL.Nat,
    'scope_of_work' : ScopeOfWork,
    'creator' : IDL.Principal,
    'number_of_tokens' : IDL.Nat,
    'price_of_contract' : PriceOfContract,
    'creator_rating' : IDL.Nat,
    'contract_description' : ContractDescription,
    'terms_of_ownership' : TermsOfOwnership,
  });
  const anon_class_22_1 = IDL.Service({
    'creator_contract_submitted' : IDL.Func([UserSubmission], [Result], []),
    'get_all_contracts' : IDL.Func([], [IDL.Vec(Contract)], []),
    'get_first_contract' : IDL.Func([], [Contract], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_22_1;
};
export const init = ({ IDL }) => { return []; };
