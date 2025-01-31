import type { MetaFunction } from "react-router";
import type { Route } from "./+types/notifications-page";
import { NotificationCard } from "../components/notification-card";


export const meta: MetaFunction = () => {
    return [
        { title: "Notifications | MyMake" },
        { name: "description", content: "Notifications" },
    ];
};


export default function NotificationsPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <h1 className="text-4xl font-bold">Notifications</h1>
            <div className="flex flex-col items-start gap-5">
                <NotificationCard
                    avatarUrl="https://github.com/stevejobs.png"
                    avatarFallback="S"
                    username="Steve Jobs"
                    message=" followed you."
                    timestamp="2 days ago"
                    seen={false}
                />
            </div>
        </div>
    );
} 