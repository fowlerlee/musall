// import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Albums } from './components/Albums/Albums';
import { Apartments } from './components/Apartments/Apartments';
import { Concerts } from './components/Concerts/Concerts';
import { Contract } from './components/Contract/Contract';
import { Films } from './components/Films/Films';
import { ResearchProjects } from './components/ResearchProjects/ResearchProjects';
import { VacationHomes } from './components/VacationHomes/VacationHomes';
import { Description } from './components/Description/Description';
import { Owner } from './components/Owner/Owner';
import { Price } from './components/Price/Price';
import { Scope } from './components/Scope/Scope';
import { Terms } from './components/Terms/Terms';
import { AlbumContextProvider } from './context/Album';
import UploadButton from '../src/components/atoms/uploadButton';

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
      <AlbumContextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Header />} />
          <Route
            path='/albums'
            element={
              <>
                <UploadButton />
                <Albums />
              </>
            }
          />
          <Route
            path='/albums/:album_id'
            element={
              <>
                <Header />
                <Contract />
              </>
            }
          />

          <Route
            path='/albums/:album_id/description'
            element={
              <>
                <Header />
                <Description />
              </>
            }
          />
          <Route
            path='/albums/:album_id/scope-of-work'
            element={
              <>
                <Header />
                <Scope />
              </>
            }
          />
          <Route
            path='/albums/:album_id/price-of-item'
            element={
              <>
                <Header />
                <Price />
              </>
            }
          />
          <Route
            path='/albums/:album_id/terms-of-ownership'
            element={
              <>
                <Header />
                <Terms />
              </>
            }
          />
          <Route
            path='/albums/:album_id/owner'
            element={
              <>
                <Header />
                <Owner />
              </>
            }
          />

          <Route path='/vacation-homes' element={<VacationHomes />} />
          <Route path='/apartments' element={<Apartments />} />
          <Route path='/concerts' element={<Concerts />} />
          <Route path='/films' element={<Films />} />
          <Route path='/research-projects' element={<ResearchProjects />} />
        </Routes>
      </AlbumContextProvider>
    </>
  );
}

export default App;
