// // import Main from './components/Main';
// import React, { useEffect, useRef, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { Header } from './components/Header/Header';
// import { Albums } from './components/Albums/Albums';
// import { Contract } from './components/Contract/Contract';
// import { AlbumContextProvider } from './context/Album';
// import { Hero } from './components/Hero/Hero';
// import { CreateContract } from './components/CreateContract/CreateContract';

// // import AuthService from '../../../';
// // import UserService from './services/UserService';

// function App() {
//   // useEffect( () => {
//   //   const initApp = async () => {
//   //     // Initialise and set the service accordingly
//   //     await AuthService.init(setNovaOne);
//   //     // If we are authenticated (i.e., the novaOne object is set), we retrieve the user
//   //   }
//   //   const refreshUser = async () => {
//   //       const user = await UserService.getRemoteUser(novaOne)
//   //       setUser(user);
//   //   }
//   //   // Only on mount
//   //   if (!isInit.current) {
//   //     isInit.current = true;
//   //     initApp();
//   //   }

//   //   // Only if authenticated
//   //   if (novaOne && !user) {
//   //     const localUser = UserService.getLocalUser();
//   //     setUser(localUser);
//   //   }

//   //   // If authenticated and using local user, and remote service available
//   //   if (novaOne && user && user.isLocal) {
//   //     refreshUser();
//   //   }
//   // }, [novaOne, user]);

//   return (
//     <>
//       <AlbumContextProvider>
//         <Routes>
//           <Route path='/' element={<Hero />} />
//           <Route
//             path='/albums'
//             element={
//               <>
//                 <Header />
//                 <Albums />
//               </>
//             }
//           />
//           <Route
//             path='/albums/:album_id'
//             element={
//               <>
//                 <Header />
//                 <Contract />
//               </>
//             }
//           />
//           <Route
//             path='/create'
//             element={
//               <>
//                 <Header />
//                 <CreateContract />
//               </>
//             }
//           />
//         </Routes>
//       </AlbumContextProvider>
//     </>
//   );
// }

// export default App;
