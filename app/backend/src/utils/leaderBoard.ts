import { IMatch } from '../interfaces/IMatch';

const getTeams = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

const getResetTeams = () => {
  getTeams.totalPoints = 0;
  getTeams.totalGames = 0;
  getTeams.totalVictories = 0;
  getTeams.totalDraws = 0;
  getTeams.totalLosses = 0;
  getTeams.goalsFavor = 0;
  getTeams.goalsOwn = 0;
};

const getVictoryHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  getTeams.totalPoints += 3;
  getTeams.totalVictories += 1;
  getTeams.goalsFavor += homeTeamGoals;
  getTeams.goalsOwn += awayTeamGoals;
};

const getVictoryAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  getTeams.totalPoints += 3;
  getTeams.totalVictories += 1;
  getTeams.goalsFavor += awayTeamGoals;
  getTeams.goalsOwn += homeTeamGoals;
};

const getDrawHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  getTeams.totalPoints += 1;
  getTeams.totalDraws += 1;
  getTeams.goalsFavor += homeTeamGoals;
  getTeams.goalsOwn += awayTeamGoals;
};

const getDrawAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  getTeams.totalPoints += 1;
  getTeams.totalDraws += 1;
  getTeams.goalsFavor += awayTeamGoals;
  getTeams.goalsOwn += homeTeamGoals;
};

const getDefeatHome = (homeTeamGoals:number, awayTeamGoals:number) => {
  getTeams.totalPoints += 0;
  getTeams.totalLosses += 1;
  getTeams.goalsFavor += homeTeamGoals;
  getTeams.goalsOwn += awayTeamGoals;
};

const getDefeatAway = (homeTeamGoals:number, awayTeamGoals:number) => {
  getTeams.totalPoints += 0;
  getTeams.totalLosses += 1;
  getTeams.goalsFavor += awayTeamGoals;
  getTeams.goalsOwn += homeTeamGoals;
};

const getPointsHome = ((matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) getVictoryHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) getDrawHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) getDefeatHome(homeTeamGoals, awayTeamGoals);
  });
});

const getPointsAway = ((matches:IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) getVictoryAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) getDrawAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) getDefeatAway(homeTeamGoals, awayTeamGoals);
  });
});

const getTeamsHome = (name:string, matches:IMatch[]) => {
  if (name !== getTeams.name) {
    getResetTeams();
  }
  getTeams.name = name;
  getPointsHome(matches);
  getTeams.totalGames += 1;

  return getTeams;
};

const getTeamsAway = (name:string, matches:IMatch[]) => {
  if (name !== getTeams.name) {
    getResetTeams();
  }
  getTeams.name = name;
  getPointsAway(matches);
  getTeams.totalGames += 1;

  return getTeams;
};

export { getTeamsHome, getTeamsAway };
