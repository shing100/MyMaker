import { Form, Link, useActionData, useOutletContext } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar"
import { Button } from "~/common/components/ui/button"
import { DotIcon, MessageCircleIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Textarea } from "~/common/components/ui/textarea"
import { DateTime } from "luxon";
import type { action } from "../pages/post-page"

interface ReplyProps {
    name: string;
    username: string;
    avatarUrl: string | null
    content: string;
    timestamp: string;
    topLevel: boolean;
    topLevelId: number;
    replies?: {
        post_reply_id: number;
        reply: string;
        created_at: string;
        user: {
            name: string;
            avatar: string | null;
            username: string;
        };
    }[];
}

export function Reply({
    name,
    avatarUrl,
    username,
    timestamp,
    content,
    topLevel = false,
    topLevelId,
    replies
}: ReplyProps) {
    const actionData = useActionData<typeof action>();
    const [replying, setReplying] = useState(false)
    const toggleReplying = () => setReplying((prev) => !prev)

    const {
        isLoggedIn,
        name: loggedInName,
        avatar,
    } = useOutletContext<{
        isLoggedIn: boolean;
        name: string;
        avatar: string;
    }>();
    useEffect(() => {
        if (actionData?.ok) {
            setReplying(false);
        }
    }, [actionData]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-start gap-5 w-2/3">
                <Avatar className="size-14">
                    {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex items-center gap-2">
                        <Link to={`/users/@${username}`}>
                            <h4 className="font-medium">{name}</h4>
                        </Link>
                        <DotIcon className="size-5" />
                        <span className="text-xs text-muted-foreground">
                            {DateTime.fromISO(timestamp).toRelative()}
                        </span>
                    </div>
                    <p className="text-muted-foreground">{content}</p>
                    {isLoggedIn ? (
                        <Button
                            variant="ghost"
                            className="self-end"
                            onClick={toggleReplying}
                        >
                            <MessageCircleIcon className="size-4" />
                            Reply
                        </Button>
                    ) : null}
                </div>
            </div>
            {replying && (
                <Form className="flex items-start gap-5 w-3/4" method="post">
                    <input type="hidden" name="topLevelId" value={topLevelId} />
                    <Avatar className="size-14">
                        <AvatarFallback>{loggedInName[0]}</AvatarFallback>
                        <AvatarImage src={avatar} />
                    </Avatar>
                    <div className="flex flex-col gap-5 items-end w-full">
                        <Textarea autoFocus name="reply" className="w-full resize-none" placeholder="댓글을 입력하세요." rows={5} defaultValue={`@${username} `} />
                        <Button>Reply</Button>
                    </div>
                </Form>
            )}
            {topLevel && replies && (
                <div className="pl-20 w-full">
                    {replies.map((reply) => (
                        <Reply
                            name={reply.user.name}
                            username={reply.user.name}
                            avatarUrl={reply.user.avatar}
                            content={reply.reply}
                            timestamp={reply.created_at}
                            topLevel={false}
                            topLevelId={topLevelId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
} 