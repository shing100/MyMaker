import type { Route } from "./+types/submit-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Product | MyMake" },
        { name: "description", content: "Submit your product to MyMake" }
    ];
};

export default function SubmitPage() {
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
                </div>
            </Form>
        </div>
    );
} 