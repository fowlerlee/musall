import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { FormProvider } from 'react-hook-form';
import { Page } from '../Page/Page';
import { musall } from '../../../../declarations/musall';
import { fileupload } from '../../../../declarations/fileupload';
import { useNavigate } from 'react-router-dom';

// TODO: REDIRECT USER TO DIFFERENT PAGE SHOWING CONTRACT JUST CREATED
// TODO: CONNECT IMAGE IN FILEUPLOAD CANISTER TO CONTRACT OBJECT IN MUSALL CANISTER
export function CreateContract() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [batchName, setBatchName] = useState('');
  const [actor, setActor] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [contract, setContract] = useState({
    description: '',
    scopeOfWork: '',
    priceOfItem: '',
    termsOfOwnership: '',
    numberOfTokens: '',
  });

  useEffect(() => {
    import('../../../../declarations/fileupload').then((module) => {
      setActor(module.fileupload);
    });
  }, []);

  const uploadChunk = async ({ batch_name, chunk }) =>
    fileupload.create_chunk({
      batch_name,
      content: [...new Uint8Array(await chunk.arrayBuffer())],
    });

  const upload = async () => {
    if (!file) {
      alert('No file selected');
      return;
    }

    console.log('start upload');
    const batch_name = file.name;
    setBatchName(file.name);
    console.log('[batch name from upload()]:', batch_name);
    const promises = [];
    const chunkSize = 500000;

    for (let start = 0; start < file.size; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);

      promises.push(
        uploadChunk({
          batch_name,
          chunk,
        })
      );
    }

    const chunkIds = await Promise.all(promises);

    console.log(chunkIds);

    await fileupload.commit_batch({
      batch_name,
      chunk_ids: chunkIds.map(({ chunk_id }) => chunk_id),
      content_type: file.type,
    });

    console.log('uploaded');

    loadImage(batch_name);
    setContract({
      ...contract,
      image: batch_name,
    });
  };

  const loadImage = (batch_name) => {
    if (!batch_name) {
      return;
    }

    const newImage = document.createElement('img');
    // newImage.src = `http://localhost:8000/assets/${batch_name}?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai`;
    newImage.src = `http://localhost:8000/assets/${batch_name}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`;

    const img = document.querySelector('section:last-of-type img');
    img?.parentElement.removeChild(img);

    const section = document.querySelector('section:last-of-type');
    section?.appendChild(newImage);
  };

  const handleImageUpload = async (event) => {
    event.preventDefault();
    await upload();
    setImageUrl(
      `http://localhost:8000/assets/${file.name}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`
    );
    console.log('[batch name]:', batchName);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('musall canister:', musall);
    let response = await musall.creator_contract_submitted(
      contract.description,
      contract.scopeOfWork,
      BigInt(contract.priceOfItem),
      contract.termsOfOwnership,
      BigInt(contract.numberOfTokens),
      imageUrl
    );
    console.log('respone:', response);
    navigate('/albums');
    return response;
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setContract({
      ...contract,
      [name]: value,
    });
  }

  function NewImage({ batch_name }) {
    if (!batch_name) {
      return;
    }
    return (
      <div>
        <img
          // src={`http://localhost:8000/assets/${batch_name}?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai`}
          src={`http://localhost:8000/assets/${batch_name}?canisterId=rrkah-fqaaa-aaaaa-aaaaq-cai`}
          alt='CHUNKS OF FILE'
          style={{ width: '300px' }}
        />
      </div>
    );
  }

  return (
    <Page>
      <FormProvider>
        <div className='Create-Contract'>
          <Typography variant='h6' gutterBottom>
            CONTRACT IMAGE
          </Typography>
          <form onSubmit={handleImageUpload}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                component='label'
                color={file ? 'inherit' : 'secondary'}
              >
                {file ? 'uploaded' : 'Upload file'}
                <input
                  type='file'
                  hidden
                  onChange={(event) => {
                    setFile(event.target.files?.[0]);
                  }}
                />
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                SUBMIT
              </Button>
            </div>
            <br />
            <NewImage batch_name={batchName} />
          </form>
        </div>
      </FormProvider>
      <br />
      <FormProvider>
        <div className='Create-Contract'>
          <Typography variant='h6' gutterBottom>
            CONTRACT DETAILS
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container item lg={12} spacing={1}>
              <TextField
                fullWidth
                value={imageUrl}
                label='Image URL'
                id='image-url'
                name='imageUrl'
                placeholder='Image URl'
              />
              <TextField
                fullWidth
                value={contract.description}
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
                value={contract.scopeOfWork}
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
                value={contract.priceOfItem}
                type='number'
                label='Price of Item'
                id='price-of-item'
                name='priceOfItem'
                placeholder='Price of Item'
                onChange={handleInputChange}
              />
              <TextField
                fullWidth
                value={contract.termsOfOwnership}
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
                value={contract.numberOfTokens}
                type='number'
                label='Number of Tokens'
                id='number-of-tokens'
                name='numberOfTokens'
                placeholder='Number of Tokens'
                onChange={handleInputChange}
              />
            </Grid>
            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button type='submit' variant='contained' color='primary'>
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </FormProvider>
    </Page>
  );
}
