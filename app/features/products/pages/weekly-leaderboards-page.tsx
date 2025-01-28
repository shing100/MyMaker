import type { Route } from "./+types/weekly-leaderboards-page";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Weekly Leaderboards | MyMake" },
        { name: "description", content: "Best products of the week" }
    ];
};

export function loader({ params }: Route.LoaderArgs) {
    return {
        year: params.year,
        week: params.week
    };
}

export default function WeeklyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const { year, week } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Week {week}, {year}</h1>
        </div>
    );
} 