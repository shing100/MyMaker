import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";


export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
    return [
        { title: `${params.category} | MyMake` },
        { name: "description", content: `Browse products in ${params.category} category` }
    ];
};

export default function CategoryPage() {
    return (
        <div className="space-y-10">
            <Hero
                title="Devloper Tools"
                subtitle="Tools for developers to build products faster"
            />
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {Array.from({ length: 11 }).map((_, index) => (
                    <ProductCard
                        key={`productId-${index}`}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        upvotes={200}
                        comments={12}
                        views={12}
                    />
                ))}
                <ProductPagination totalPages={10} />
            </div>
        </div>
    );
} 