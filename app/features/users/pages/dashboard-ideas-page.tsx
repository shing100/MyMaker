import { IdeaCard } from "~/features/ideas/components/idea-card";
import type { Route } from "./+types/dashboard-ideas-page";
import type { MetaFunction } from "react-router";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드 | MyMake" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};


export default function DashboardIdeasPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-10 h-full">
            <h1 className="text-2xl font-semibold mb-6">아이디어 대시보드</h1>
            <div className="grid grid-cols-4 gap-6">
                {Array.from({ length: 5 }).map((_, index) => (
                    <IdeaCard
                        key={index}
                        id="ideaId"
                        title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progesss using a mobile app to track workouts and progress as well as a website to track progress and see your stats."
                        views={123}
                        likes={123}
                        createdAt="12 hours ago"
                        claimed
                        isOwner
                    />
                ))}
            </div>
        </div>
    );
} 