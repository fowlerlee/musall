import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FlexContainer,
  Text,
  Button,
  Spacer,
} from '@sharingexcess/designsystem';
import { Page } from '../Page/Page';
import { albums } from '../../data';
import UploadButton from '../atoms/uploadButton';
import { fileupload } from '../../../../declarations/fileupload';
import { musall } from '../../../../declarations/musall';

export function Albums() {
  const [contract, setContract] = useState({
    description: '',
    scopeOfWork: '',
    priceOfItem: '',
    termsOfOwnership: '',
    numberOfTokens: '',
    image: '',
  });
  const [actor, setActor] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  let file;

  useEffect(() => {
    import('../../../../declarations/fileupload').then((module) => {
      setActor(module.fileupload);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('musall canister:', musall);
    // creating the contract
    let response = await musall.creator_contract_submitted(
      contract.description,
      contract.scopeOfWork,
      BigInt(contract.priceOfItem),
      contract.termsOfOwnership,
      BigInt(contract.numberOfTokens)
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

  function AlbumCover() {
    // Buffer.from(str, 'base64')
    // buf.toString('base64')
    // return <img src={atob(value.data)} />;
  }

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
        <form action=''>
          <label htmlFor='description'>Description</label>
          <textarea
            rows={10}
            type='text'
            name='description'
            onChange={handleInputChange}
          />
          <label htmlFor='scope'>Scope of Work</label>
          <textarea
            rows={10}
            type='text'
            name='scope'
            onChange={handleInputChange}
          />
          <label htmlFor='owner'>Owner</label>
          <textarea
            rows={1}
            type='text'
            name='owner'
            onChange={handleInputChange}
          />
          <label htmlFor='price'>Price</label>
          <textarea
            rows={1}
            type='text'
            name='price'
            onChange={handleInputChange}
          />
          <label htmlFor='terms'>Terms</label>
          <textarea
            rows={10}
            type='text'
            name='terms'
            onChange={handleInputChange}
          />
          <label htmlFor='numberOfTokens'>Number of Tokens</label>
          <textarea
            rows={1}
            type='text'
            name='numberOfTokens'
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>SUBMIT CONTRACT</button>
        </form>
        <h1>IMAGE FORM</h1>
        <UploadButton />
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
