import { supabase } from '../lib/supabase';
import { League, Team, Player, Game } from '@/types';

// League operations
export const leagueService = {
  async getLeagues(): Promise<League[]> {
    const { data, error } = await supabase
      .from('leagues')
      .select('*');
    if (error) { throw error };
    return data;
  },
  async getLeague(id: string): Promise<League> {
    const { data: league, error } = await supabase
      .from('leagues')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return league[0];
  },
  async addLeague(league: League): Promise<League[]> {
    const { error } = await supabase
      .from('leagues')
      .insert(league);
    if (error) throw error;
    return this.getLeagues();
  },
  async editLeague(league: League): Promise<League[]> {
    const { error } = await supabase
      .from('leagues')
      .update(league)
      .eq('id', league.id);
    if (error) throw error;
    return this.getLeagues();
  },
  async deleteLeague(id: string): Promise<League[]> {
    const { error } = await supabase
      .from('leagues')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return this.getLeagues();
  }
};

// Team operations
export const teamService = {
  async getTeams(): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*');
    if (error) throw error;
    return data;
  },
  async getTeamByLeague(leagueId: string): Promise<Team[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('league_id', leagueId);
    if (error) throw error;
    return data;
  },
  async getTeam(id: string): Promise<Team> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data[0];
  },
  async addTeam(team: Team): Promise<Team[]> {
    const { error } = await supabase
      .from('teams')
      .insert(team);
    if (error) throw error;
    return this.getTeams();
  },
  async editTeam(team: Team): Promise<Team[]> {
    const { error } = await supabase
      .from('teams')
      .update(team)
      .eq('id', team.id);
    if (error) throw error;
    return this.getTeams();
  },
  async deleteTeam(id: string): Promise<Team[]> {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return this.getTeams();
  }
};

// Player operations
export const playerService = {
  async getPlayers(): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*');
    if (error) throw error;
    return data;
  },
  async getPlayersByTeam(teamId: string): Promise<Player[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId);
    if (error) throw error;
    return data;
  }
};

// Game operations
export const gameService = {
  async getGames(): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*');
    if (error) throw error;
    return data;
  },
  async getGamesByTeam(teamId: string): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('team_id', teamId);
    if (error) throw error;
    return data;
  },
  async getGamesByLeague(leagueId: string): Promise<Game[]> {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('league_id', leagueId);
    if (error) throw error;
    return data;
  },
  async addGame(game: Game): Promise<Game[]> {
    const { error } = await supabase
      .from('games')
      .insert(game);
    if (error) throw error;
    return this.getGames();
  },
  async editGame(game: Game): Promise<Game[]> {
    const { error } = await supabase
      .from('games')
      .update(game)
      .eq('id', game.id);
    if (error) throw error;
    return this.getGames();
  },
  async deleteGame(id: string): Promise<Game[]> {
    const { error } = await supabase
      .from('games')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return this.getGames();
  }
}; 