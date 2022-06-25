import React, { useEffect } from 'react';
import { Page } from '../Page/Page';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Spacer } from '@sharingexcess/designsystem';
import PlugConnect from '@psychedelic/plug-connect';
import canisterIds from '../../../../../.dfx/local/canister_ids.json';
import { useNavigate } from 'react-router-dom';

const card1 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 15 }} color='text.secondary' gutterBottom>
        <b>Fair Contracts</b>
      </Typography>
      <Typography variant='body2'>
        Creators / Musicians develop a contract that is fair and transparent. Work
        is appropriately scoped and sold at a price that is fair to fans
        and to Musall investors.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const card2 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 15 }} color='text.secondary' gutterBottom>
        <b>Fans own music</b>
      </Typography>
      <Typography variant='body2'>
        Investors / Fans browse through a collection of contracts that are community rated as a good investment.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const card3 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 15 }} color='text.secondary' gutterBottom>
        <b>Listen to music and earn</b>
      </Typography>
      <Typography variant='body2'>
        Fans / Investors consume music that they partially own, and receive payment in the form of
        royalties
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const card4 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 15 }} color='text.secondary' gutterBottom>
        <b>Music streaming</b>
      </Typography>
      <Typography variant='body2'>
        Musall will host and stream music to users as a service
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const card5 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 15 }} color='text.secondary' gutterBottom>
        <b>Roylaties payment canister</b>
      </Typography>
      <Typography variant='body2'>
        Musall records frequency of music engagement, then regularly executes a payment via nns-Ledger to user accounts.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

const card6 = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 15 }} color='text.secondary' gutterBottom>
        <b>Musall expansion</b>
      </Typography>
      <Typography variant='body2'>
        Shared ownership of contracts will be extended to several categories -
        Housing and Property, Reseach projects, Film projects ...
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export function Hero() {
  const navigate = useNavigate();
  const canisterId1 = canisterIds.__Candid_UI.local;
  const canisterId2 = canisterIds.musall_assets.local;
  const canisterId3 = canisterIds.musall.local;

  let whitelist = [canisterId1, canisterId2, canisterId3];
  let host = 'https://mainnet.dfinity.network';

  useEffect(() => {
    async function verifyConnectionAndAgent() {
      const connected = await window.ic.plug.isConnected();
      if (!connected) window.ic.plug.requestConnect({ whitelist, host });
      if (connected && !window.ic.plug.agent) {
        window.ic.plug.createAgent({ whitelist, host });
      }
    }
    verifyConnectionAndAgent();
  }, []);

  return (
    <div id='Landing'>
      <section id='Hero'>
        <h1 style={{ fontSize: '6rem' }}>Musall is here!</h1>
        <div id='Buttons-Container'>
          {/* <Button variant='contained' color='secondary' size='large'>
            try alpha
          </Button> */}
          <PlugConnect
            dark
            title='Try Alpha'
            host='https://mainnet.dfinity.network'
            whitelist={[canisterId1, canisterId2, canisterId3]}
            onConnectCallback={() => navigate('/albums')}
          />
          <Spacer width={32} />
          <Button variant='contained' color='secondary' size='large'>
            read more
          </Button>
        </div>
      </section>
      <section id='Supernova'>
        <h2 style={{ textAlign: 'center' }}>Powered by DFINITY</h2>
        <img src='logo.png' alt='Internet Computer Logo' id='logo' />
      </section>
      <section id='Intro'>
        <h1>Introducing Musall</h1>
        <p>
          Music ownership is broken! At Musall we aim to change ownership to a <em>shared model</em>
        </p>
      </section>
      <section id='Cards-Container-1'>
        <p>
          Using key features of the IC:
        </p>
        <p>
          <em>Permissionless</em>, <em>Censorship-resistance</em>, <em>Capture-resistance</em>, and <em>Recursive incentives</em>,
        </p>
        <p>
          Musall provides a platform for creation of contracts by Musicians, which are shared with fans
          and investors in a <em>shared ownership model</em>.
        </p>
        <p>
          Result: Musicians and their fans earn together from royalties. No more working two jobs to fund your music.
        </p>
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card1}</Card>
        </Box>
        <br />
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card2}</Card>
        </Box>
        <br />
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card3}</Card>
        </Box>
      </section>
      <section id='Cards-Container-2'>
        <h2>
          Features to come in the next phase of development
        </h2>
        <div id='Box-Container'>
          <Box sx={{ display: 'flex' }}>
            <Card variant='outlined' sx={{ maxWidth: 300 }}>
              {card4}
            </Card>
          </Box>
          <br />
          <Box sx={{ display: 'flex' }}>
            <Card variant='outlined' sx={{ maxWidth: 300 }}>
              {card5}
            </Card>
          </Box>
          <br />
          <Box sx={{ display: 'flex' }}>
            <Card variant='outlined' sx={{ maxWidth: 300 }}>
              {card6}
            </Card>
          </Box>
        </div>
      </section>
      {/* <section id='Sample'>
        <h1>Sample Contracts</h1>
        <div id='Sample-Container'>
          <p>
            Voluptas illo ullam libero sint velit dignissimos minus. Ipsum enim
            a pariatur magnam veritatis harum quae error obcaecati animi
            necessitatibus repudiandae sed rem repellat similique, quidem vero
            ut recusandae. Ipsum?
          </p>
        </div>
      </section> */}
      <section id='Footer'>
        <br />
        <aside style={{ textAlign: 'center' }}>
          <span>&#169;</span> 2022 Musall. All rights reserved.
        </aside>
      </section>
    </div>
  );
}
