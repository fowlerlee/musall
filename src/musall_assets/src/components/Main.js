import { Route, Routes } from 'react-router-dom';
import { Albums } from './Albums/Albums';
import { Apartments } from './Apartments/Apartments';
import { Concerts } from './Concerts/Concerts';
import { Contract } from './Contract/Contract';
import { Films } from './Films/Films';
import { ResearchProjects } from './ResearchProjects/ResearchProjects';
import { VacationHomes } from './VacationHomes/VacationHomes';

export default function Main() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Albums />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/albums/:album_id' element={<Contract />} />
        <Route path='/albums/:album_id/description' element={<Contract />} />
        <Route path='/albums/:album_id/scope-of-work' element={<Contract />} />
        <Route path='/albums/:album_id/price-of-item' element={<Contract />} />
        <Route
          path='/albums/:album_id/terms-of-ownership'
          element={<Contract />}
        />
        <Route path='/albums/:album_id/owner' element={<Contract />} />
        <Route path='/vacation-homes' element={<VacationHomes />} />
        <Route path='/apartments' element={<Apartments />} />
        <Route path='/concerts' element={<Concerts />} />
        <Route path='/films' element={<Films />} />
        <Route path='/research-projects' element={<ResearchProjects />} />
      </Routes>
    </div>
  );
}
