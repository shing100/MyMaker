import type { MetaFunction } from "react-router";
import type { Route } from "./+types/notifications-page";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};



export default function NotificationsPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div>
            <h1>알림</h1>
        </div>
    );
} 