import React from 'react';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { Page } from '../Page/Page';

export function Contracts() {
  function ContractPreview() {
    return <img src='logo.png' alt='' id='Feature' />;
  }
  return (
    <Page id='Contracts'>
      <FlexContainer direction='vertical'>
        <h1>Albums</h1>
      </FlexContainer>
    </Page>
  );
}
