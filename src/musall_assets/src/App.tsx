
import { canisterId, createActor, musall } from "../../declarations/musall";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useHistory,
  withRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { _SERVICE, Contract } from "../../declarations/musall/musall.did";
import { AuthClient } from "@dfinity/auth-client";
import { ActorSubclass } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { useEffect, useState, useCallback } from "react";
import { remove, get, set } from "local-storage";
import { Actor, Identity } from "@dfinity/agent";
import { conditionalDelay } from "@dfinity/agent/lib/cjs/polling/strategy";

const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }

const loginButton = document.getElementById(
    "loginButton"
  ) as HTMLButtonElement;

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  loginButton.onclick = async () => {
    console.log("inside the login button")
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      identityProvider: "https://identity.ic0.app/#authorize",
        // process.env.DFX_NETWORK === "ic"
        //   ? "https://identity.ic0.app/#authorize"
        //   : process.env.LOCAL_II_CANISTER,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    });
  };
};

async function handleAuthenticated(authClient: AuthClient) {
  const identity = (await authClient.getIdentity()) as unknown as Identity;
  const whoami_actor = createActor(canisterId as string, {
    agentOptions: {
      identity,
    },
  });
  // Invalidate identity then render login when user goes idle
  authClient.idleManager?.registerCallback(() => {
    Actor.agentOf(whoami_actor)?.invalidateIdentity?.();
  
  });

}

const contract = async () => {
    const identity = await musall.creator_contract_submitted("asdfsd", "asdas", BigInt(1), "srerf", BigInt(12), "sdfsd");
};

init();

const App = () => {
  return(<>
          <h1>App page</h1>
         </>
    );
};

export default App;
