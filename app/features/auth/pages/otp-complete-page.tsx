import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";


export const meta: MetaFunction = () => {
    return [
        { title: "OTP 인증 완료" },
        { name: "description", content: "OTP 인증 완료 페이지" },
    ];
};

export default function OtpCompletePage({ }: Route.ComponentProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <div className="items-center flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">OTP 인증</h1>
                    <p className="text-sm text-muted-foreground">
                        이메일로 발송된 4자리 숫자 코드를 입력해주세요.
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
                    <InputPair
                        label="OTP 코드"
                        name="otp"
                        type="text"
                        placeholder="OTP 코드를 입력해주세요"
                        description="Enter your OTP code"
                        required
                    />
                    <Button type="submit" className="w-full">로그인</Button>
                </Form>
            </div>
        </div>
    );
} 