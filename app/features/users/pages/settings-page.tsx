import { Form, type MetaFunction } from "react-router";
import type { Route } from "./+types/settings-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";


export const meta: MetaFunction = () => {
    return [
        { title: "Settings | MyMake" },
        { name: "description", content: "Settings page" },
    ];
};


export default function SettingsPage({ loaderData, actionData }: Route.ComponentProps) {
    const [avatar, setAvatar] = useState<string | null>(null);
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
                    <h2 className="text-2xl font-semibold">Edit Profile</h2>
                    <Form className="flex flex-col w-1/2 gap-5">
                        <InputPair
                            label="Name"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            description="Enter your public name"
                            required
                        />
                        <SelectPair
                            label="Role"
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
                        <InputPair
                            label="Headline"
                            description="An Instruction for your profile."
                            placeholder="I'm a product designer and a startup enthusiast. I'm currently the co-founder and product designer."
                            name="headline"
                            id="headline"
                            type="text"
                            required
                            textArea
                        />
                        <InputPair
                            label="Bio"
                            name="bio"
                            id="bio"
                            type="text"
                            placeholder="I'm a software engineer at Google"
                            description="Your public bio. it will be displayed on your profile."
                            required
                            textArea
                        />
                        <Button type="submit" className="w-full">Update Profile</Button>
                    </Form>
                </div>
                <aside className="col-span-2  p-6 rounded-lg border shadow-md">
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
                </aside>
            </div>
        </div>
    );
} 