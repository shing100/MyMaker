import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import { z } from "zod";
import { updateUser, updateUserAvatar } from "../mutations";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";

export const meta: MetaFunction = () => {
    return [
        { title: "Settings | MyMake" },
        { name: "description", content: "Settings page" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const user = await getUserById(client, { id: userId });
    return { user };
};

const formSchema = z.object({
    name: z.string().min(3),
    role: z.string(),
    headline: z.string().optional().default(""),
    bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const avatar = formData.get("avatar");
    if (avatar && avatar instanceof File) {
        if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
            const { data, error } = await client.storage
                .from("avatars")
                .upload(`${userId}/${Date.now()}`, avatar, {
                    contentType: avatar.type,
                    upsert: false,
                });
            if (error) {
                console.log(error);
                return { formErrors: { avatar: ["Failed to upload avatar"] } };
            }
            const {
                data: { publicUrl },
            } = await client.storage.from("avatars").getPublicUrl(data.path);
            await updateUserAvatar(client, {
                id: userId,
                avatarUrl: publicUrl,
            });
        } else {
            return { formErrors: { avatar: ["Invalid file size or type"] } };
        }
    } else {
        const { success, error, data } = formSchema.safeParse(
            Object.fromEntries(formData)
        );
        if (!success) {
            return { formErrors: error.flatten().fieldErrors };
        }
        const { name, role, headline, bio } = data;
        await updateUser(client, {
            id: userId,
            name,
            role: role as "entrepreneur" | "investor" | "designer" | "developer" | "other",
            headline,
            bio,
        });
        return {
            ok: true,
        };
    }
}



export default function SettingsPage({ loaderData, actionData }: Route.ComponentProps) {
    const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar ?? null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setAvatar(URL.createObjectURL(file));
        }
    }
    return (
        <div className="space-y-20">
            <div className="grid grid-cols-6 gap-40">
                <div className="col-span-4 flex flex-col gap-10">
                    {actionData?.ok ? (
                        <Alert>
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Your profile has been updated.
                            </AlertDescription>
                        </Alert>
                    ) : null}
                    <h2 className="text-2xl font-semibold">Edit Profile</h2>
                    <Form className="flex flex-col w-1/2 gap-5" method="post">
                        <InputPair
                            label="Name"
                            name="name"
                            id="name"
                            defaultValue={loaderData.user.name}
                            type="text"
                            placeholder="John Doe"
                            description="Enter your public name"
                            required
                        />
                        {actionData?.formErrors && "name" in actionData.formErrors ? (
                            <Alert>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {actionData.formErrors?.name?.join(", ")}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <SelectPair
                            label="Role"
                            defaultValue={loaderData.user.role}
                            description="What role do you do identify the most with"
                            name="role"
                            placeholder="Select your role"
                            required
                            options={[
                                { label: "Entrepreneur", value: "entrepreneur" },
                                { label: "Investor", value: "investor" },
                                { label: "Designer", value: "designer" },
                                { label: "Developer", value: "developer" },
                                { label: "Other", value: "other" },
                            ]}
                        />
                        {actionData?.formErrors && "role" in actionData.formErrors ? (
                            <Alert>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {actionData.formErrors?.role?.join(", ")}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <InputPair
                            label="Headline"
                            description="An Instruction for your profile."
                            placeholder="I'm a product designer and a startup enthusiast. I'm currently the co-founder and product designer."
                            name="headline"
                            id="headline"
                            type="text"
                            required
                            defaultValue={loaderData.user.headline ?? ""}
                            textArea
                        />
                        {actionData?.formErrors && "headline" in actionData.formErrors ? (
                            <Alert>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {actionData.formErrors?.headline?.join(", ")}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <InputPair
                            label="Bio"
                            name="bio"
                            id="bio"
                            defaultValue={loaderData.user.bio ?? ""}
                            type="text"
                            placeholder="I'm a software engineer at Google"
                            description="Your public bio. it will be displayed on your profile."
                            required
                            textArea
                        />
                        {actionData?.formErrors && "bio" in actionData.formErrors ? (
                            <Alert>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {actionData.formErrors?.bio?.join(", ")}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <Button type="submit" className="w-full">Update Profile</Button>
                    </Form>
                </div>
                <Form className="col-span-2  p-6 rounded-lg border shadow-md" method="post" encType="multipart/form-data">
                    <Label className="flex flex-col gap-1 text-lg">
                        Avatar
                        <small className="text-muted-foreground text-sm">
                            This is the avatar of your profile
                        </small>
                    </Label>
                    <div className="space-y-5">
                        <div className="size-52 rounded-full shadow-xl overflow-hidden">
                            {avatar ?
                                <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                                : null}
                        </div>
                        <Input type="file" className="w-1/2" onChange={onChange} required name="avatar" multiple />
                        {actionData?.formErrors && "avatar" in actionData?.formErrors ? (
                            <Alert>
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {actionData.formErrors?.avatar?.join(", ")}
                                </AlertDescription>
                            </Alert>
                        ) : null}
                        <div className="flex flex-col text-xs">
                            <span className="text-muted-foreground">
                                Recommended size: 128x128
                            </span>
                            <span className="text-muted-foreground">
                                Allowed file types: png, jpg, jpeg
                            </span>
                            <span className="text-muted-foreground">
                                Max file size: 1MB
                            </span>
                        </div>
                        <Button type="submit" className="w-full">Update Avatar</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
} 