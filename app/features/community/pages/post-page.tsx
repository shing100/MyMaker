import { Form, Link, type MetaFunction } from "react-router"
import type { Route } from "./+types/post-page"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/common/components/ui/breadcrumb"
import { Button } from "~/common/components/ui/button"
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react"
import InputPair from "~/common/components/input-pair"
import { Textarea } from "~/common/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar"
import { Badge } from "~/common/components/ui/badge"
import { Reply } from "~/features/community/components/reply"

export const meta: MetaFunction = () => {
    return [
        { title: "게시물 제목 | MyMake" },
        { name: "description", content: "게시물 내용" },
    ]
}

export default function PostPage() {
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
                            <Link to="/community?topic=category">Category</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community/postId">게시물 제목</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-6 gap-20 items-start">
                <div className="col-span-4 space-y-10">
                    <div className="flex w-full items-start gap-10">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>10</span>
                        </Button>
                        <div className="space-y-20">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">게시물 제목</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>@Carrot</span>
                                    <DotIcon className="size-5" />
                                    <span>12 hours ago</span>
                                    <DotIcon className="size-5" />
                                    <span>10 replies</span>
                                </div>
                                <p className="text-muted-foreground w-3/4">
                                    안녕하세요 저는 생산성을 높힐 수 있는 툴을 찾고 있어요. 누군가 추천해주신 툴이 있나요?
                                    프로젝트를 관리하는 툴이 있나요?
                                    노션을 사용하고 있는데 더 좋은 툴이 있나요?
                                    또다른 툴을 찾고 있어요. 도움이 주셨으면 좋겠어요. 감사합니다.
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
                                <h4 className="font-semibold">10 Replies</h4>
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
                            <AvatarImage src="https://github.com/apple.png" />
                            <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-bold">Carrot</h4>
                            <Badge variant="outline">Entrepreneur</Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
                        <span>🍰 Joined 3 months ago</span>
                        <span>🚀 Launched 10 products</span>
                    </div>
                    <Button variant="outline" className="w-full">Follow</Button>
                </aside>
            </div>
        </div>
    )
} 