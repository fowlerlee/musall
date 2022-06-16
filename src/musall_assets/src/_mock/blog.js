import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const POST_TITLES = [
  'Whiteboard  By the music Industry Leaders',
  'Experience Live Concert On The Metaverse with Your Favourite Artists, Get Your Tickets Ready..',
  '✨Granda Fountain Metaverse Concert.✨',
  '✨African 02 Arena Summer Tour. ✨',
  'Fresh Prince',
  '6lack Studio',
  'Lil baby Super Guitar',
  'All about Drake,  Join in Live and Be Part of The  Project.',
  '40 NFTs Serif Violins from Lildurk',
  'Thanos got her fans emotioal with her latest album, Join and be the first to stream.',
  'Katie Griffin loves making that homey Playcard art',
  'The American Dream retold through mid-century railroad Musics',
  'All the 80s Mid-cenury Arts in Music.',
  'American Most talented, Fisher Kage and all about him.',
  'Asian Got Talent show and the live concert.',
  'Tylko Studio equipments and Albums',
  'RAYO ?? A expanded visual arts, festival and NFTs',
  'Paul Bond and Wired mag’s Andy Deco discuss how they made the summers Album.',
  'Inside the Mind of Samuel Day, The EP by Emchaz',
  'All about 2pac And The Death Row Record',
  'Ake van Margraten the Ape.',
  '02 Ticket icon and the NFTs',
  'Dyson Studio Equipments for new Felas!',
  'Alicia Keys NFTs',
  'Paul Malcon Disputed Arts.',
  'Tony 3D Fan NFT Art.',
  'Alicia Keys NFTs',
  'Burnaboy African Giant art',
  'King Vox Virtual Arts',
  'Tems Essence Album Gold',
  'Love and Lust Album NFT',
  'Wizkid 02 Arena NFTs',
  'Norch Studio Arts',
  'Roddy Ricch Fans Ape',
  'Drake (No More Tears) Fan Collections',
  'Migos Fans Collections',
];

const posts = [...Array(35)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/static/mock-images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.findName(),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
