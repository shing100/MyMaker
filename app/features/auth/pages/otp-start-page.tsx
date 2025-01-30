import { Form, Link, type MetaFunction } from "react-router";
import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export const meta: MetaFunction = () => {
    return [
        { title: "OTP 인증 | MyMake" },
        { name: "description", content: "OTP 인증 페이지" },
    ];
};

export default function OtpStartPage({ }: Route.ComponentProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <div className="items-center flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">OTP 인증</h1>
                    <p className="text-sm text-muted-foreground">
                        이메일로 4자리 숫자 코드를 발송하려고 합니다. 이메일을 입력해주세요.
                    </p>
                </div>
                <Form className="w-full space-y-2">
                    <InputPair
                        label="이메일"
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        description="Enter your email"
                        required
                    />
                    <Button type="submit" className="w-full">OTP 발송</Button>
                </Form>
            </div>
        </div>
    );
} 