import React from 'react';
import { Page } from '../Page/Page';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Spacer } from '@sharingexcess/designsystem';

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
  return (
    <div id='Landing'>
      <section id='Hero'>
        <h1 style={{ fontSize: '6rem' }}>Musall is here!</h1>
        <div id='Buttons-Container'>
          <Button variant='contained' color='secondary' size='large'>
            try alpha
          </Button>
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
        <img
          src='musall.png'
          alt='musall'
          style={{ width: '240px', margin: '0 auto' }}
        />
        <br />
        {/* <a href='#'>alpha</a> */}
        {/* <h2 style={{ margin: '0 auto' }}>Team</h2> */}
        <div id='Team'>
          <div className='Team-Member'>
            <img src='oroghene.jpg' alt='' className='Team-Member-Photo' />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              facilis vitae magni esse reprehenderit aperiam cumque!
              Reprehenderit natus recusandae aperiam rem sit repudiandae
              voluptatum magni! Dicta amet vel tempora. Ex!
            </p>
          </div>
          <div className='Team-Member'>
            <img src='oroghene.jpg' alt='' className='Team-Member-Photo' />
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit
              facilis vitae magni esse reprehenderit aperiam cumque!
              Reprehenderit natus recusandae aperiam rem sit repudiandae
              voluptatum magni! Dicta amet vel tempora. Ex!
            </p>
          </div>
        </div>
        <aside style={{ textAlign: 'center' }}>
          <span>&#169;</span> 2022 Musall. All rights reserved.
        </aside>
      </section>
    </div>
  );
}
