export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const anon_class_21_1 = IDL.Service({
    'creator_contract_submitted' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Nat],
        [Result],
        [],
      ),
    'submit_contract' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Text, IDL.Nat, IDL.Principal],
        [Result],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Text], []),
  });
  return anon_class_21_1;
};
export const init = ({ IDL }) => { return []; };
