import { Hero } from "~/common/components/hero";
import type { MetaFunction, Route } from "./+types/ideas-page";
import type { ComponentProps } from "react";
import { IdeaCard } from "../components/idea-card";

export const meta: MetaFunction = () => {
    return [
        { title: "IdeasGPT | MyMake" },
        { name: "description", content: "IdeasGPT is a tool that helps you generate ideas for your business." }
    ];
}



export default function IdeasPage() {
    return (
        <div className="space-y-20">
            <Hero title="IdeasGPT" subtitle="IdeasGPT is a tool that helps you generate ideas for your business." />
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                    <IdeaCard
                        key={index}
                        id="ideaId"
                        title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progesss using a mobile app to track workouts and progress as well as a website to track progress and see your stats."
                        views={123}
                        likes={123}
                        createdAt="12 hours ago"
                        claimed={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
} 