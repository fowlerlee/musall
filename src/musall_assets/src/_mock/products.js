import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Studio MacBook Pro fro Pros.',
  'AudioBox Hippie 04',
  'MDR Pegasus 37 A.I.R.',
  'Nike Audio Interface',
  ' ZoomX Super Audio Interface.',
  'Zoom Freak Set 2',
  'Nike Air Max Zephyr',
  ' Delta Drumset',
  'Microphone XXXV',
  'Brass Sound Mic.',
  'Kyrie Microphone 3D',
  'Sonic Mic FTC',
  'Mega Sound Mic LX',
  'Sonic Sounds Mic',
  'Bass Led Speaker',
  'Ultra NF Speaker',
  'Max Up Speaker',
  ' React ENG Cable',
  'NikeCourt Cables',
  'Overhead Stand',
  'SuperRep Stand',
  'Led Mic Stand',
  'Alctron PF8',
  'Drumset Infinity Run Flyknit.',
];
const PRODUCT_COLOR = ['#00AB55', '#000000', '#FFFFFF', '#FFC0CB', '#FF4842', '#1890FF', '#94D82D', '#FFC107'];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/static/mock-images/products/product_${setIndex}.jpg`,
    name: PRODUCT_NAME[index],
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 }),
    priceSale: setIndex % 3 ? null : faker.datatype.number({ min: 19, max: 29, precision: 0.01 }),
    colors:
      (setIndex === 1 && PRODUCT_COLOR.slice(0, 2)) ||
      (setIndex === 2 && PRODUCT_COLOR.slice(1, 3)) ||
      (setIndex === 3 && PRODUCT_COLOR.slice(2, 4)) ||
      (setIndex === 4 && PRODUCT_COLOR.slice(3, 6)) ||
      (setIndex === 23 && PRODUCT_COLOR.slice(4, 6)) ||
      (setIndex === 24 && PRODUCT_COLOR.slice(5, 6)) ||
      PRODUCT_COLOR,
    status: sample(['sale', 'new', '', '']),
  };
});

export default products;
