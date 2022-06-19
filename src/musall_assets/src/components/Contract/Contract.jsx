import React from 'react';
import { useParams } from 'react-router';
import { Page } from '../Page/Page';
import { FlexContainer, Text } from '@sharingexcess/designsystem';
import { artists } from '../../data';
import { useAlbum } from '../../hooks/useAlbum';

export function Contract() {
  const { album_id } = useParams();
  const contracts = useAlbum('contracts');
  const contract = useAlbum(
    'contracts',
    contracts ? contracts.find((c) => c.id === album_id) : null
  );

  return (
    <Page>
      <FlexContainer direction='vertical'>
        <img src={contract[0]?.url} alt={album_id} style={{ width: '300px' }} />
        <h1>Description</h1>
        <p>{contract[0]?.contract_description}</p>
        <h1>Scope of Work</h1>
        <p>{contract[0]?.scope_of_work}</p>
        <h1>Terms of Ownership</h1>
        <p>{contract[0]?.terms_of_ownership}</p>
        <h1>Number of Tokens</h1>
        <p>{contract[0]?.number_of_tokens.toString()} ICP</p>
        <h1>Price</h1>
        <p>{contract[0]?.price_of_contract.toString()} ICP</p>
      </FlexContainer>
    </Page>
  );
}
