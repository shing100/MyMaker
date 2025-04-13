import { Form, Link, type MetaFunction } from "react-router"
import type { Route } from "./+types/post-page"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/common/components/ui/breadcrumb"
import { Button } from "~/common/components/ui/button"
import { ChevronUpIcon, DotIcon } from "lucide-react"
import { Textarea } from "~/common/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar"
import { Badge } from "~/common/components/ui/badge"
import { Reply } from "~/features/community/components/reply"
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ data }) => {
    return [{ title: `${data.post.title} on ${data.post.topic_name} | MyMake` }];
}


export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const post = await getPostById(client, params.postId);
    const replies = await getReplies(client, params.postId);
    return { post, replies };
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
                        <div className="space-y-20 w-full">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{loaderData.post.author_name}</span>
                                    <DotIcon className="size-5" />
                                    <span>
                                        {DateTime.fromISO(loaderData.post.created_at, {
                                            zone: "utc",
                                        }).toRelative({ unit: "hours" })}
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
                                    {loaderData.replies.map((reply) => (
                                        <Reply
                                            username={reply.user?.name ?? 'Unknown User'}
                                            avatarUrl={reply.user?.avatar ?? null}
                                            content={reply.reply}
                                            timestamp={reply.created_at}
                                            topLevel={true}
                                            replies={Array.isArray(reply.post_replies) ? reply.post_replies : []}
                                        />
                                    ))}
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
                            {DateTime.fromISO(loaderData.post.author_created_at, {
                                zone: "utc",
                            }).toRelative({ unit: "hours" })}{" "}
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