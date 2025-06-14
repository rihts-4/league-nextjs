import { supabase } from '../lib/supabase';

// League operations
export const leagueService = {
  async getLeagues() {
    const { data, error } = await supabase
      .from('leagues')
      .select('*');
    if (error) { throw error };
    return data;
  },
  async getLeague(id: string) {
    const { data, error } = await supabase
      .from('leagues')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data;
  }
};

// Team operations
export const teamService = {
  async getTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*');
    if (error) throw error;
    return data;
  },
  async getTeamByLeague(leagueId: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('league_id', leagueId);
    if (error) throw error;
    return data;
  },
  async getTeam(id: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id);
    if (error) throw error;
    return data;
  }
};

// Player operations
export const playerService = {
  async getPlayers() {
    const { data, error } = await supabase
      .from('players')
      .select('*');
    if (error) throw error;
    return data;
  },
  async getPlayersByTeam(teamId: string) {
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
  async getGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*');
    if (error) throw error;
    return data;
  }
}; 