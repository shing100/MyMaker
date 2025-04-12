import { Form, Link, redirect, useNavigation, type MetaFunction } from "react-router";
import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";

export const meta: MetaFunction = () => {
    return [
        { title: "OTP 인증 | MyMake" },
        { name: "description", content: "OTP 인증 페이지" },
    ];
};

const formSchema = z.object({
    email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { data, success } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return { error: "Invalid email address" };
    }
    const { email } = data;

    const { client } = makeSSRClient(request);

    const { error } = await client.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
        },
    });

    if (error) {
        return { error: "Failed to send OTP" };
    }

    return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting =
        navigation.state === "submitting" || navigation.state === "loading";
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <div className="items-center flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">OTP 인증</h1>
                    <p className="text-sm text-muted-foreground">
                        이메일로 4자리 숫자 코드를 발송하려고 합니다. 이메일을 입력해주세요.
                    </p>
                </div>
                <Form className="w-full space-y-2" method="post">
                    <InputPair
                        label="이메일"
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        description="Enter your email"
                        required
                    />
                    {actionData && "error" in actionData && (
                        <p className="text-red-500 text-sm">{actionData.error}</p>
                    )}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "Send OTP"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
} 