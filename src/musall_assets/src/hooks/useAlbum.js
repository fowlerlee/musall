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

  // Works the same as JSON.stringify, but also handles BigInt type,
  // using 123n format, to make sure the result is reversible:
  // SOURCE: https://medium.com/@vitalytomilov/reversible-bigint-serialization-8cba9deefad7

  function stringify(value) {
    if (value !== undefined) {
      return JSON.stringify(value, (_, v) =>
        typeof v === 'bigint' ? `${v}n` : v
      );
    }
  }

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
      if (updated && stringify(updated) !== stringify(data)) {
        setFiltered(updated);
      }
    }
  }, [data[collection], filter]); // eslint-disable-line

  if (!collection) {
    return data;
  } else return filtered;
};
