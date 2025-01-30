import type { MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";


export const meta: MetaFunction = () => {
    return [
        { title: "Teams | Product Hunt" },
        { name: "description", content: "Discover amazing teams on Product Hunt" },
    ];
};

export default function TeamsPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Teams"
                subtitle="Find teams to join or create your own."
            />
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <TeamCard
                        key={i}
                        id="teamId"
                        leaderUsername="carrot"
                        leaderAvatarUrl="https://github.com/shing100.png"
                        positions={["React Developer", "Backend Developer", "Product Manager"]}
                        projectDescription="a new social media platform"
                    />
                ))}
            </div>
        </div>
    );
} 