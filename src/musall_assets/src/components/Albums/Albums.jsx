import React, { useEffect, useState } from 'react';
import { FlexContainer } from '@sharingexcess/designsystem';
import { Page } from '../Page/Page';
import { albums } from '../../data';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export function Albums() {
  const [actor, setActor] = useState(null);

  useEffect(() => {
    import('../../../../declarations/fileupload').then((module) => {
      setActor(module.fileupload);
    });
  }, []);

  function ContractCard({ album }) {
    return (
      <Card
        sx={{ maxWidth: 345, margin: 1, borderRadius: 2, width: 300 }}
        className='Contract-Card'
      >
        <CardMedia
          component='img'
          alt={album?.description}
          height='140'
          image={album?.cover}
        />
        <CardContent>
          <Typography gutterBottom variant='h4' component='div'>
            {album?.id}
          </Typography>
          <Typography variant='h6' color='secondary'>
            Scope of Work: {album?.scope_of_work}
            Terms of Ownership: {album?.terms_of_ownership}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' variant='contained'>
            buy
          </Button>
          <Button size='small'>
            <Link
              style={{ textDecoration: 'none', color: 'var(--purple)' }}
              to={`/albums/${album?.id}`}
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
            justifyContent: 'center',
          }}
        >
          {albums.map((album, index) => (
            <ContractCard key={index} album={album} />
          ))}
        </div>
      </FlexContainer>
    </Page>
  );
}
