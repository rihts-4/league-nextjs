import { gameService, leagueService, teamService } from "@/services/supabaseService"
import { Game, League, Team } from "@/types"

export async function addLeague(league: League) {
    const updatedLeagues = await leagueService.addLeague(league)
    return updatedLeagues
}

export async function editLeague(league: League) {
    const updatedLeagues = await leagueService.editLeague(league)
    return updatedLeagues
}

export async function deleteLeague(id: string) {
    const updatedLeagues = await leagueService.deleteLeague(id)
    return updatedLeagues
}

export async function addTeam(team: Team) {
    const updatedTeams = await teamService.addTeam(team)
    return updatedTeams
}

export async function editTeam(team: Team) {
    const updatedTeams = await teamService.editTeam(team)
    return updatedTeams
}

export async function deleteTeam(id: string) {
    const updatedTeams = await teamService.deleteTeam(id)
    return updatedTeams
}

export async function addGame(game: Game) {
    const updatedGames = await gameService.addGame(game)
    return updatedGames
}

export async function editGame(game: Game) {
    const updatedGames = await gameService.editGame(game)
    return updatedGames
}

export async function deleteGame(id: string) {
    const updatedGames = await gameService.deleteGame(id)
    return updatedGames
}