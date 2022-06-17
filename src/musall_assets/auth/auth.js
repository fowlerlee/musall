import { AuthClient } from "@dfinity/auth-client";
import { renderIndex } from "../src/pages/SignIn";
import { renderLoggedIn } from "../src/index";
import { canisterId, createActor } from "../../declarations/musall";
import { Actor, Identity } from "@dfinity/agent";
import { identity } from "../../declarations/identity";


// const ident = async () => {
//   const auth = identity.init_salt();
//   console.log("log auth: ", auth);
// }
// useEffect(async () => {
//   await ident();
// }, []);

// console.log("musall: ", musall);
// const getData = async () => {
//   let data = await musall.submit_contract();
//   console.log(data);
//   return data
// }


const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }
  renderIndex();

  const loginButton = document.getElementById(
    "loginButton"
  );

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  loginButton.onclick = async () => {
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          // : IDENTITY_CANISTER_ID,
          :`http://localhost:8000/?canisterId=${process.env.IDENTITY_CANISTER_ID}`,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    });
  };
};

async function handleAuthenticated(authClient) {
  const identity = (await authClient.getIdentity());
  const whoami_actor = createActor(canisterId, {
    agentOptions: {
      identity,
    },
  });
  // Invalidate identity then render login when user goes idle
  authClient.idleManager?.registerCallback(() => {
    Actor.agentOf(whoami_actor)?.invalidateIdentity?.();
    renderIndex();
  });

  renderLoggedIn(whoami_actor, authClient);
}

init();