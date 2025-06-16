'use client';

import { useState, useEffect } from "react";
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
        console.log('fetching data.....')
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
                return error;
            }
        };

        fetchData();
        console.log('data fetched.....')
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