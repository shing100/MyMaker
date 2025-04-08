import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboards-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { HyperText } from "~/common/components/ui/hyper-text";
import ProductPagination from "~/common/components/product-pagination";
import { getProductPagesByDateRange, getProductsByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
    year: z.coerce.number(),
    month: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
    const date = DateTime.fromObject({
        year: Number(params.year),
        month: Number(params.month),
    })
        .setZone("Asia/Seoul")
        .setLocale("ko");
    return [
        {
            title: `Best of ${date.toLocaleString({
                month: "long",
                year: "2-digit",
            })} | wemake`,
        },
    ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramsSchema.safeParse(params);
    if (!success) {
        throw data(
            {
                error_code: "invalid_params",
                message: "Invalid params",
            },
            { status: 400 }
        );
    }
    const date = DateTime.fromObject({
        year: parsedData.year,
        month: parsedData.month,
    }).setZone("Asia/Seoul");
    if (!date.isValid) {
        throw data(
            {
                error_code: "invalid_date",
                message: "Invalid date",
            },
            {
                status: 400,
            }
        );
    }
    const today = DateTime.now().setZone("Asia/Seoul").startOf("month");
    if (date > today) {
        throw data(
            {
                error_code: "future_date",
                message: "Future date",
            },
            { status: 400 }
        );
    }

    const { client, headers } = makeSSRClient(request);
    const url = new URL(request.url);
    const products = await getProductsByDateRange(client, {
        startDate: date.startOf("month"),
        endDate: date.endOf("month"),
        limit: 15,
        page: Number(url.searchParams.get("page") || 1),
    });
    const totalPages = await getProductPagesByDateRange(client, {
        startDate: date.startOf("month"),
        endDate: date.endOf("month"),
    });
    return {
        products,
        totalPages,
        ...parsedData,
    };
};

export default function MonthlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const urlDate = DateTime.fromObject({
        year: loaderData.year,
        month: loaderData.month
    });
    const previousMonth = urlDate.minus({ months: 1 });
    const nextMonth = urlDate.plus({ months: 1 });
    const isToday = urlDate.equals(DateTime.now().startOf("month"));
    return (
        <div className="space-y-10">
            <div className="flex flex-col py-10 justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/10">
                <span className="text-3xl font-semibold mr-2">
                    {urlDate.toLocaleString({
                        month: "long",
                        year: "2-digit"
                    })}
                </span>
                <HyperText className="flex items-center justify-center" duration={1000} delay={1000}>
                    Monthly Leaderboards
                </HyperText>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" asChild>
                    <Link to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}>
                        &larr; {previousMonth.toLocaleString({
                            month: "long",
                            year: "2-digit"
                        })}
                    </Link>
                </Button>
                {!isToday ? <Button variant="secondary" asChild>
                    <Link to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}>
                        {nextMonth.toLocaleString({
                            month: "long",
                            year: "2-digit"
                        })} &rarr;
                    </Link>
                </Button> : null}
            </div>
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {loaderData.products.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id.toString()}
                        name={product.name}
                        description={product.tagline}
                        reviews={product.reviews}
                        views={product.views}
                        upvotes={product.upvotes}
                    />
                ))}
                <ProductPagination totalPages={loaderData.totalPages} />
            </div>
        </div >
    );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    const renderErrorMessage = () => {
        if (isRouteErrorResponse(error)) {
            return `Oops! 상태: ${error.status} / ${error.data.error_message} / ${error.data.error_code}`;
        }
        return error instanceof Error ? error.message : "알 수 없는 오류";
    };

    return (
        <Alert variant="destructive" className="mt-4">
            <AlertTitle>오류 발생</AlertTitle>
            <AlertDescription>{renderErrorMessage()}</AlertDescription>
        </Alert>
    );
}