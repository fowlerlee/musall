import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Page } from '../Page/Page';
import UploadButton from '../atoms/uploadButton';
import { musall } from '../../../../declarations/musall';

export function Apartments() {
  const [contract, setContract] = useState({
    description: '',
    scopeOfWork: '',
    priceOfItem: '',
    termsOfOwnership: '',
    numberOfTokens: '',
    image: '',
  });
  const methods = useForm();
  const [actor, setActor] = useState(null);

  useEffect(() => {
    import('../../../../declarations/fileupload').then((module) => {
      setActor(module.fileupload);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(contract);

    console.log('musall canister:', musall);
    // creating the contract
    let response = await musall.creator_contract_submitted(
      'im',
      BigInt(2),
      BigInt(8),
      'ok',
      'no'
    );
    window.alert(response.ok);
    console.log('respone:', response);

    // submitting the contract
    let contractSubmission = await musall.submit_contract(
      contract.description,
      contract.scopeOfWork,
      BigInt(contract.priceOfItem),
      contract.termsOfOwnership,
      BigInt(contract.numberOfTokens),
      musall.whoami()
    );
    setContract(null);
    console.log('Contract Submission:', contractSubmission);
    return response;
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setContract({
      ...contract,
      [name]: value,
    });
  }

  return (
    <Page>
      <FormProvider {...methods}>
        <div id='Apartments'>
          <Typography variant='h6' gutterBottom>
            Shipping address
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container item lg={12} spacing={1}>
              <TextField
                fullWidth
                multiline
                minRows={5}
                label='Description'
                id='description'
                name='description'
                placeholder='Description'
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                multiline
                minRows={5}
                label='Scope of Work'
                id='scope-of-work'
                name='scopeOfWork'
                placeholder='Scope of Work'
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                type='number'
                label='Price of Item'
                id='price-of-item'
                name='priceOfItem'
                placeholder='Price of Item'
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                multiline
                minRows={5}
                label='Terms of Ownership'
                id='terms-of-ownership'
                name='termsOfOwnership'
                placeholder='Terms of Ownership'
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                type='number'
                label='Number of Tokens'
                id='number-of-tokens'
                name='numberOfTokens'
                placeholder='Number of Tokens'
                onChange={handleInputChange}
              />
              <Typography variant='h6' gutterBottom>
                Upload Album Art
              </Typography>
            </Grid>
            <UploadButton />
            <br />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' color='primary'>
                SUBMIT CONTRACT
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </Page>
  );
}
