import type { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "~/supa-client";

export const formSchema = z.object({
    name: z.string().min(1),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["entrepreneur", "investor", "designer", "developer", "other"]),
});

export type SignUpInput = z.infer<typeof formSchema>;

export const signUp = async (
    client: SupabaseClient<Database>,
    data: SignUpInput
) => {
    try {
        // 1. 먼저 사용자 계정 생성
        const { data: authData, error: signUpError } = await client.auth.signUp({
            email: data.email,
            password: data.password,
        });

        if (signUpError) {
            console.error("회원가입 오류:", signUpError);
            return {
                error: `${signUpError.message} (Code: ${signUpError.code || "unknown"})`,
            };
        }

        if (!authData.user) {
            return {
                error: "사용자 계정은 만들어졌지만 유저 정보를 찾을 수 없습니다.",
            };
        }

        // 2. 프로필 정보 직접 삽입
        const { error: profileError } = await client
            .from('profiles')
            .upsert({
                profile_id: authData.user.id,
                username: data.username,
                name: data.name,
                role: data.role
            });

        if (profileError) {
            console.error("프로필 생성 오류:", profileError);
            // 사용자 계정은 생성되었으나 프로필 생성에 실패했을 때 처리
            return {
                error: `프로필 생성 중 오류가 발생했습니다: ${profileError.message}`,
            };
        }

        return { user: authData.user, success: true };
    } catch (error) {
        console.error("예상치 못한 오류:", error);
        return {
            error: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.",
        };
    }
};