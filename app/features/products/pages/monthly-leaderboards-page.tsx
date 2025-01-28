import type { Route } from "../../../types/routes.ts";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Monthly Leaderboards | MyMake" },
        { name: "description", content: "Best products of the month" }
    ];
};

export function loader({ params }: Route.LoaderArgs) {
    return {
        year: params.year,
        month: params.month
    };
}

export default function MonthlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const { year, month } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Best of {month}/{year}</h1>
        </div>
    );
} 