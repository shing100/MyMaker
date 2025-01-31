import type { MetaFunction } from "react-router";
import { IdeaCard } from "~/features/ideas/components/idea-card";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 목록 | MyMake" },
        { name: "description", content: "사용자의 아이디어 목록" },
    ];
};


export default function ProfileIdeasPage() {
    return (
        <div className="space-y-5">
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
    );
} 