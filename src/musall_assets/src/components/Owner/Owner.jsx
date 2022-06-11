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

export function Owner() {
  const { album_id } = useParams();
  const { album_artists } = useAlbum();
  console.log('[ARTISTS FROM CONTEXT]:=>', album_artists);
  const this_artist = album_artists[album_id];
  console.log('[ARTIST FROM DESCRIPTION]:=>', this_artist);
  return (
    <Page>
      <FlexContainer direction='vertical'>
        <Text>OWNER OF ARTWORK</Text>
        <Text>{this_artist.owner}</Text>
      </FlexContainer>
    </Page>
  );
}
