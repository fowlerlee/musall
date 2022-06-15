import { AuthClient } from "@dfinity/auth-client";
import { RestaurantRounded } from "@mui/icons-material";
import { createActor } from "../../../declarations/nova_one";

/**
 * Provides methods related to the user authentication
 */
export default class AuthService {
  /**
   * The AuthClient. It's retrieved as soon as the application starts.
   */
  static authClient = null;
  static initialised = false;

  /**
   * Initialisation method. It handles the authentication if user is authenticated
   *
   * @param {*} setNovaOne Method for setting the nova_one global Actor.
   */
  static init = async (setNovaOne) => {
    if (AuthService.initialised) {
      return true;
    }
    //console.log("AuthService: Init");
    if (!AuthService.authClient) {
      AuthService.authClient = await AuthClient.create();
    }
    //console.log("AuthService: Init - Auth client ready", AuthService.authClient);
    // Attempt to retrieve the identity
    const identity = await AuthService.authClient.getIdentity()
    if (await AuthService.authClient.isAuthenticated()) {
      AuthService.handleAuthenticated(identity, setNovaOne);
    }
    AuthService.initialised = true;
  };

  /**
   * Sets the Actor for authenticated users and sets the global nova_one Actor.
   *
   * @param {*} authClient The Aunthenticated client
   * @param {*} setNovaOne Method for setting the nova_one global prototype
   */
  static handleAuthenticated = async (identity, setNovaOne) => {
    // At this point we're authenticated, and we can get the identity from the auth client:
    //console.log("AuthService: handleAuthenticated - Identity retrieved:", identity);
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const nova_one = createActor(process.env.NOVA_ONE_CANISTER_ID, { agentOptions: { identity }});
    //console.log("AuthService: handleAuthenticated - NovaOne retrieved:", nova_one);
    // Store the identity in local storage
    setNovaOne(nova_one);
  }

  /**
   * Performs the actual login (i.e., redirecting to the Internet Identity page)
   * Once logged in, it handles the authenticated user, setting the nova_one global Actor.
   *
   * @param {*} setNovaOne Method for setting the nova_one global prototype
   * @param {*} path Path to redirect after login
   */
  static doLogin = async (setNovaOne) => {
    if (!AuthService.initialised) {
      await AuthService.init(setNovaOne);
    }
    //console.log("AuthService: doLogin - authClient", AuthService.authClient);
    await AuthService.authClient.login({
      // 7 Days in nanoseconds
      maxTimeToLive: 7 * 24 * 60 * 60 * 1000 * 1000 * 1000,
      onSuccess: async () => {
        AuthService.handleAuthenticated(await AuthService.authClient.getIdentity(), setNovaOne);
      },
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:8000/?canisterId=${process.env.INTERNET_IDENTITY_CANISTER_ID}`,
    });
  };

  /**
   * Performs the actual logout
   *
   * @param {*} setNovaOne Method for setting the nova_one global prototype
   * @param {*} path Path to redirect after login
   */
   static doLogout = async (setNovaOne) => {
    if (!AuthService.initialised) {
      await AuthService.init(setNovaOne);
    }
    await AuthService.authClient.logout();
    setNovaOne(null);
   }

   /**
    * Whether the current user is authenticated
    *
    * @returns Whether the current user is authenticated
    */
    static isAuthenticated = async (setNovaOne) => {
      if (!AuthService.initialised) {
        await AuthService.init(setNovaOne);
      }
      const isAuth = await AuthService.authClient.isAuthenticated();
      return isAuth;
    }
}