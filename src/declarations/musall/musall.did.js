export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
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
  const anon_class_23_1 = IDL.Service({
    'creator_contract_submitted' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Nat, IDL.Text],
        [Result],
        [],
      ),
    'get_all_contracts' : IDL.Func([], [IDL.Vec(Contract)], []),
    'get_first_contract' : IDL.Func([], [Contract], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_23_1;
};
export const init = ({ IDL }) => { return []; };
