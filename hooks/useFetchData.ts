'use client';

import React, { useState, useEffect } from "react";
import { League, Team, Player, Game } from "@/types";
import { 
    gameService, 
    leagueService ,
    playerService,
    teamService
} from "@/services/supabaseService";

export default function useFetchData() {
    const [leagues, setLeagues] = useState<League[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const leagues = await leagueService.getLeagues();
        setLeagues(leagues);
        
        const teams = await teamService.getTeams();
        setTeams(teams);
        
        const players = await playerService.getPlayers();
        setPlayers(players);
        
        const games = await gameService.getGames();
        setGames(games);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    fetchData();
    }, []);
    return {
        leagues,
        teams,
        players,
        games,
        setLeagues,
        setTeams,
        setPlayers,
        setGames
    };
}