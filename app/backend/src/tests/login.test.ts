import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
// import User from '../database/models/UserModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test 1', () => {
    it('', async () => {
      const email = await chai
        .request(app)
        .post('/login')
        .send({ email: '', password:  'secret_admin'});
      expect(email.status).to.equal(400)
      expect(email.body).to.deep.equal({ message: 'All fields must be filled' })
    });
  });
describe('Test 2', () => {
    it('', async () => {
      const password = await chai
        .request(app)
        .post('/login')
        .send({ email: 'admin@admin.com', password:  ''});
      expect(password.status).to.equal(400)
      expect(password.body).to.deep.equal({ message: 'All fields must be filled' })
    });
  });
  describe('Test 3', () => {
      it('', async () => {
        const test = await chai
          .request(app)
          .post('/login')
          .send({ email: 'admin@admin.com', password:  'secret_admin'});
        expect(test.status).to.equal(200)
        expect(test.body).to.have.property('token')
      });
  });
describe('Test 4', () => {
    it('', async () => {
      const data = await chai
        .request(app)
        .post('/login')
        .send({ email: 'felipe@admin.com', password:  'felipe'});
      expect(data.status).to.equal(401)
      expect(data.body).to.deep.equal({ message: 'Invalid email or password' })
    });
  });