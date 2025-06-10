import { supabase } from '../lib/supabase';
import type { User, League, Team, Player, Game } from '../types';

// User operations
export const userService = {
  async createUser(user: Omit<User, 'id'>) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getUser(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
};

// League operations
export const leagueService = {
  async createLeague(league: Omit<League, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('leagues')
      .insert([league])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getLeagues() {
    const { data, error } = await supabase
      .from('leagues')
      .select('*');
    if (error) throw error;
    return data;
  }
};

// Team operations
export const teamService = {
  async createTeam(team: Omit<Team, 'id'>) {
    const { data, error } = await supabase
      .from('teams')
      .insert([team])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getTeamsByLeague(leagueId: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('league_id', leagueId);
    if (error) throw error;
    return data;
  },

  async getTeams() {
    const { data, error } = await supabase
      .from('teams')
      .select('*');
    if (error) throw error;
    return data;
  }
};

// Player operations
export const playerService = {
  async createPlayer(player: Omit<Player, 'id'>) {
    const { data, error } = await supabase
      .from('players')
      .insert([player])
      .select()
      .single();
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
  },

  async getPlayers() {
    const { data, error } = await supabase
      .from('players')
      .select('*');
    if (error) throw error;
    return data;
  }
};

// Game operations
export const gameService = {
  async createGame(game: Omit<Game, 'id'>) {
    const { data, error } = await supabase
      .from('games')
      .insert([game])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getGamesByLeague(leagueId: string) {
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .eq('league_id', leagueId);
    if (error) throw error;
    return data;
  },

  async getGames() {
    const { data, error } = await supabase
      .from('games')
      .select('*');
    if (error) throw error;
    return data;
  }
}; 