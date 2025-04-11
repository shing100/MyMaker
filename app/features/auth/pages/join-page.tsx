import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { checkUsernameExists } from "../queries";
import { LoaderCircle } from "lucide-react";

export const meta: MetaFunction = () => {
    return [
        { title: "회원가입 | MyMake" },
        { name: "description", content: "회원가입 페이지" },
    ];
};

const formSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
        };
    }
    const usernameExists = await checkUsernameExists(request, {
        username: data.username,
    });
    if (usernameExists) {
        return {
            formErrors: { username: ["Username already exists"] },
        };
    }
    const { client, headers } = makeSSRClient(request);
    const { error: signUpError } = await client.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                name: data.name,
                username: data.username,
            },
        },
    });
    if (signUpError) {
        return {
            signUpError: signUpError.message,
        };
    }
    return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting =
        navigation.state === "submitting" || navigation.state === "loading";
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant={"ghost"} asChild className="absolute top-8 right-8">
                <Link to="/auth/login">Login</Link>
            </Button>
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <h1 className="text-2xl font-semibold">회원가입</h1>
                <Form className="w-full space-y-2" method="post">
                    <InputPair
                        label="닉네임"
                        name="username"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        description="Enter your nickname"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-red-500">{actionData?.formErrors?.username}</p>
                    )}
                    <InputPair
                        label="이름"
                        name="name"
                        type="text"
                        placeholder="이름을 입력해주세요"
                        description="Enter your name"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-red-500">{actionData?.formErrors?.name}</p>
                    )}
                    <InputPair
                        label="이메일"
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        description="Enter your email"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-red-500">{actionData?.formErrors?.email}</p>
                    )}
                    <InputPair
                        label="패스워드"
                        name="password"
                        type="password"
                        placeholder="패스워드를 입력해주세요"
                        description="Enter your password"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-red-500">{actionData?.formErrors?.password}</p>
                    )}
                    {actionData && "formErrors" in actionData && (
                        <p className="text-red-500">{actionData?.formErrors?.password}</p>
                    )}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "회원가입"
                        )}
                    </Button>
                    {actionData && "signUpError" in actionData && (
                        <p className="text-red-500">{actionData.signUpError}</p>
                    )}
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
} 