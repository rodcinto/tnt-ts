const chai = require('chai');
const {use, expect} = chai;
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');

use(chaiHttp);

const {request} = chai;

describe('Person', () => {
  it('should create a person', async () => {
    const person = {
      login: 'john.doe',
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    };

    const response = await request('http://localhost:8080')
      .post('/person')
      .send(person);

    expect(response.status).to.equal(201);
  });
});
