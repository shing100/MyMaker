import { Link, useFetcher } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
    id: number;
    title: string;
    authorName: string;
    authorAvatarUrl?: string | null;
    category: string;
    createdAt: string;
    expanded?: boolean;
    votesCount: number;
    isUpvoted?: boolean;
}

export function PostCard({
    id,
    title,
    authorName,
    authorAvatarUrl,
    category,
    createdAt,
    votesCount = 0,
    expanded = false,
    isUpvoted = false
}: PostCardProps) {
    const fetcher = useFetcher();
    const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetcher.submit(
            {
                postId: id,
            },
            {
                method: "POST",
                action: `/community/${id}/upvote`,
            }
        );
    };

    return (
        <Link to={`/community/${id}`} className="block">
            <Card className={cn("bg-transparent hover:bg-card/50 transition-colors",
                expanded ? "flex flex-row items-center justify-between" : "")}>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-14">
                        <AvatarFallback>{authorName[0]}</AvatarFallback>
                        {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
                    </Avatar>
                    <div className="space-y-2">
                        <CardTitle>{title}</CardTitle>
                        <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
                            <span>{authorName} on</span>
                            <span>{category}</span>
                            <DotIcon className="w-4 h-4" />
                            <span>{DateTime.fromISO(createdAt).toRelative()}</span>
                        </div>
                    </div>
                </CardHeader>
                {!expanded && (
                    <CardFooter className="flex justify-end pt-0 pb-2">
                        <Button variant="link">
                            Read more &rarr;
                        </Button>
                    </CardFooter>
                )}
                {expanded && (
                    <CardFooter className="flex justify-end pt-0 pb-0">
                        <Button
                            onClick={absorbClick}
                            variant="outline"
                            className={cn(
                                "flex flex-col h-14",
                                isUpvoted ? "border-primary text-primary" : ""
                            )}
                        >
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>{votesCount}</span>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
} 