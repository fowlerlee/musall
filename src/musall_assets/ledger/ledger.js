import { AccountIdentifier, LedgerCanister, ICP, SubAccount } from "@dfinity/nns";

async function main() {
    const ledger = LedgerCanister.create();
    const subaccount = SubAccount.create();
  
    const accountIdentifier = AccountIdentifier.fromHex(
      "efa01544f509c56dd85449edf2381244a48fad1ede5183836229c00ab00d52df"
    );
  
    const balance = await ledger.accountBalance({ accountIdentifier });
    const fee = await ledger.transactionFee();
    const x = await ledger.transfer();
    await subaccount.
  
    console.log(`Balance: ${balance.toE8s()}`);
  }
  
  main();