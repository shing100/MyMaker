import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
    id: number;
    title: string;
    views: number;
    likes: number;
    createdAt: string;
    claimed?: boolean;
    isOwner?: boolean;
}

export function IdeaCard({ id, title, views, likes, createdAt, claimed, isOwner }: IdeaCardProps) {
    return (
        <Card className="bg-transparent hover:bg-card/50 transition-colors">
            <CardHeader>
                <Link to={`/ideas/${id}`}>
                    <CardTitle className="text-xl">
                        <span className={cn(
                            claimed && !isOwner
                                ? "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground"
                                : " "
                        )}>
                            {title}
                        </span>
                    </CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="flex items-center text-sm">
                <div className="flex items-center gap-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{views}</span>
                </div>
                <DotIcon className="w-4 h-4" />
                <span>{DateTime.fromISO(createdAt).toRelative()}</span>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">
                    <HeartIcon className="w-4 h-4" />
                    <span>{likes}</span>
                </Button>
                {!claimed ? (
                    <Button asChild>
                        <Link to={`/ideas/${id}/claim`}>
                            Claim idea now &rarr;
                        </Link>
                    </Button>
                ) : isOwner ? (
                    <Button variant="outline" disabled>
                        <LockIcon className="size-4" />
                        Your Private Idea
                    </Button>
                ) : (
                    <Button variant="outline" disabled className="cursor-not-allowed">
                        <LockIcon className="size-4" />
                        Claimed
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
} 