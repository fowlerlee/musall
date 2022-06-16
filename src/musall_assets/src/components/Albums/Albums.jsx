import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlexContainer } from '@sharingexcess/designsystem';
import { Page } from '../Page/Page';
import { albums } from '../../data';
import UploadButton from '../atoms/uploadButton';
import { musall } from '../../../../declarations/musall';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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

  function Album({ album }) {
    return (
      <Link to={`/albums/${album?.id}`}>
        <img src={album?.cover} alt='' className='Album' />
      </Link>
    );
  }

  function ContractCard({ contract }) {
    return (
      <Card sx={{ maxWidth: 345 }} style={{ margin: '8px', width: '300px' }}>
        <CardMedia
          component='img'
          height='140'
          image={contract?.cover}
          alt={contract?.owner}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {contract?.owner}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {contract?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Buy</Button>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
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
        <div style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
          {albums.map((album, index) => (
            <ContractCard key={index} contract={album} />
          ))}
        </div>
      </FlexContainer>
    </Page>
  );
}
