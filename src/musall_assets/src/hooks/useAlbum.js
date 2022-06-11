import { AlbumContext } from '../context/Album';
import { useContext, useEffect, useState } from 'react';

export const useAlbum = (collection, filter) => {
  const data = useContext(AlbumContext);
  const [filtered, setFiltered] = useState(
    filter === undefined ||
      Array.isArray(filter) ||
      typeof filter === 'function'
      ? []
      : null
  );

  useEffect(() => {
    if (data[collection]) {
      const updated = Array.isArray(filter)
        ? data[collection].filter((i) => filter.includes(i.id))
        : typeof filter === 'function'
        ? data[collection].filter(filter)
        : filter
        ? data[collection].find((i) => i.id === filter)
        : filter === null
        ? null
        : data[collection];
      if (updated && JSON.stringify(updated) !== JSON.stringify(data)) {
        setFiltered(updated);
      }
    }
  }, [data[collection], filter]); // eslint-disable-line

  if (!collection) {
    return data;
  } else return filtered;
};
