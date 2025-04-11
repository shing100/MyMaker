import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import type { Route } from "./+types/login-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";


export const meta: MetaFunction = () => {
    return [
        { title: "로그인 | MyMake" },
        { name: "description", content: "로그인 페이지" },
    ];
};


const formSchema = z.object({
    email: z.string({
        required_error: "이메일을 입력해주세요",
        invalid_type_error: "이메일 형식이 아닙니다",
    }).min(1, {
        message: "이메일을 입력해주세요",
    }).email(),
    password: z.string({
        required_error: "패스워드를 입력해주세요",
        invalid_type_error: "패스워드 형식이 아닙니다",
    }).min(1, {
        message: "패스워드는 8자 이상이어야 합니다",
    }),
});


export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
            loginError: null,
        };
    }
    const { email, password } = data;
    const { client, headers } = makeSSRClient(request);
    const { error: loginError } = await client.auth.signInWithPassword({
        email,
        password,
    });
    if (loginError) {
        return {
            formErrors: null,
            loginError: loginError.message,
        }
    }
    return redirect("/", { headers });
};



export default function LoginPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant={"ghost"} asChild className="absolute top-8 right-8">
                <Link to="/auth/join">회원가입</Link>
            </Button>
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <h1 className="text-2xl font-semibold">로그인</h1>
                <Form className="w-full space-y-2" method="post">
                    <InputPair
                        label="이메일"
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        description="Enter your email"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData?.formErrors?.email?.join(",")}
                        </p>
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
                        <p className="text-sm text-red-500">
                            {actionData?.formErrors?.password?.join(",")}
                        </p>
                    )}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "로그인"
                        )}
                    </Button>
                    {actionData && "loginError" in actionData && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {actionData.loginError}
                            </AlertDescription>
                        </Alert>
                    )}
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
} 