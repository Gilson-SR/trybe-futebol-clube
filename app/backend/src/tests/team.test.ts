import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import { Response } from 'superagent';
import Team  from '../database/models/TeamModel';
import TeamService from '../services/TeamService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando Team', () => {
  describe('Test 1', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('', async () => {

      const teams :Team[] = [ new Team({ id: 1, teamName: 'Teste' }) ];
      sinon.stub(Team, 'findAll').resolves(teams);
    const teamService = new TeamService();

    const result = await teamService.getAll();

    expect(result).to.be.deep.eq(teams);
    expect(result.length).to.be.eq(1);
    expect(result).to.be.an('array');
  });

  it('', async () => {
    const teams :Team = new Team({ id: 1, teamName: 'Teste' });
    sinon.stub(Team, 'findByPk').resolves(teams);
    const teamService = new TeamService();

    const result = await teamService.getById(1);

    expect(result).to.be.deep.eq(teams);
    expect(result).to.be.an('object');
  });

  it('', async () => {
    const teams :Team[] = [ new Team({ id: 1, teamName: 'Teste' }) ];
    sinon.stub(Team, 'findAll').resolves(teams);
    const teamService = new TeamService();

    const result = await chai.request(app).get('/teams');

    expect(result).to.be.an('object');
    expect(result.body).to.be.an('array');
    expect(result.body).to.be.deep.eq(teams.map((team) => team.dataValues));
  });

  it('', async () => {
    const teams :Team = new Team({ id: 1, teamName: 'Teste' });
    sinon.stub(Team, 'findByPk').resolves(teams);
    const teamService = new TeamService();

    const result = await chai.request(app).get('/teams/1');

    expect(result).to.be.an('object');
    expect(result.body).to.be.an('object');
    expect(result.body).to.be.deep.eq(teams.dataValues);
  });
});
});