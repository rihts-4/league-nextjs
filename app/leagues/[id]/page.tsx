import { leagueService, teamService } from "@/services/supabaseService";
import LeaguePage from "@/components/pages/League";

export async function generateStaticParams() {
    const leagues = await leagueService.getLeagues();
    return leagues.map((league: any) => ({
        id: league.id,
    }));
}

export default async function OneLeaguePage(
    { params }: {
        params: Promise<{ id: string }>
    }
) {
    const { id } = await params;
    const league = await leagueService.getLeague(id);
    const teams = await teamService.getTeamByLeague(id);
    return <LeaguePage league={league} teams={teams} />;
}