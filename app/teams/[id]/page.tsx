import { playerService, teamService } from "@/services/supabaseService";
import TeamPage from "@/components/pages/Team";

export async function generateStaticParams() {
    const teams = await teamService.getTeams();
    return teams.map((team: any) => ({
        id: team.id,
    }));
}

export default async function OneLeaguePage(
    { params }: {
        params: Promise<{ id: string }>
    }
) {
    const { id } = await params;
    const team = await teamService.getTeam(id);
    const players = await playerService.getPlayersByTeam(id);
    return <TeamPage team={team} players={players} />;
}