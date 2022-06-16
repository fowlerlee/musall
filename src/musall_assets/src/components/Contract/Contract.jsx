import React from 'react';
import { useParams } from 'react-router';
import { Page } from '../Page/Page';
import { FlexContainer, Text } from '@sharingexcess/designsystem';
import { artists } from '../../data';
import { useAlbum } from '../../hooks/useAlbum';

export function Contract() {
  const { album_id } = useParams();
  const album_contract = useAlbum('artists');
  const artist = artists[album_id];
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
    <Page>
      <FlexContainer direction='vertical'>
        <h1>{album_id}</h1>
        <h1>Contract</h1>
      </FlexContainer>
    </Page>
  );
}
