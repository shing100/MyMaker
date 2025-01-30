import type { MetaFunction } from "react-router";
import type { Route } from "./+types/social-complete-page";

export const meta: MetaFunction = () => {
    return [
        { title: "소셜 로그인 완료" },
        { name: "description", content: "소셜 로그인 완료 페이지" },
    ];
};

export default function SocialCompletePage({ }: Route.ComponentProps) {
    return <div>소셜 로그인 완료 페이지</div>;
} 