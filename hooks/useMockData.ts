'use client';

import { useState, useEffect } from 'react';
import { League, Team, Player, Game } from '@/types';

export function useMockData() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Initialize mock data
    const mockLeagues: League[] = [
      {
        id: '1',
        name: 'Premier Soccer League',
        description: 'The top-tier professional soccer league',
        season: '2024',
        status: 'active',
        startDate: '2024-03-01',
        endDate: '2024-11-30',
        sport: 'Soccer',
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Basketball Championship',
        description: 'Elite basketball competition',
        season: '2024',
        status: 'active',
        startDate: '2024-02-15',
        endDate: '2024-12-15',
        sport: 'Basketball',
        createdAt: '2024-01-10',
      },
    ];

    const mockTeams: Team[] = [
      {
        id: '1',
        name: 'Thunder Bolts',
        leagueId: '1',
        coach: 'John Smith',
        founded: '2020',
        city: 'New York',
        wins: 8,
        losses: 2,
        draws: 1,
        points: 25,
        goalsFor: 22,
        goalsAgainst: 8,
      },
      {
        id: '2',
        name: 'Fire Eagles',
        leagueId: '1',
        coach: 'Sarah Johnson',
        founded: '2019',
        city: 'Los Angeles',
        wins: 7,
        losses: 3,
        draws: 1,
        points: 22,
        goalsFor: 19,
        goalsAgainst: 12,
      },
      {
        id: '3',
        name: 'Storm Hawks',
        leagueId: '2',
        coach: 'Mike Brown',
        founded: '2021',
        city: 'Chicago',
        wins: 12,
        losses: 3,
        draws: 0,
        points: 36,
        goalsFor: 180,
        goalsAgainst: 125,
      },
    ];

    const mockPlayers: Player[] = [
      {
        id: '1',
        name: 'Alex Rodriguez',
        teamId: '1',
        position: 'Forward',
        age: 25,
        jerseyNumber: 10,
        goals: 12,
        assists: 8,
        yellowCards: 2,
        redCards: 0,
      },
      {
        id: '2',
        name: 'Maria Garcia',
        teamId: '1',
        position: 'Midfielder',
        age: 23,
        jerseyNumber: 8,
        goals: 5,
        assists: 12,
        yellowCards: 1,
        redCards: 0,
      },
      {
        id: '3',
        name: 'David Kim',
        teamId: '2',
        position: 'Defender',
        age: 28,
        jerseyNumber: 4,
        goals: 2,
        assists: 3,
        yellowCards: 4,
        redCards: 1,
      },
    ];

    const mockGames: Game[] = [
      {
        id: '1',
        leagueId: '1',
        homeTeamId: '1',
        awayTeamId: '2',
        homeScore: 2,
        awayScore: 1,
        date: '2024-03-15',
        time: '19:00',
        venue: 'Central Stadium',
        status: 'completed',
        week: 1,
      },
      {
        id: '2',
        leagueId: '1',
        homeTeamId: '2',
        awayTeamId: '1',
        homeScore: 0,
        awayScore: 0,
        date: '2024-03-22',
        time: '20:00',
        venue: 'Sports Complex',
        status: 'scheduled',
        week: 2,
      },
    ];

    setLeagues(mockLeagues);
    setTeams(mockTeams);
    setPlayers(mockPlayers);
    setGames(mockGames);
  }, []);

  return {
    leagues,
    teams,
    players,
    games,
    setLeagues,
    setTeams,
    setPlayers,
    setGames,
  };
}