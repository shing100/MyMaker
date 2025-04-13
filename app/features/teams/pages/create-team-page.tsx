import { Form, redirect, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGE } from "../constants";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import type { Route } from "./+types/create-team-page";
import { z } from "zod";
import { createTeam } from "../mutations";


export const meta: MetaFunction = () => {
    return [
        { title: "Create Team | Product Hunt" },
        { name: "description", content: "Create your team on Product Hunt" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
}

export const formSchema = z.object({
    name: z.string().min(1).max(20),
    stage: z.string(),
    size: z.coerce.number().min(1).max(100),
    equity: z.coerce.number().min(1).max(100),
    roles: z.string(),
    description: z.string().min(1).max(200),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return { fieldErrors: error.flatten().fieldErrors };
    }
    const { team_id } = await createTeam(client, userId, {
        ...data,
    });
    return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Create Team"
                subtitle="Create your team on Product Hunt"
            />
            <Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center" method="post">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        label="What is the name of your product?"
                        name="name"
                        placeholder="Enter your product name"
                        description="(20 characters max)"
                        required
                        maxLength={20}
                        type="text"
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.name}</p>
                    )}
                    <SelectPair
                        label="What is the stage of your product?"
                        description="Select the stage of your product"
                        name="stage"
                        placeholder="Select the stage of your product"
                        options={PRODUCT_STAGE}
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.stage}</p>
                    )}
                    <InputPair
                        label="What is the size of your team?"
                        name="size"
                        description="(1-100)"
                        required
                        max={100}
                        min={1}
                        id="teamSize"
                        type="number"
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.size}</p>
                    )}
                    <InputPair
                        label="How much equity are you willing to give?"
                        name="equity"
                        description="(each)"
                        required
                        max={100}
                        min={1}
                        id="equity"
                        type="number"
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.equity}</p>
                    )}
                    <InputPair
                        label="What roles are you looking for?"
                        name="roles"
                        placeholder="React Developer, Backend Developer, Product Manager"
                        description="(comma separated)"
                        required
                        id="roles"
                        type="text"
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.roles}</p>
                    )}
                    <InputPair
                        label="What is the description of your product?"
                        name="description"
                        placeholder="Enter the description of your product"
                        description="(200 characters max)"
                        required
                        maxLength={200}
                        id="description"
                        type="text"
                        textArea
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.description}</p>
                    )}
                </div>
                <Button type="submit" size="lg" className="w-full max-w-sm">Create team</Button>
            </Form>
        </div>
    );
} 