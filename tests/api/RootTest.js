const chai = require('chai');
const {use, expect} = chai;
const chaiHttp = require('chai-http');
const {describe, it} = require('mocha');

use(chaiHttp);

const {request} = chai;

describe('Root', () => {
  it('should see the API root', async () => {
    const response = await request('http://localhost:8080').get('/');

    expect(response.status).to.equal(200);
    expect(response.text).to.deep.equal('This is Treash and Treasure');
  });
});
