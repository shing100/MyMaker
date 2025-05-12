
import type { MetaFunction } from "react-router";
import type { Route } from "./+types/dashboard-product-page";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "~/common/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "../queries";
import { redirect } from "react-router";


export const meta: MetaFunction = () => {
    return [
        { title: "Product Analytics | MyMake" },
        { name: "description", content: "Product Analytics" },
    ];
};


export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client } = await makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const { error } = await client
        .from("products")
        .select("product_id")
        .eq("profile_id", userId)
        .eq("product_id", params.productId)
        .single();
    if (error) {
        throw redirect("/my/dashboard/products");
    }
    const { data, error: rcpError } = await client.rpc("get_product_stats", {
        product_id: params.productId,
    });
    if (rcpError) {
        throw error;
    }
    return {
        chartData: data,
    };
};


const chartConfig = {
    views: {
        label: "Page Views",
        color: "hsl(var(--chart-1))",
    },
    visitors: {
        label: "Visitors",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


export default function DashboardProductPage({ loaderData, actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={loaderData.chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                padding={{ left: 15, right: 15 }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                                wrapperStyle={{ minWidth: "200px" }}
                            />
                            <Area
                                dataKey="product_views"
                                type="natural"
                                stroke="var(--color-views)"
                                fill="var(--color-views)"
                                strokeWidth={2}
                                dot={false}
                            />
                            <Area
                                dataKey="product_visits"
                                type="natural"
                                stroke="var(--color-visitors)"
                                fill="var(--color-visitors)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
} 