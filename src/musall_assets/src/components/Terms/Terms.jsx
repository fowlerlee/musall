import React from 'react';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { useAlbum } from '../../hooks/useAlbum';
import { Page } from '../Page/Page';
import { useParams } from 'react-router-dom';

export function Terms() {
  const { album_id } = useParams();
  const { album_artists } = useAlbum();
  console.log('[ARTISTS FROM CONTEXT]:=>', album_artists);
  const this_artist = album_artists[album_id];
  console.log('[ARTIST FROM DESCRIPTION]:=>', this_artist);

  return (
    <Page>
      <FlexContainer direction='vertical'>
        <Text>TERMS OF OWNERSHIP OF ARTWORK</Text>
        <Text>{this_artist.terms_of_ownership}</Text>
      </FlexContainer>
    </Page>
  );
}
