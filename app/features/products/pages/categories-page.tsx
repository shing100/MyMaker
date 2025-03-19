import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Categories | MyMake" },
        { name: "description", content: "Browse products by category" }
    ];
};

export const loader = async () => {
    const categories = await getCategories();
    return { categories };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero
                title="Categories"
                subtitle="Browse products by category"
            />
            <div className="grid grid-cols-4 gap-4">
                {loaderData.categories.map((category) => (
                    <CategoryCard
                        key={category.category_id}
                        id={category.category_id}
                        name={category.name}
                        description={category.description}
                    />
                ))}
            </div>
        </div>
    );
} 