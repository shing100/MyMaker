import type { Route } from "./+types/dashboard-page";
import type { MetaFunction } from "react-router";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};



export default function DashboardPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div>
            <h1>대시보드</h1>
        </div>
    );
} 