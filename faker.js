const faker = require('faker');
const fs = require('fs');

faker.locale = 'id_ID';
let data = [];

for (let i = 0; i < 50; i++) {
  const first_name = faker.name.firstName();
  const last_name = faker.name.lastName();
  const date = faker.date.between('2020-08-04', '2020-08-17');
  data.push({
    name: `${first_name} ${last_name}`,
    email: faker.internet.email(first_name, last_name, 'gmail.com').toLowerCase(),
    phone: faker.phone.phoneNumber('08##########'),
    address: faker.fake('{{address.streetName}} {{address.streetAddress}}'),
    status: faker.random.arrayElement(['PELAJAR', 'MAHASISWA', 'PEKERJA']),
    major: faker.name.jobTitle(),
    institution: faker.company.companyName(),
    region: faker.random.arrayElement([
      'DENPASAR',
      'JEMBER',
      'JOMBANG',
      'KEDIRI',
      'MADIUN',
      'MALANG',
      'MATARAM',
      'SIDOARJO',
      'SYDNEY',
      'TULUNGAGUNG',
    ]),
    createdAt: date,
    updatedAt: date,
  });
}

fs.writeFile('data.json', JSON.stringify(data), (err) => {
  if (err) console.log(err);
  else console.log('done');
});
