import { supabase } from '../lib/supabase';

// League operations
export const leagueService = {
  async getLeagues() {
    const { data, error } = await supabase
      .from('leagues')
      .select('*');
    if (error) { throw error };
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