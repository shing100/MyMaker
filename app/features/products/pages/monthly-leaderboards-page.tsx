import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboards-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { HyperText } from "~/common/components/ui/hyper-text";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
    year: z.string().regex(/^\d{4}$/).transform(Number),
    month: z.string().regex(/^\d{1,2}$/).transform(Number)
});

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Monthly Leaderboards | MyMake" },
        { name: "description", content: "Best products of the month" }
    ];
};

export const loader = ({ params }: Route.LoaderArgs) => {
    const { success, data: parsedData } = paramsSchema.safeParse(params);
    if (!success) {
        throw data({
            error_code: "INVALID_PARAMS",
            error_message: "Invalid params"
        }, {
            status: 500
        })
    }
    const date = DateTime.fromObject({
        year: parsedData.year,
        month: parsedData.month
    });

    if (!date.isValid) {
        throw data({
            error_code: "INVALID_DATE",
            error_message: "Invalid date"
        }, {
            status: 500
        })
    }
    const today = DateTime.now().startOf("day");
    if (date > today) {
        throw data({
            error_code: "FUTURE_DATE",
            error_message: "Future date"
        }, {
            status: 500
        })
    }
    return {
        ...parsedData
    };
}

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
            <div className="flex items-center justify-center gap-2">
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
                {Array.from({ length: 11 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id="productId"
                        name="Product Name"
                        description="Product Description"
                        upvotes={200}
                        comments={12}
                        views={12}
                    />
                ))}
                <ProductPagination totalPages={10} />
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