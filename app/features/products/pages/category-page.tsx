import type { Route } from "../../../types/routes.ts";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Category | MyMake" },
        { name: "description", content: "Products in this category" }
    ];
};

export function loader({ params }: Route.LoaderArgs) {
    return {
        category: params.category
    };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
    const { category } = loaderData;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">{category}</h1>
        </div>
    );
} 