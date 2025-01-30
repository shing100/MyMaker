import type { MetaFunction } from "react-router";
import type { Route } from "./+types/otp-start-page";

export const meta: MetaFunction = () => {
    return [
        { title: "OTP 인증" },
        { name: "description", content: "OTP 인증 페이지" },
    ];
};

export default function OtpStartPage({ }: Route.ComponentProps) {
    return <div>OTP 시작 페이지</div>;
} 