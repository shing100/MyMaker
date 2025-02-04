import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/messages-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Textarea } from "~/common/components/ui/textarea";
import { Button } from "~/common/components/ui/button";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";

export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};

export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div className="h-full flex flex-col justify-between">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-14">
                        <AvatarImage src="https://github.com/facebook.png" />
                        <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                        <CardTitle>Steve Jobs</CardTitle>
                        <CardDescription>2 days ago</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
                {Array.from({ length: 5 }).map((_, index) => (
                    <MessageBubble
                        key={index}
                        avatarUrl="https://github.com/facebook.png"
                        fallback="S"
                        message="this is a message from steve jobs, make sure to reply to this message if you want to reply to this message"
                        isCurrentUser={index % 2 === 0}
                    />
                ))}
            </div>
            <Card>
                <CardHeader>
                    <Form className="relative flex justify-end items-center">
                        <Textarea placeholder="메시지를 입력하세요" rows={2} className="resize-none" />
                        <Button size="icon" type="submit" className="absolute right-2">
                            <SendIcon className="size-4" />
                        </Button>
                    </Form>
                </CardHeader>
            </Card>
        </div>
    );
} 