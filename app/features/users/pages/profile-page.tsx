import type { MetaFunction } from "react-router";
import type { Route } from "./+types/profile-page";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 대시보드" },
        { name: "description", content: "아이디어 대시보드" },
    ];
};



export default function ProfilePage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div>
            <h1>사용자 프로필</h1>
        </div>
    );
}