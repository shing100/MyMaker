import { Form, Link } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar"
import { Button } from "~/common/components/ui/button"
import { DotIcon, MessageCircleIcon } from "lucide-react"
import { useState } from "react"
import { Textarea } from "~/common/components/ui/textarea"

interface ReplyProps {
    avatarSrc: string
    username: string
    timestamp: string
    content: string
    topLevel: boolean
}

export function Reply({
    avatarSrc,
    username,
    timestamp,
    content,
    topLevel = false
}: ReplyProps) {
    const [replying, setReplying] = useState(false)
    const toggleReplying = () => setReplying((prev) => !prev)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start gap-5 w-2/3">
                <Avatar className="size-14">
                    <AvatarImage src={avatarSrc} />
                    <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex items-center gap-2">
                        <Link to={`/users/@${username}`}>
                            <h4 className="font-medium">{username}</h4>
                        </Link>
                        <DotIcon className="size-5" />
                        <span className="text-xs text-muted-foreground">{timestamp}</span>
                    </div>
                    <p className="text-muted-foreground">{content}</p>
                    <Button variant="ghost" className="self-end" onClick={toggleReplying}>
                        <MessageCircleIcon className="size-4" />Reply
                    </Button>
                </div>
            </div>
            {replying && (
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
            )}
            {topLevel && (
                <div className="pl-20 w-full">
                    <Reply
                        avatarSrc="https://github.com/facebook.png"
                        username="Carrot"
                        timestamp="12 hours ago"
                        content="제가 사용한 프로젝트 관리 툴은 노션이에요. 노션은 좋은 툴이지만 더 좋은 툴이 있을 것 같아요. 예를 들어서 플로우 같은 툴이 있어요. 플로우는 노션보다 더 좋은 툴이라고 생각해요."
                        topLevel={false}
                    />
                </div>
            )}
        </div>
    )
} 