import type { MetaFunction } from "react-router";
import type { Route } from "./+types/messages-page";
import { MessageCircleIcon } from "lucide-react";


export const meta: MetaFunction = () => {
    return [
        { title: "메시지" },
        { name: "description", content: "메시지" },
    ];
};



export default function MessagesPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div className="h-full flex flex-col items-center justify-center gap-4">
            <MessageCircleIcon className="size-12 text-muted-foreground" />
            <h1 className="text-2xl text-muted-foreground font-semibold">사이드바에서 메시지를 클릭하세요</h1>
        </div>
    );
} 