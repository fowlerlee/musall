import Main from "./components/Main";
import react, { useState, useEffect } from "react";
import { HashRouter as Router } from 'react-router-dom';
import { GlobalStyles } from './components/GlobalStyles'
import PlugConnect from '@psychedelic/plug-connect';
import canisterIds from "../../../.dfx/local/canister_ids.json";


function App() {
	const canisterId1 = canisterIds.__Candid_UI.local;
	const canisterId2 = canisterIds.musall_assets.local;
	const canisterId3 = canisterIds.musall.local;

	// const verifyConnectionAndAgent = async () => {
	// 	const connected = await window.ic.plug.isConnected();
	// 	if (!connected) window.ic.plug.requestConnect({ whitelist, host });
	// 	if (connected && !window.ic.plug.agent) {
	// 		window.ic.plug.createAgent({ whitelist, host })
	// 	}
	// };

	// useEffect( async () => {
	// verifyConnectionAndAgent();
	// }, []);

	let whitelist = canisterId1
	let host = "https://mainnet.dfinity.network"

	useEffect(() => {
		async function verifyConnectionAndAgent() {
			const connected = await window.ic.plug.isConnected();
			if (!connected) window.ic.plug.requestConnect({ whitelist, host });
			if (connected && !window.ic.plug.agent) {
				window.ic.plug.createAgent({ whitelist, host })
			}
		}
		verifyConnectionAndAgent();
	}, []);

	return (
		<>
			<GlobalStyles />
			<Router>
				<PlugConnect
					dark
					title="login"
					host="https://mainnet.dfinity.network"
					whitelist={[canisterId1, canisterId2, canisterId3]}
					onConnectCallback={() => console.log("Some callback")}
				/>
				<Main />
			</Router>
		</>
	);
}

export default App;