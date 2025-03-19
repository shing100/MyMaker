import type { MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";
import type { Route } from "./+types/teams-page";


export const meta: MetaFunction = () => {
    return [
        { title: "Teams | Product Hunt" },
        { name: "description", content: "Discover amazing teams on Product Hunt" },
    ];
};

export const loader = async () => {
    const teams = await getTeams({ limit: 12 });
    return { teams };
}

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Teams"
                subtitle="Find teams to join or create your own."
            />
            <div className="grid grid-cols-4 gap-4">
                {loaderData.teams.map((team) => (
                    <TeamCard
                        key={team.team_id}
                        id={team.team_id}
                        leaderUsername={team.team_leader.username}
                        leaderAvatarUrl={team.team_leader.avatar}
                        positions={team.roles.split(",")}
                        projectDescription={team.product_description}
                    />
                ))}
            </div>
        </div>
    );
} 