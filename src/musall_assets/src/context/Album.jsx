import { createContext, useState, useEffect } from 'react';
import { artists, albums } from '../data';

const AlbumContext = createContext(undefined);
AlbumContext.displayName = 'AlbumContext';

function AlbumContextProvider({ children }) {
  const album_artists = artists;
  const artist_albums = albums;

  return (
    <AlbumContext.Provider value={{ album_artists, artist_albums }}>
      {children}
    </AlbumContext.Provider>
  );
}

export { AlbumContext, AlbumContextProvider };
