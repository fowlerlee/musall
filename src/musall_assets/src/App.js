import Main from './components/Main';
import { Header } from './components/Header/Header';

function App() {
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

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
