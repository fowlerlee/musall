import React from 'react';
import { FlexContainer } from '@sharingexcess/designsystem';
import { useAlbum } from '../../hooks/useAlbum';
import { Page } from '../Page/Page';
import { useParams } from 'react-router-dom';

export function Price() {
  const { album_id } = useParams();
  const { album_artists } = useAlbum();
  const this_artist = album_artists[album_id];

  return (
    <Page>
      <FlexContainer direction='vertical'>
        <h1>PRICE OF ARTWORK</h1>
        <p>{this_artist.price}</p>
      </FlexContainer>
    </Page>
  );
}
