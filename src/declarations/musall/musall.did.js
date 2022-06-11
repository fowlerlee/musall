export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  List.fill(IDL.Opt(IDL.Tuple(IDL.Principal, List)));
  const Contract = IDL.Record({
    'id' : IDL.Nat,
    'scope_of_work' : IDL.Text,
    'creator' : IDL.Principal,
    'price_of_contract' : IDL.Nat,
    'creator_rating' : IDL.Nat,
    'contract_description' : IDL.Text,
    'buyers' : List,
    'allowed_number_of_owners' : IDL.Nat,
    'terms_of_ownership' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const anon_class_21_1 = IDL.Service({
    'submit_contract' : IDL.Func([Contract], [Result], []),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_21_1;
};
export const init = ({ IDL }) => { return []; };
