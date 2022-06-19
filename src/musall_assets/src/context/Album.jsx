import { createContext, useState, useEffect } from 'react';
import { artists, albums } from '../data';
import { musall } from '../../../declarations/musall';

const AlbumContext = createContext(undefined);
AlbumContext.displayName = 'AlbumContext';

function AlbumContextProvider({ children }) {
  const [contracts, setContracts] = useState(null);

  useEffect(() => {
    const getContracts = async () => {
      console.log('musall canister:', musall);
      let response = await musall.get_all_contracts();
      setContracts(response);
      console.log(response);
      return response;
    };
    getContracts();
  }, []);

  const album_artists = artists;
  const artist_albums = albums;

  return (
    <AlbumContext.Provider value={{ album_artists, artist_albums, contracts }}>
      {children}
    </AlbumContext.Provider>
  );
}

export { AlbumContext, AlbumContextProvider };
