import type { MetaFunction } from "react-router"
import type { Route } from "./+types/post-page"

export const meta: MetaFunction = () => {
    return [
        { title: "게시물 제목 | MyMake" },
        { name: "description", content: "게시물 내용" },
    ]
}

export function loader({ params }: Route.LoaderArgs) {
    return {
        post: null // TODO: params.postId를 이용해 실제 포스트 데이터 로딩 구현
    }
}

export default function PostPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="container py-8">
        </div>
    )
} 