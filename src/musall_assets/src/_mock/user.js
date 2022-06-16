import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'offline']),
  role: sample([
    'Rapper',
    'PR Manager',
    'Sound Designer',
    'Rapper',
    'Solo Singer',
    'Project Manager',
    'Hip Hop singer',
    'Pop Star',
    'Countryside',
    'RnB Vocalist',
  ]),
}));

export default users;
