import type { MetaFunction } from "react-router";
import type { Route } from "./+types/otp-complete-page";


export const meta: MetaFunction = () => {
    return [
        { title: "OTP 인증 완료" },
        { name: "description", content: "OTP 인증 완료 페이지" },
    ];
};

export default function OtpCompletePage({ }: Route.ComponentProps) {
    return <div>OTP 완료 페이지</div>;
} 