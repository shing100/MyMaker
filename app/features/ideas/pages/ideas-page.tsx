import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";
import type { Route } from "./+types/ideas-page";
import type { MetaFunction } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
    return [
        { title: "IdeasGPT | MyMake" },
        { name: "description", content: "IdeasGPT is a tool that helps you generate ideas for your business." }
    ];
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const ideas = await getGptIdeas(client, { limit: 20 });
    return { ideas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero title="IdeasGPT" subtitle="IdeasGPT is a tool that helps you generate ideas for your business." />
            <div className="grid grid-cols-4 gap-4">
                {loaderData.ideas.map((idea) => (
                    <IdeaCard
                        key={idea.gpt_idea_id}
                        id={idea.gpt_idea_id}
                        title={idea.idea}
                        viewsCount={idea.views}
                        likesCount={idea.likes}
                        postedAt={idea.created_at}
                        claimed={idea.is_claimed}
                    />
                ))}
            </div>
        </div>
    );
} 