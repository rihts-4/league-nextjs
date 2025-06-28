import { UUID } from "crypto";

export interface League {
    leagueId: UUID;
    name: string;
    // logoUrl: string;
    status: boolean;
}

export interface Team {
    teamId: UUID;
    leagueId: UUID;
    // logoUrl: string;
    name: string;
    shortName: string;
    coach: string;
}

export interface Player {
    playerId: UUID;
    teamId: UUID;
    name: string;
    position: string;
    // picUrl: string;
    dateOfBirth: Date;
    jerseyNumber: number;
}

export interface Standings {
    standingId: UUID;
    teamId: UUID;
    position: number;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    gamesPlayed: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}

export interface Game {
    gameId: UUID;
    leagueId: UUID;
    homeTeamId: UUID;
    awayTeamId: UUID;
    date: string;
    status: string;
    matchday: number;
}

export interface Scores {
    scoreId: UUID;
    gameId: UUID;
    homeTeamScore: number;
    awayTeamScore: number;
}

export interface StartingLineup {
    lineupId: UUID;
    gameId: UUID;
    teamId: UUID;
    players: Player[];
}

export interface GameIndStats {
    statsId: UUID;
    gameId: UUID;
    playerId: UUID;
    teamId: UUID;
    minutesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    shotsOnTarget: number;
    shotsOffTarget: number;
}