import React from 'react';
import { FlexContainer } from '@sharingexcess/designsystem';
import { useAlbum } from '../../hooks/useAlbum';
import { Page } from '../Page/Page';
import { useParams } from 'react-router-dom';

export function Terms() {
  const { album_id } = useParams();
  const { album_artists } = useAlbum();
  const this_artist = album_artists[album_id];

  return (
    <Page>
      <FlexContainer direction='vertical'>
        <h1>TERMS OF OWNERSHIP OF ARTWORK</h1>
        <p>{this_artist.terms_of_ownership}</p>
      </FlexContainer>
    </Page>
  );
}
