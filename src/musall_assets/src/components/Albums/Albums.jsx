import React, { useEffect, useState } from 'react';
import { FlexContainer } from '@sharingexcess/designsystem';
import { Page } from '../Page/Page';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAlbum } from '../../hooks/useAlbum';

export function Albums() {
  const [actor, setActor] = useState(null);
  const contracts = useAlbum('contracts');
  console.log(contracts);

  useEffect(() => {
    import('../../../../declarations/fileupload').then((module) => {
      setActor(module.fileupload);
    });
  }, []);

  function ContractCard({ contract }) {
    return (
      <Card
        sx={{ maxWidth: 345, margin: 1, borderRadius: 2, width: 300 }}
        className='Contract-Card'
      >
        <CardMedia
          component='img'
          alt={contract?.contract_description}
          height='140'
          image={contract?.url}
        />
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            {contract?.id}
          </Typography>
          <Typography variant='h6' color='secondary'>
            {contract?.contract_description.length > 100
              ? contract?.contract_description.slice(0, 97) + '...'
              : contract?.contract_description}

            {/* Scope of Work: {contract?.scope_of_work}
            Terms of Ownership: {contract?.terms_of_ownership} */}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' variant='contained'>
            buy
          </Button>
          <Button size='small'>
            <Link
              style={{ textDecoration: 'none', color: 'var(--purple)' }}
              to={`/albums/${contract?.id}`}
            >
              Learn More
            </Link>
          </Button>
        </CardActions>
      </Card>
    );
  }

  return (
    <Page id='Albums'>
      <FlexContainer direction='vertical' primaryAlign='center'>
        <h1>Albums</h1>
        <div
          id='Contracts-Container'
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {contracts.map((contract, index) => (
            <ContractCard key={index} contract={contract} />
          ))}
        </div>
      </FlexContainer>
    </Page>
  );
}
