# MUSALL

Welcome to the repository for MUSALL, the shared ownership platform, totally on chain on the IC as designed by Dfinity:

## Short Summary

The music industry is broken, in terms of musician earnings and autonomy. Contracts are often not fair and transparent toward musicians. Additionally only a hand-full of persons are able to invest in musicians and their art. The shared-ownership model implemented by MUSALL aims to lower the barrier to entry for musicians to create art, as well fans / investors to fund such art. Fans of music are incentivised to consume said art and earn in the process. MUSALL equals shared-ownership, but results in shared profits for all. Hence MUSALL.

 ![alt text](https://github.com/fowlerlee/musall/blob/f877ed9b8b336c789b62a5b8d0bc3c8f0e9a3b3d/src/musall_assets/assets/Screenshot%202022-06-20%20at%2016.51.21.png)

## Required installed packages

npm LTS
nvm
node 16
dfx 0.10.0

Download and install the supported version of the DFINITY Canister SDK, with this command:

    ```bash
    DFX_VERSION=0.10.0 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
    ```

## Clone the MUSALL repository

In your terminal using SSH:

1.
    ```bash
    git clone git@github.com:fowlerlee/musall.git 
    ```

2. Change to the local working directory for the `musall` repository.

    ```bash
    cd musall
    ```

1. Install node modules by running the following command:

    ```bash
    npm install
    ```

    If necessary, run `npm audit fix` to fix any issues before continuing.

## Start the local network

    ```bash
    dfx start 
    ```
1. Leave the terminal that displays network operations open and switch your focus to the second terminal.

## Build and deploy the program

1. In a second terminal, build the executable by running the following command:

    ```bash
    dfx build
    ```
2. Deploy MUSALL:

    ```bash
    dfx canister install --all
    ```
3. npm start

## Open MUSALL in a browser

Open a browser tab and navigate to the default host name and port, localhost:8080 or 127.0.0.1:8080.

You should see the Landing Page welcoming you to MUSALL.
