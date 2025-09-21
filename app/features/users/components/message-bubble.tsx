import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
    avatarUrl: string;
    avatarFallback: string;
    content: string;
    isCurrentUser: boolean;
}

export function MessageBubble({ avatarUrl, avatarFallback, content, isCurrentUser }: MessageBubbleProps) {
    return (
        <div className={cn(
            "flex items-center gap-4",
            isCurrentUser ? "flex-row-reverse" : ""
        )}>
            <Avatar>
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className={cn(
                "rounded-md p-4 text-sm max-w-[33%]",
                isCurrentUser ? "bg-accent rounded-br-none" : "bg-primary text-primary-foreground rounded-bl-none"
            )}>
                <p>{content}</p>
            </div>
        </div >
    );
} 