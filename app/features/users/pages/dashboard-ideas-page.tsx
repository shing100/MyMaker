import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import type { MetaFunction } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { getClaimedIdeas } from "~/features/ideas/queries";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드 | MyMake" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};


export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const ideas = await getClaimedIdeas(client, { userId });
    return { ideas };
};

export default function DashboardIdeasPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-10 h-full">
            <h1 className="text-2xl font-semibold mb-6">아이디어 대시보드</h1>
            <div className="grid grid-cols-4 gap-6">
                {loaderData.ideas.map((idea) => (
                    <IdeaCard
                        key={idea.gpt_idea_id}
                        id={idea.gpt_idea_id}
                        title={idea.idea}
                        owner={true}
                    />
                ))}
            </div>
        </div>
    );
} 