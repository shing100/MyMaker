import type { Route } from "./+types/categories-page";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Categories | MyMake" },
        { name: "description", content: "Browse products by category" }
    ];
};

export function loader({ }: Route.LoaderArgs) {
    return {};
}

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Categories</h1>
        </div>
    );
} 