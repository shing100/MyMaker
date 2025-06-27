import { Card, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

interface NotificationCardProps {
    avatarUrl: string;
    avatarFallback: string;
    userName: string;
    type: "follow" | "review" | "reply";
    timestamp: string;
    seen: boolean;
    productName?: string;
    payloadId?: number;
    postTitle?: string;
}

export function NotificationCard({
    type,
    avatarUrl,
    avatarFallback,
    userName,
    timestamp,
    seen,
    productName,
    postTitle,
    payloadId,
}: NotificationCardProps) {
    const getMessage = (type: "follow" | "review" | "reply") => {
        switch (type) {
            case "follow":
                return " followed you.";
            case "review":
                return " reviewed your product: ";
            case "reply":
                return " replied to your post: ";
        }
    };
    return (
        <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
            <CardHeader className="flex flex-row gap-5 items-start">
                <Avatar>
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg font-bold">
                        <span>{getMessage(type)}</span>
                        {productName && (
                            <Button variant={"ghost"} asChild className="text-lg">
                                <Link to={`/products/${payloadId}`}>{productName}</Link>
                            </Button>
                        )}
                        {postTitle && (
                            <Button variant={"ghost"} asChild className="text-lg">
                                <Link to={`/community/${payloadId}`}>{postTitle}</Link>
                            </Button>
                        )}
                    </CardTitle>
                    <small className="text-muted-foreground text-sm">{timestamp}</small>
                </div>
            </CardHeader>
            <CardFooter className="justify-end">
                <Button variant="outline" size="icon">
                    <EyeIcon className="size-4" />
                </Button>
            </CardFooter>
        </Card>
    );
} 