import { Link } from "react-router";
import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";

interface PostCardProps {
    id: string;
    title: string;
    authorName: string;
    authorAvatarUrl?: string;
    category: string;
    createdAt: string;
}

export function PostCard({ id, title, authorName, authorAvatarUrl, category, createdAt }: PostCardProps) {
    return (
        <Link to={`/community/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-colors">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-14">
                        <AvatarFallback>{authorName[0]}</AvatarFallback>
                        {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
                    </Avatar>
                    <div className="space-y-0">
                        <CardTitle>{title}</CardTitle>
                        <div className="flex gap-2 text-sm leading-tight text-muted-foreground">
                            <span>{authorName} on</span>
                            <span>{category}</span>
                            <span>•</span>
                            <span>{createdAt}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="flex justify-end pt-0 pb-2">
                    <Button variant="link" asChild>
                        <Link to={`/community/${id}`}>
                            Read more &rarr;
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 