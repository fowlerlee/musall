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
  const anon_class_21_1 = IDL.Service({
    'creator_contract_submitted' : IDL.Func([UserSubmission], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_21_1;
};
export const init = ({ IDL }) => { return []; };
