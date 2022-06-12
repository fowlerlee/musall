import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Page } from '../Page/Page';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { artists } from '../../data';
import { useAlbum } from '../../hooks/useAlbum';

export function Contract() {
  const { pathname } = useLocation();
  // console.log('[PATHNAME FROM CONTRACT]:=>', pathname);

  const location = window.location.href;
  // console.log('[LOCATION FROM CONTRACT]:=>', location);

  const { album_id } = useParams();
  const album_contract = useAlbum('artists');
  console.log('[ARTIST FROM CONTRACT]:=>', album_contract);

  // console.log('[ALBUM ID FROM CONTRACT]:=>', album_id);

  const artist = artists[album_id];
  // console.log('[ALBUM OBJECT]:=>', artist);

  function ContractMenu() {}
  function ContractPreview() {
    return <img src='logo.png' alt='' id='Feature' />;
  }

  function Description({ contract }) {
    return (
      <FlexContainer direction='vertical'>
        <Text>DESCRIPTION OF ARTWORK</Text>
        <Text>{contract.description}</Text>
      </FlexContainer>
    );
  }
  function Scope({ contract }) {
    return (
      <FlexContainer direction='vertical'>
        <Text>SCOPE OF ARTWORK</Text>
        <Text>{contract.scope_of_work}</Text>
      </FlexContainer>
    );
  }
  function Price({ contract }) {
    return (
      <FlexContainer direction='vertical'>
        <Text>PRICE OF ARTWORK</Text>
        <Text>{contract.price}</Text>
      </FlexContainer>
    );
  }
  function Terms({ contract }) {
    return (
      <FlexContainer direction='vertical'>
        <Text>TERMS OF OWNERSHIP OF ARTWORK</Text>
        <Text>{contract.terms_of_ownership}</Text>
      </FlexContainer>
    );
  }
  function Owner({ contract }) {
    return (
      <FlexContainer direction='vertical'>
        <Text>OWNER OF ARTWORK</Text>
        <Text>{contract.owner}</Text>
      </FlexContainer>
    );
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
