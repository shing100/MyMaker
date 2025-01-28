import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";


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
        <div className="space-y-10">
            <Hero
                title="Categories"
                subtitle="Browse products by category"
            />
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <CategoryCard
                        key={index}
                        id="categoryId"
                        name="Category Name"
                        description="Category Description"
                    />
                ))}
            </div>
        </div>
    );
} 