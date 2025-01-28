import type { Route } from "./+types/search-page";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Search | MyMake" },
        { name: "description", content: "Search for products" }
    ];
};

export function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    return {
        query: url.searchParams.get("q") || ""
    };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
    const { query } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Search Results: {query}</h1>
        </div>
    );
} 