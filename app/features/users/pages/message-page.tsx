import type { MetaFunction } from "react-router";
import type { Route } from "./+types/messages-page";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};



export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div>
            <h1>메시지 상세</h1>
        </div>
    );
} 