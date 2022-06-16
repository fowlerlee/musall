// import Main from './components/Main';
import React, { useEffect, useRef, useState } from 'react';
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

// import AuthService from '../../../';
// import UserService from './services/UserService';

function App() {

  useEffect( () => {
    const initApp = async () => {
      // Initialise and set the service accordingly
      await AuthService.init(setNovaOne);
      // If we are authenticated (i.e., the novaOne object is set), we retrieve the user
    }
    const refreshUser = async () => {
        const user = await UserService.getRemoteUser(novaOne)
        setUser(user);
    }
    // Only on mount
    if (!isInit.current) {
      isInit.current = true;
      initApp();
    }

    // Only if authenticated
    if (novaOne && !user) {
      const localUser = UserService.getLocalUser();
      setUser(localUser);
    }

    // If authenticated and using local user, and remote service available
    if (novaOne && user && user.isLocal) {
      refreshUser();
    }
  }, [novaOne, user]);

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
