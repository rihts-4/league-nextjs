import { supabase } from '../lib/supabase';
import { League } from '@/types';

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