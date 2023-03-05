const {describe, it, beforeEach} = require('mocha');
const sinon = require('sinon');
const npmlog = require('npmlog');
const express = require('express');

let Server;

beforeEach(() => {
  Server = require('../../build/src/server');
});

describe('Server', () => {
  it('should listen', () => {
    const app = express();
    const listenStub = sinon.stub(app, 'listen').returns(() => {});

    const loggerMock = sinon.mock(npmlog);
    loggerMock.expects('info').once();

    const appServer = new Server.default(app, loggerMock);
    appServer.start();
    sinon.assert.calledOnce(listenStub);
  });

  it('should log error', () => {
    const app = express();
    sinon.stub(app, 'use').throws(new Error('Bad Configuration'));
    sinon.stub(app, 'listen').returns(() => {});

    const loggerMock = sinon.mock(npmlog);
    loggerMock.error = () => {};
    loggerMock.expects('error').once();

    const appServer = new Server.default(app, loggerMock);
    appServer.start();
  });
});
