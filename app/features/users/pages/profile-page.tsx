import { useOutletContext, type MetaFunction } from "react-router";
import client from "~/supa-client";
import type { Route } from "./+types/profile-page";

interface Profile {
    profile_id: string;
}

export const meta: MetaFunction = () => {
    return [
        { title: "프로필 | MyMake" },
        { name: "description", content: "사용자 프로필" },
    ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
    // 사용자 ID 조회
    const { data: userData, error } = await client
        .from("profiles")
        .select("profile_id")
        .eq("username", params.username)
        .single<Profile>();

    if (error) {
        console.error("사용자 조회 중 오류 발생:", error);
        return null;
    }

    await client.rpc("track_event", {
        event_type: "profile_view",
        event_data: {
            user_id: userData.profile_id,
            username: params.username, // 참조용으로 username도 함께 저장
        },
    });
    return null;
};


export default function ProfilePage() {
    const { headline, bio } = useOutletContext<{
        headline: string;
        bio: string;
    }>();
    return (
        <div className="max-w-screen-md flex flex-col space-y-10">
            <div className="space-y-2">
                <h4 className="text-lg font-bold">headline</h4>
                <p className="text-muted-foreground">{headline}</p>
            </div>
            <div>
                <h4 className="text-lg font-bold">About</h4>
                <p className="text-muted-foreground">{bio}</p>
            </div>
        </div>
    );
}