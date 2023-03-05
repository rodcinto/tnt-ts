const chai = require('chai');
const {use, expect} = chai;
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');

use(chaiHttp);

const {request} = chai;

before(async () => {
  const person = {
    username: 'to_be_found',
    name: 'Person To Be Found',
    email: 'johndoe_tobefound@gmail.com',
  };

  const response = await request('http://localhost:8080')
    .post('/person')
    .send(person);
});

describe('Find Person API', () => {
  it('should find a Person by Username', async () => {

    const response = await request('http://localhost:8080')
      .get('/person/to_be_found');

    expect(response.status).to.equal(200);
  });
});
