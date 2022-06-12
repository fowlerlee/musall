import { Route, Routes } from 'react-router-dom';
import { Albums } from './Albums/Albums';
import { Apartments } from './Apartments/Apartments';
import { Concerts } from './Concerts/Concerts';
import { Contract } from './Contract/Contract';
import { Films } from './Films/Films';
import { ResearchProjects } from './ResearchProjects/ResearchProjects';
import { VacationHomes } from './VacationHomes/VacationHomes';
import { Description } from './Description/Description';
import { Owner } from './Owner/Owner';
import { Price } from './Price/Price';
import { Scope } from './Scope/Scope';
import { Terms } from './Terms/Terms';
import { AlbumContextProvider } from '../context/Album';

export default function Main() {
  return (
    <AlbumContextProvider>
      <Routes>
        <Route path='/' element={<Albums />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/albums/:album_id' element={<Contract />} />

        <Route path='/albums/:album_id/description' element={<Description />} />
        <Route path='/albums/:album_id/scope-of-work' element={<Scope />} />
        <Route path='/albums/:album_id/price-of-item' element={<Price />} />
        <Route
          path='/albums/:album_id/terms-of-ownership'
          element={<Terms />}
        />
        <Route path='/albums/:album_id/owner' element={<Owner />} />

        <Route path='/vacation-homes' element={<VacationHomes />} />
        <Route path='/apartments' element={<Apartments />} />
        <Route path='/concerts' element={<Concerts />} />
        <Route path='/films' element={<Films />} />
        <Route path='/research-projects' element={<ResearchProjects />} />
      </Routes>
    </AlbumContextProvider>
  );
}
