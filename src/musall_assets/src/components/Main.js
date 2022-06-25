import { Route, Routes } from 'react-router-dom';
import { Albums } from './Albums/Albums';
import { Concerts } from './Concerts/Concerts';
import { Contract } from './Contract/Contract';
import { Description } from './Description/Description';
import { Owner } from './Owner/Owner';
import { Price } from './Price/Price';
import { Scope } from './Scope/Scope';
import { Terms } from './Terms/Terms';
import { AlbumContextProvider } from '../context/Album';
import { CreateContract } from './CreateContract/CreateContract';

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
        <Route path='/create' element={<CreateContract />} />
        <Route path='/concerts' element={<Concerts />} />
        <Route path='/films' element={<Films />} />
        <Route path='/research-projects' element={<ResearchProjects />} />
      </Routes>
    </AlbumContextProvider>
  );
}
