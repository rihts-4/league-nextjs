import { leagueService } from "@/services/supabaseService"
import { League } from "@/types"

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