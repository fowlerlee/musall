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

const card = (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
        <b>Feature</b>
      </Typography>
      <Typography variant='body2'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas
        cupiditate non doloribus debitis laudantium nemo dolores dolor ullam
        omnis expedita in veniam, consectetur voluptas doloremque corrupti ipsam
        quisquam voluptates est!
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
          Molestiae placeat est exercitationem accusantium quasi adipisci, earum
          fugiat vitae alias consequatur repellat at, reprehenderit velit
          suscipit, vel dolore? Quae illum, eaque mollitia ea dignissimos in
          vitae voluptatem nihil quaerat?
        </p>
      </section>
      <section id='Cards-Container-1'>
        <p>
          Accusantium molestias libero repellendus magni ipsa suscipit hic
          quaerat vero sequi beatae molestiae, sit cumque saepe laboriosam
          deleniti sapiente quidem numquam aut eum assumenda magnam ea fuga rem!
          Dolorem, eveniet.
        </p>
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card}</Card>
        </Box>
        <br />
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card}</Card>
        </Box>
        <br />
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined'>{card}</Card>
        </Box>
      </section>
      <section id='Cards-Container-2'>
        <p>
          Modi obcaecati, accusamus, molestias ad impedit placeat omnis quas
          officiis illo quam tenetur dolores laborum enim sapiente soluta nihil
          possimus earum suscipit temporibus voluptatum explicabo provident.
          Aliquam blanditiis facere quo?
        </p>
        <div id='Box-Container'>
          <Box sx={{ display: 'flex' }}>
            <Card variant='outlined' sx={{ maxWidth: 300 }}>
              {card}
            </Card>
          </Box>
          <br />
          <Box sx={{ display: 'flex' }}>
            <Card variant='outlined' sx={{ maxWidth: 300 }}>
              {card}
            </Card>
          </Box>
          <br />
          <Box sx={{ display: 'flex' }}>
            <Card variant='outlined' sx={{ maxWidth: 300 }}>
              {card}
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
