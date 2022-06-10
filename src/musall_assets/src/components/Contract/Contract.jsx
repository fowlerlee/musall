import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Page } from '../Page/Page';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { artists } from '../../data';

export function Contract() {
  const navigate = useNavigate();
  const { album_id } = useParams();
  console.log(album_id);
  const artist = artists[album_id];
  console.log(artist);

  function ContractMenu() {}
  function ContractPreview() {
    return <img src='logo.png' alt='' id='Feature' />;
  }
  return (
    <Page id='Contract'>
      <FlexContainer direction='vertical'>
        <h1>{album_id}</h1>
        <h1>Contract</h1>
      </FlexContainer>
    </Page>
  );
}
