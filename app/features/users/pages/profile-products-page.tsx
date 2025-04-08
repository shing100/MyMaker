import type { MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { getUserProducts } from "../queries";
import type { Route } from "./+types/profile-products-page";

export const meta: MetaFunction = () => {
    return [
        { title: "제품 목록 | MyMake" },
        { name: "description", content: "사용자의 제품 목록" },
    ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
    const products = await getUserProducts(params.username);
    return { products };
};

export default function ProfileProductsPage({ loaderData, }: Route.ComponentProps) {
    return (
        <div className="flex flex-col gap-5">
            {loaderData.products.map((product) => (
                <ProductCard
                    key={product.product_id}
                    id={product.product_id}
                    name={product.name}
                    description={product.tagline}
                    reviews={product.reviews}
                    views={product.views}
                    upvotes={product.upvotes}
                />
            ))}
        </div>
    );
} 