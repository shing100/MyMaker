import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboards-page";
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
    week: z.coerce.number(),
});

export const meta: Route.MetaFunction = ({ params }) => {
    const date = DateTime.fromObject({
        weekYear: Number(params.year),
        weekNumber: Number(params.week),
    })
        .setZone("Asia/Seoul")
        .setLocale("ko");
    return [
        {
            title: `Best of week ${date
                .startOf("week")
                .toLocaleString(DateTime.DATE_SHORT)} - ${date
                    .endOf("week")
                    .toLocaleString(DateTime.DATE_SHORT)} | wemake`,
        },
    ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
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
        weekYear: parsedData.year,
        weekNumber: parsedData.week,
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
    const today = DateTime.now().setZone("Asia/Seoul").startOf("week");
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
        startDate: date.startOf("week"),
        endDate: date.endOf("week"),
        limit: 15,
        page: Number(url.searchParams.get("page") || 1),
    });
    const totalPages = await getProductPagesByDateRange(client, {
        startDate: date.startOf("week"),
        endDate: date.endOf("week"),
    });
    return {
        products,
        totalPages,
        ...parsedData,
    };
};

export default function WeeklyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const urlDate = DateTime.fromObject({
        weekYear: loaderData.year,
        weekNumber: loaderData.week
    });
    const previousWeek = urlDate.minus({ weeks: 1 });
    const nextWeek = urlDate.plus({ weeks: 1 });
    const isToday = urlDate.equals(DateTime.now().startOf("week"));
    return (
        <div className="space-y-10">
            <div className="flex flex-col py-10 justify-center items-center rounded-md bg-gradient-to-t from-background to-primary/10">
                <span className="text-3xl font-semibold mr-2">
                    {urlDate.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - {urlDate.endOf("week").toLocaleString(DateTime.DATE_SHORT)}
                </span>
                <HyperText className="flex items-center justify-center" duration={1000} delay={1000}>
                    Best Products of the Week
                </HyperText>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" asChild>
                    <Link to={`/products/leaderboards/weekly/${previousWeek.year}/${previousWeek.weekNumber}`}>
                        &larr; {previousWeek.toLocaleString(DateTime.DATE_SHORT)}
                    </Link>
                </Button>
                {!isToday ? <Button variant="secondary" asChild>
                    <Link to={`/products/leaderboards/weekly/${nextWeek.year}/${nextWeek.weekNumber}`}>
                        {nextWeek.toLocaleString(DateTime.DATE_SHORT)} &rarr;
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