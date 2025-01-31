import type { Route } from "./+types/dashboard-ideas-page";
import type { MetaFunction } from "react-router";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};


export default function DashboardIdeasPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div>
            <h1>아이디어 대시보드</h1>
        </div>
    );
} 