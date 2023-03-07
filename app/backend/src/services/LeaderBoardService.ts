import Matches from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';
import { ITeam } from '../interfaces/ITeam';
import { getTeamsHome, getTeamsAway, TeamsSorteds } from '../utils/leaderBoard';

export default class LeaderBoardService {
  static async getLeaderBoard() {
    const teams = await Team.findAll();

    const homeTeams = await teams.map(async (team) => {
      const homeMatches = await Matches.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const statisticsHome = await homeMatches.map((match) => (
        getTeamsHome(team.teamName, [match])));

      const statisticsTeams = statisticsHome[homeMatches.length - 1];
      return { ...statisticsTeams };
    });

    const TeamsResults = await Promise.all(homeTeams);
    const sortedTeams = TeamsSorteds(TeamsResults);
    return sortedTeams;
  }

  static async getLeaderBoardAway() {
    const teams = await Team.findAll() as ITeam[];
    const teamsAwayStats = await Promise.all(
      teams.map(async (team) => {
        const awayTeamMatches = await Matches.findAll({
          where: { awayTeamId: team.id, inProgress: false },
        });
        const teamAwayStats = await Promise.all(
          awayTeamMatches.map((match) => getTeamsAway(team.teamName, [match])),
        );
        const teamsAllStats = teamAwayStats[awayTeamMatches.length - 1];
        return { ...teamsAllStats };
      }),
    );
    const resultsSorted = TeamsSorteds(teamsAwayStats);
    return resultsSorted;
  }
}
