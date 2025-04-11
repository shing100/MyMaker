import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries";

export async function loader({ request }: Route.LoaderArgs) {
    const { client } = makeSSRClient(request);
    const {
        data: { user },
    } = await client.auth.getUser();
    if (user) {
        const profile = await getUserById(client, { id: user.id });
        const encodedUsername = encodeURIComponent(profile.username);
        return redirect(`/users/${encodedUsername}`);
    }
    return redirect("/auth/login");
}