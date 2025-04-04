import { Form, Link, type MetaFunction } from "react-router"
import type { Route } from "./+types/post-page"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/common/components/ui/breadcrumb"
import { Button } from "~/common/components/ui/button"
import { ChevronUpIcon, DotIcon } from "lucide-react"
import { Textarea } from "~/common/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar"
import { Badge } from "~/common/components/ui/badge"
import { Reply } from "~/features/community/components/reply"
import { getPostById } from "../queries";
import { DateTime } from "luxon";

export const meta: MetaFunction = () => {
    return [
        { title: "게시물 제목 | MyMake" },
        { name: "description", content: "게시물 내용" },
    ]
}


export const loader = async ({ params }: Route.LoaderArgs) => {
    const post = await getPostById(params.postId);
    return { post };
};


export default function PostPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community">Community</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                                {loaderData.post.topic_name}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community/postId`}>{loaderData.post.title}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-6 gap-20 items-start">
                <div className="col-span-4 space-y-10">
                    <div className="flex w-full items-start gap-10">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>{loaderData.post.upvotes}</span>
                        </Button>
                        <div className="space-y-20">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{loaderData.post.author_name}</span>
                                    <DotIcon className="size-5" />
                                    <span>
                                        {DateTime.fromISO(loaderData.post.created_at).toRelative()}
                                    </span>
                                    <DotIcon className="size-5" />
                                    <span>{loaderData.post.replies} replies</span>
                                </div>
                                <p className="text-muted-foreground w-3/4">
                                    {loaderData.post.content}
                                </p>
                            </div>
                            <Form className="flex items-start gap-5 w-3/4">
                                <Avatar className="size-14">
                                    <AvatarImage src="https://github.com/microsoft.png" />
                                    <AvatarFallback>N</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-5 items-end w-full">
                                    <Textarea className="w-full resize-none" placeholder="댓글을 입력하세요." rows={5} />
                                    <Button>Reply</Button>
                                </div>
                            </Form>
                            <div className="space-y-10">
                                <h4 className="font-semibold">
                                    {loaderData.post.replies} Replies
                                </h4>
                                <div className="flex flex-col gap-5">
                                    <Reply
                                        avatarSrc="https://github.com/facebook.png"
                                        username="Carrot"
                                        timestamp="12 hours ago"
                                        content="제가 사용한 프로젝트 관리 툴은 노션이에요. 노션은 좋은 툴이지만 더 좋은 툴이 있을 것 같아요. 예를 들어서 플로우 같은 툴이 있어요. 플로우는 노션보다 더 좋은 툴이라고 생각해요."
                                        topLevel
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>{loaderData.post.author_name[0]}</AvatarFallback>
                            {loaderData.post.author_avatar ? (
                                <AvatarImage src={loaderData.post.author_avatar} />
                            ) : null}
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <h4 className="text-lg font-medium">
                                {loaderData.post.author_name}
                            </h4>
                            <Badge variant="secondary" className="capitalize">
                                {loaderData.post.author_role}
                            </Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
                        <span>
                            🎂 Joined{" "}
                            {DateTime.fromISO(loaderData.post.author_created_at).toRelative()}{" "}
                            ago
                        </span>
                        <span>🚀 Launched {loaderData.post.products} products</span>
                    </div>
                    <Button variant="outline" className="w-full">Follow</Button>
                </aside>
            </div>
        </div>
    )
} 