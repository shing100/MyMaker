import { Form, Link, useSearchParams, type MetaFunction } from "react-router"
import type { Route } from "./+types/community-page"
import { Hero } from "~/common/components/hero"
import { Button } from "~/common/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "~/common/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants"
import { Input } from "~/common/components/ui/input"
import { PostCard } from "../components/post-card"
import { getPosts, getTopics } from "../queries"


export const meta: MetaFunction = () => {
    return [
        { title: "커뮤니티 | MyMake" },
        { name: "description", content: "커뮤니티 페이지" },
    ]
}

export const loader = async () => {
    const topics = await getTopics();
    const posts = await getPosts();
    return { topics, posts };
}


export default function CommunityPage({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sorting = searchParams.get("sorting") || "newest";
    const period = searchParams.get("period") || "all-time";
    return (
        <div>
            <Hero title="커뮤니티" subtitle="질문하고 아이디어를 공유하고 토론하세요." />
            <div className="grid grid-cols-6 items-start gap-40">
                <div className="col-span-4 space-y-10">
                    <div className="flex justify-between">
                        <div className="space-y-5 w-full">
                            <div className="flex items-center gap-5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-1">
                                        <span className="text-sm capitalize">{sorting}</span>
                                        <ChevronDownIcon className="size-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {SORT_OPTIONS.map((option) => (
                                            <DropdownMenuCheckboxItem
                                                className="capitalize cursor-pointer"
                                                key={option}
                                                checked={searchParams.get("sort") === option}
                                                onCheckedChange={(checked: boolean) => {
                                                    if (checked) {
                                                        searchParams.set("sorting", option);
                                                        setSearchParams(searchParams);
                                                    }
                                                }}
                                            >
                                                {option}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                {sorting === "popular" && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-1">
                                            <span className="text-sm capitalize">{period}</span>
                                            <ChevronDownIcon className="size-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {PERIOD_OPTIONS.map((option) => (
                                                <DropdownMenuCheckboxItem
                                                    className="capitalize cursor-pointer"
                                                    key={option}
                                                    onCheckedChange={(checked: boolean) => {
                                                        if (checked) {
                                                            searchParams.set("period", option);
                                                            setSearchParams(searchParams);
                                                        }
                                                    }}
                                                >
                                                    {option}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                            <Form className="w-2/3">
                                <Input type="text" placeholder="Search for a discussion" name="search" />
                            </Form>
                        </div>
                        <Button asChild>
                            <Link to="/community/submit">Create a discussion</Link>
                        </Button>
                    </div>
                    <div className="space-y-5">
                        {loaderData.posts.map((post) => (
                            <PostCard
                                key={post.post_id}
                                id={post.post_id}
                                title={post.title}
                                authorName={post.author.name}
                                authorAvatarUrl={post.author?.avatar}
                                category={post.topic.name}
                                createdAt={post.created_at}
                                expanded
                                votesCount={post.upvotes[0].count}
                            />
                        ))}
                    </div>
                </div>
                <aside className="col-span-2 space-y-4 sticky top-20">
                    <span className="text-sm font-bold text-muted-foreground uppercase">Topics</span>
                    <div className="flex flex-col gap-2 items-start">
                        {loaderData.topics.map((topic) => (
                            <Button variant="link" asChild key={topic.slug} className="pl-0">
                                <Link to={`/community?topic=${topic.slug}`}>{topic.name}</Link>
                            </Button>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    )
} 