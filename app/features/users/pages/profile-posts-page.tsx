import type { MetaFunction } from "react-router";
import { PostCard } from "~/features/community/components/post-card";


export const meta: MetaFunction = () => {
    return [
        { title: "게시글 목록 | MyMake" },
        { name: "description", content: "사용자의 게시글 목록" },
    ];
};


export default function ProfilePostsPage() {
    return (
        <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <PostCard
                    key={index}
                    id={index}
                    title="What is the best way to organize my workspace?"
                    authorName="Carrot"
                    authorAvatarUrl="https://github.com/shadcn.png"
                    category="Productivity"
                    createdAt="12 hours ago"
                    votesCount={12}
                />
            ))}
        </div>
    );
} 