import React from 'react';
import { Link } from 'react-router-dom';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { Page } from '../Page/Page';
import { albums } from '../../data';

export function Albums() {
  function FeatureAlbum({ feature }) {
    return (
      <Link to={`/albums/${feature?.id}`}>
        <img src={feature?.cover} alt='' className='Feature' />
      </Link>
    );
  }

  function Album({ album }) {
    return (
      <Link to={`/albums/${album?.id}`}>
        <img src={album?.cover} alt='' className='Album' />
      </Link>
    );
  }

  return (
    <Page id='Albums'>
      <FlexContainer direction='vertical'>
        <h1>Albums</h1>
        <FlexContainer fullWidth>
          <FeatureAlbum feature={albums[3]} />
        </FlexContainer>
        <FlexContainer direction='horizontal' primaryAlign='end' fullWidth>
          {albums.map((album) => (
            <Album key={album.id} album={album} />
          ))}
          <Album />
          <Album />
          <Album />
        </FlexContainer>
      </FlexContainer>
    </Page>
  );
}
