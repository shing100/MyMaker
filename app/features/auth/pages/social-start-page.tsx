import type { MetaFunction } from "react-router";
import type { Route } from "./+types/social-start-page";

export const meta: MetaFunction = () => {
    return [
        { title: "소셜 로그인" },
        { name: "description", content: "소셜 로그인 시작 페이지" },
    ];
};

export default function SocialStartPage({ }: Route.ComponentProps) {
    return <div>소셜 로그인 시작 페이지</div>;
} 