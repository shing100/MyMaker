import type { Route } from "../../../types/routes.ts";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Yearly Leaderboards | MyMake" },
        { name: "description", content: "Best products of the year" }
    ];
};

export function loader({ params }: Route.LoaderArgs) {
    return {
        year: params.year
    };
}

export default function YearlyLeaderboardsPage({ loaderData }: Route.ComponentProps) {
    const { year } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Best of {year}</h1>
        </div>
    );
} 