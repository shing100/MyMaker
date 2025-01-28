import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboards-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { HyperText } from "~/common/components/ui/hyper-text";
import ProductPagination from "~/common/components/product-pagination";

const paramsSchema = z.object({
    year: z.string().regex(/^\d{4}$/).transform(Number),
    week: z.string().regex(/^\d{1,2}$/).transform(Number)
});

export const meta: Route.MetaFunction = ({ params }) => {
    const date = DateTime.fromObject({
        weekYear: Number(params.year),
        weekNumber: Number(params.week)
    }).setZone("Asia/Seoul")
        .setLocale("ko");
    return [
        { title: `${date.startOf("week").toLocaleString(DateTime.DATE_SHORT)} - ${date.endOf("week").toLocaleString(DateTime.DATE_SHORT)} Leaderboards | MyMake` },
        { name: "description", content: "Best products of the week" }
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
        weekYear: parsedData.year,
        weekNumber: parsedData.week
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
            <div className="flex items-center justify-center gap-2">
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