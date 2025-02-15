import { Form, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PRODUCT_STAGE } from "../constants";


export const meta: MetaFunction = () => {
    return [
        { title: "Create Team | Product Hunt" },
        { name: "description", content: "Create your team on Product Hunt" },
    ];
};

export default function CreateTeamPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Create Team"
                subtitle="Create your team on Product Hunt"
            />
            <Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        label="What is the name of your product?"
                        name="productName"
                        placeholder="Enter your product name"
                        description="(20 characters max)"
                        required
                        maxLength={20}
                        type="text"
                    />
                    <SelectPair
                        label="What is the stage of your product?"
                        description="Select the stage of your product"
                        name="stage"
                        placeholder="Select the stage of your product"
                        options={PRODUCT_STAGE}
                        required
                    />
                    <InputPair
                        label="What is the size of your team?"
                        name="teamSize"
                        description="(1-100)"
                        required
                        max={100}
                        min={1}
                        id="teamSize"
                        type="number"
                    />
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
                    <InputPair
                        label="What roles are you looking for?"
                        name="roles"
                        placeholder="React Developer, Backend Developer, Product Manager"
                        description="(comma separated)"
                        required
                        id="roles"
                        type="text"
                    />
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
                </div>
                <Button type="submit" size="lg" className="w-full max-w-sm">Create team</Button>
            </Form>
        </div>
    );
} 