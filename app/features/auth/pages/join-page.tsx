import { Form, Link, type MetaFunction } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export const meta: MetaFunction = () => {
    return [
        { title: "회원가입 | MyMake" },
        { name: "description", content: "회원가입 페이지" },
    ];
};

export default function JoinPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant={"ghost"} asChild className="absolute top-8 right-8">
                <Link to="/auth/login">Login</Link>
            </Button>
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <h1 className="text-2xl font-semibold">회원가입</h1>
                <Form className="w-full space-y-2">
                    <InputPair
                        label="닉네임"
                        name="username"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        description="Enter your nickname"
                        required
                    />
                    <InputPair
                        label="이름"
                        name="name"
                        type="text"
                        placeholder="이름을 입력해주세요"
                        description="Enter your name"
                        required
                    />
                    <InputPair
                        label="이메일"
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        description="Enter your email"
                        required
                    />
                    <InputPair
                        label="패스워드"
                        name="password"
                        type="password"
                        placeholder="패스워드를 입력해주세요"
                        description="Enter your password"
                        required
                    />
                    <Button type="submit" className="w-full">회원가입</Button>
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
} 