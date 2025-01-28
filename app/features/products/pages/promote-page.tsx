import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/promote-page";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import type { DateRange } from "react-day-picker";
import { useState } from "react";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Promote Product | MyMake" },
        { name: "description", content: "Promote your product on MyMake" }
    ];
};

export default function PromotePage() {
    const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();
    const totalDays = promotionPeriod?.from && promotionPeriod?.to ?
        DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), "days").days
        : 0;
    return (
        <div>
            <Hero title="Promote Your Product" subtitle="Boost your product's visibility" />
            <Form className="flex flex-col gap-4 max-w-screen-md mx-auto items-center">
                <SelectPair
                    label="Select a product"
                    description="Select the product you want to promote"
                    options={[
                        { label: "Product 1", value: "product-1" },
                        { label: "Product 2", value: "product-2" },
                        { label: "Product 3", value: "product-3" },
                    ]}
                    name="product"
                    required
                    placeholder="Select a product"
                />
                <div className="flex flex-col gap-2 items-center w-full">
                    <Label className="flex flex-col gap-1">
                        Select a range of dates for promotion
                        <small className="text-center text-muted-foreground">
                            Minimum duration is 3 days
                        </small>
                    </Label>
                    <Calendar
                        mode="range"
                        selected={promotionPeriod}
                        onSelect={setPromotionPeriod}
                        min={3}
                        disabled={{ before: new Date() }}
                    />
                </div>
                <Button disabled={totalDays === 0}>Go to checkout (${totalDays * 10})</Button>
            </Form>
        </div>
    );
} 