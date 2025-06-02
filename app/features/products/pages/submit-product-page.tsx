import { Hero } from "~/common/components/hero";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-product-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createProduct } from "../mutations";
import { getCategories } from "../queries";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Product | MyMake" },
        { name: "description", content: "Submit your product to MyMake" }
    ];
};

const formSchema = z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    url: z.string().url(),
    description: z.string().min(1),
    howItWorks: z.string().min(1),
    category: z.coerce.number(),
    icon: z.instanceof(File).refine((file) => file.size <= 2097152 && file.type.startsWith("image/"), {
        message: "Icon must be a PNG, JPEG, or JPG image and less than 2MB",
    }),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return { formErrors: error.flatten().fieldErrors };
    }
    const { icon, ...rest } = data;
    const { data: uploadData, error: uploadError } = await client.storage.from("icons").upload(`${userId}/${Date.now()}`, icon, {
        contentType: icon.type,
        upsert: false,
    })
    if (uploadError) {
        return { formErrors: { icon: ["Failed to upload icon"] } };
    }
    const { data: { publicUrl } } = await client.storage.from("icons").getPublicUrl(uploadData.path);
    const productId = await createProduct(client, {
        name: rest.name,
        tagline: rest.tagline,
        description: rest.description,
        howItWorks: rest.howItWorks,
        url: rest.url,
        iconUrl: publicUrl,
        categoryId: rest.category,
        userId,
    });
    return redirect(`/products/${productId}`);
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const categories = await getCategories(client);
    return { categories };
}

export default function SubmitPage({ loaderData, actionData }: Route.ComponentProps) {
    const [icon, setIcon] = useState<string | null>(null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setIcon(URL.createObjectURL(file));
        }
    }
    return (
        <div>
            <Hero title="Submit Your Product" subtitle="Submit your product with the world" />
            <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto" method="post" encType="multipart/form-data">
                <div className="space-y-5">
                    <InputPair
                        label="Name"
                        description="this is the name of your product"
                        name="name"
                        id="name"
                        type="text"
                        required
                        placeholder="Product Name"
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.name && (
                            <p className="text-red-500">{actionData.formErrors.name}</p>
                        )}
                    <InputPair
                        label="Tagline"
                        description="this is the tagline of your product"
                        name="tagline"
                        id="tagline"
                        type="text"
                        required
                        placeholder="A concise description of your product"
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.tagline && (
                            <p className="text-red-500">{actionData.formErrors.tagline}</p>
                        )}
                    <InputPair
                        label="URL"
                        description="this is the url of your product"
                        name="url"
                        id="url"
                        type="text"
                        required
                        placeholder="https://www.example.com"
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.url && (
                            <p className="text-red-500">{actionData.formErrors.url}</p>
                        )}
                    <InputPair
                        textArea
                        label="Description"
                        description="this is the description of your product"
                        name="description"
                        id="description"
                        type="text"
                        required
                        placeholder="A detailed description of your product"
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.description && (
                            <p className="text-red-500">
                                {actionData.formErrors.description}
                            </p>
                        )}
                    <InputPair
                        textArea
                        label="How it works"
                        description="A detailed description of how your product howItWorks"
                        id="howItWorks"
                        name="howItWorks"
                        required
                        type="text"
                        placeholder="A detailed description of how your product works"
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.howItWorks && (
                            <p className="text-red-500">{actionData.formErrors.howItWorks}</p>
                        )}
                    <SelectPair
                        label="Category"
                        description="this is the category of your product"
                        name="category"
                        required
                        placeholder="Select a category"
                        options={loaderData.categories.map((category) => ({
                            value: category.category_id.toString(),
                            label: category.name,
                        }))}
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.category && (
                            <p className="text-red-500">{actionData.formErrors.category}</p>
                        )}
                    <Button type="submit" className="w-full" size="lg">
                        Submit
                    </Button>
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="size-40 rounded-xl shadow-xl overflow-hidden">
                        {icon ?
                            <img src={icon} alt="icon" className="w-full h-full object-cover" />
                            : null}
                    </div>
                    <Label className="flex flex-col gap-1 text-lg">
                        Logo
                        <small className="text-muted-foreground text-sm">
                            This is the logo of your product
                        </small>
                    </Label>
                    <Input type="file" className="w-1/2" onChange={onChange} required name="icon" multiple />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.icon && (
                            <p className="text-red-500">{actionData.formErrors.icon}</p>
                        )}
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
                </div>
            </Form>
        </div>
    );
} 