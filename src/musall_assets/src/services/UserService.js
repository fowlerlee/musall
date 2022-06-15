import AuthService from "./AuthService";
import account from '../ui/_mock/account';

/**
 * Service wrapper for the retrieved User.
 * This wrapper ensures that the user is stored in the local storage whenever it is updated, and retrieved in other
 * cases. This allows the frontend showing some information, even though it may not be up to date (a warning should be shown)
 */
export default class UserService {
    static USER_KEY = "nova_user";

    /**
     * Retrieves the remote user
     *
     * @param {*} novaOne The backend service
     * @returns An object containing the user stored in the remote canister
     */
    static getRemoteUser = async (novaOne) => {
        // Service must be defined
        if (!novaOne) {
            return undefined;
        }
        let user = await novaOne.get_or_add_user();
        // If we get a new user, it may have the user_info field empty.
        // Initialise it in order to be able to update it.
        if (!user.info[0]) {
            user.info[0] = {
                name: "",
                description: "",
                email: "",
                avatar_url: "",
            };
        }
        // Save it local storage
        localStorage.setItem(UserService.USER_KEY, JSON.stringify(user));
        return user;
    }

    /**
     * Retrieves the User from the local storage
     *
     * @param {*} novaOne The backend service
     * @returns An object containing the user stored in the local storage
     */
    static getLocalUser = () => {
        const user = localStorage.getItem(UserService.USER_KEY);
        if (user) {
            const parsed = JSON.parse(user);
            return {
                ...parsed,
                isLocal: true
            };
        }
        return null;
    }

    /**
     * Updates the user information in the remote for the current logged used
     *
     * @param {*} novaOne The backend service
     * @param {*} user The userInfo to be updated
     * @returns The updated user
     */
    static updateUserInfo = async (novaOne, userInfo) => {
        const updated = await novaOne.update_user_info(userInfo);
        let localUser = JSON.parse(localStorage.getItem(UserService.USER_KEY));
        localUser.info[0] = updated;
        localStorage.setItem(UserService.USER_KEY, JSON.stringify(localUser));
        return updated;
    }

    /**
     * Updates the seller information in the remote for the current logged used
     *
     * @param {*} novaOne The backend service
     * @param {*} user The sellerInfo to be updated
     * @returns The updated user
     */
    static updateSellerInfo = async (novaOne, sellerInfo) => {
        const updated = await novaOne.update_seller_info(sellerInfo);
        localStorage.setItem(UserService.USER_KEY, updated);
        return updated;
    }

    /**
     * Updates the player information in the remote for the current logged used
     *
     * @param {*} novaOne The backend service
     * @param {*} user The player to be updated
     * @returns The updated user
     */
    static updatePlayerInfo = async (novaOne, playerInfo) => {
        const updated = await novaOne.update_player_info(playerInfo);
        localStorage.setItem(UserService.USER_KEY, updated);
        return updated;
    }



    /**
     * Retrieves the name for the current user, or a placeholder if not defined yet in User Info
     *
     * @param {*} user
     * @returns The role for the user.
     */
    static async getUserName(user, setNovaOne) {
        const unnamed = "Unnamed";
        if (!user || !await AuthService.isAuthenticated(setNovaOne)) {
            return unnamed;
        }

        // Seller takes precedence before Player, for display purposes.
        const info = user.info
        if (info && info[0].name && info[0].name.length > 0) {
            return info[0].name;
        }
        return unnamed;
    }

    /**
     * Retrieves the email for the current user, or placeholder
     *
     * @param {*} user
     * @returns The role for the user.
     */
    static getAuthenticatedUserEmail(user) {
        const placeHolder = "generic@email.com";
        if (!user) {
            return placeHolder;
        }

        // Seller takes precedence before Player, for display purposes.
        const info = user.info
        if (info && info[0].email && info[0].email.length > 0) {
            return info[0].email;
        }
        return placeHolder;
    }

    /**
     * Retrieves the name for the current authenticated user, or placeholder
     *
     * @param {*} user
     * @returns The role for the user.
     */
    static getAuthenticatedUserName(user) {
        const unnamed = "Unnamed";
        if (!user) {
            return unnamed;
        }

        // Seller takes precedence before Player, for display purposes.
        const info = user.info
        if (info && info[0].name && info[0].name.length > 0) {
            return info[0].name;
        }
        return unnamed;
    }

    /**
     * Retrieves the role for the current user
     *
     * @param {*} user
     * @returns The role for the user.
     */
    static getUserRole(user) {
        if (!user) {
            return null;
        }
        // Seller takes precedence before Player, for display purposes.
        const isPlayer = (user.player_info && user.player_info[0]);
        if (user.seller_info && user.seller_info[0]) {
            return (isPlayer ? "Seller & Player" : "Seller")
        } else if (isPlayer) {
            return "Player"
        } else {
            return "Spectator"
        }
    }

    /**
     * True if the user is a seller
     *
     * @param {*} user
     * @returns Whether the user is seller.
     */
    static isSeller(user) {
        if (!user) {
            return false;
        }
        return user.seller_info && user.seller_info[0] !== undefined;
    }

    /**
     * True if the user is a player
     *
     * @param {*} user
     * @returns Whether the user is player.
     */
    static isPlayer(user) {
        if (!user) {
            return false;
        }
        return user.player_info && user.player_info[0] !== undefined;
    }

    /**
     * Return the avatar url of the user if any or a generic one
     *
     * @param {*} user
     * @returns url to the user avatar
     */
    static getUserAvatarUrl(user) {
        if (!user) {
            return account.photoURL;
        }
        return (user?.info[0].avatar_url ? user?.info[0].avatar_url : account.photoURL);
    }

}