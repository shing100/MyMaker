import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-product-page";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Product | MyMake" },
        { name: "description", content: "Submit your product to MyMake" }
    ];
};

export default function SubmitPage() {
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
            <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
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
                    <InputPair
                        label="Tagline"
                        description="this is the tagline of your product"
                        name="tagline"
                        id="tagline"
                        type="text"
                        required
                        placeholder="A concise description of your product"
                    />
                    <InputPair
                        label="URL"
                        description="this is the url of your product"
                        name="url"
                        id="url"
                        type="text"
                        required
                        placeholder="https://www.example.com"
                    />
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
                    <SelectPair
                        label="Category"
                        description="this is the category of your product"
                        name="category"
                        required
                        placeholder="Select a category"
                        options={[
                            { label: "AI", value: "ai" },
                            { label: "Developer", value: "developer" },
                            { label: "Marketer", value: "marketer" },
                        ]}
                    />
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