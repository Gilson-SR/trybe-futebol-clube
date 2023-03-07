import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import User from '../database/models/UserModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

it('testando leaderboard em home', async () => {
    const home = await chai
       .request(app).get('/leaderboard/home');

    expect(home.status).to.be.deep.equal(200);
  });