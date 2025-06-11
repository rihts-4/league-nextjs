export interface League {
  id: string;
  name: string;
  description: string;
  season: string;
  status: string; //'active' | 'inactive' | 'completed'
  startDate: string;
  endDate: string;
  sport: string;
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  leagueId: string;
  coach: string;
  founded: string;
  city: string;
  logo?: string;
  wins: number;
  losses: number;
  draws: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: string;
  age: number;
  jerseyNumber: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
}

export interface Game {
  id: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  date: string;
  time: string;
  venue: string;
  status: string; //'scheduled' | 'live' | 'completed' | 'cancelled'
  week: number;
}