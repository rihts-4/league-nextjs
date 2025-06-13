export interface League {
  id: string;
  name: string;
  description: string;
  season: string;
  status: string; //'active' | 'inactive' | 'completed'
  start_date: string;
  end_date: string;
  sport: string;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  league_id: string;
  coach: string;
  founded: string;
  city: string;
  logo?: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  goals_for: number;
  goals_against: number;
}

export interface Player {
  id: string;
  name: string;
  team_id: string;
  position: string;
  age: number;
  jersey_number: number;
  goals: number;
  assists: number;
  yellow_cards: number;
  red_cards: number;
}

export interface Game {
  id: string;
  league_id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: number;
  away_score: number;
  date: string;
  time: string;
  venue: string;
  status: string; //'scheduled' | 'live' | 'completed' | 'cancelled'
  week: number;
}