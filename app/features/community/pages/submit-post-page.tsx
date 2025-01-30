import type { MetaFunction } from "react-router"
import type { Route } from "./+types/submit-post-page"

export const meta: MetaFunction = () => {
    return [
        { title: "게시물 작성 | MyMake" },
        { name: "description", content: "새로운 커뮤니티 게시물을 작성합니다." },
    ]
}


export default function SubmitPostPage({ actionData }: Route.ComponentProps) {
    return (
        <div className="container py-8">

        </div>
    )
} 