import type { Route } from "../../../types/routes.ts";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Daily Leaderboards | MyMake" },
        { name: "description", content: "Best products of the day" }
    ];
};

export function loader({ params }: Route.LoaderArgs) {
    return {
        year: params.year,
        month: params.month,
        day: params.day
    };
}

export default function DailyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const { year, month, day } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{month}/{day}/{year}</h1>
        </div>
    );
} 