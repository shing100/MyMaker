import { Form, redirect, useNavigation, useSearchParams, type MetaFunction } from "react-router";
import type { Route } from "./+types/otp-complete-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";


export const meta: MetaFunction = () => {
    return [
        { title: "OTP 인증 완료" },
        { name: "description", content: "OTP 인증 완료 페이지" },
    ];
};

const formSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { data, success, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return { fieldErrors: error.flatten().fieldErrors };
    }
    const { email, otp } = data;
    const { client, headers } = makeSSRClient(request);

    const { error: verifyError } = await client.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
    });
    if (verifyError) {
        return { verifyError: verifyError.message };
    }
    return redirect("/", { headers });
};


export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigation = useNavigation();
    const isSubmitting =
        navigation.state === "submitting" || navigation.state === "loading";
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center flex-col w-full max-w-md justify-center gap-10">
                <div className="items-center flex flex-col gap-2">
                    <h1 className="text-2xl font-semibold">OTP 인증</h1>
                    <p className="text-sm text-muted-foreground">
                        이메일로 발송된 4자리 숫자 코드를 입력해주세요.
                    </p>
                </div>
                <Form className="w-full space-y-2" method="post">
                    <InputPair
                        label="이메일"
                        name="email"
                        type="email"
                        defaultValue={email || ""}
                        placeholder="이메일을 입력해주세요"
                        description="Enter your email"
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.fieldErrors?.email?.join(", ")}
                        </p>
                    )}
                    <InputPair
                        label="OTP 코드"
                        name="otp"
                        type="text"
                        placeholder="OTP 코드를 입력해주세요"
                        description="Enter your OTP code"
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.fieldErrors?.otp?.join(", ")}
                        </p>
                    )}
                    {actionData && "verifyError" in actionData && (
                        <p className="text-sm text-red-500">{actionData.verifyError}</p>
                    )}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle className="animate-spin" />
                        ) : (
                            "Verify OTP"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
} 