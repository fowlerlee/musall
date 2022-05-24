import Main from "./components/Main";
import { HashRouter as Router } from 'react-router-dom';
import {GlobalStyles} from './components/GlobalStyles'
function App() {

  return (
	<>
		<GlobalStyles />
		<Router>
			<Main />
		</Router>
	</>
    );
}

export default App;