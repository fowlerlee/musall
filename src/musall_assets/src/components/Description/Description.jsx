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

export function Description() {
  const { album_id } = useParams();
  const { album_artists } = useAlbum();
  const this_artist = album_artists[album_id];

  return (
    <Page>
      <FlexContainer direction='vertical'>
        <Text>DESCRIPTION OF ARTWORK</Text>
        <Text>{this_artist.description}</Text>
      </FlexContainer>
    </Page>
  );
}
