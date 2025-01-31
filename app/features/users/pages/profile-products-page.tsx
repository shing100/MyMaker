import type { MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";


export const meta: MetaFunction = () => {
    return [
        { title: "제품 목록 | MyMake" },
        { name: "description", content: "사용자의 제품 목록" },
    ];
};


export default function ProfileProductsPage() {
    return (
        <div className="flex flex-col gap-5">
            {Array.from({ length: 5 }).map((_, index) => (
                <ProductCard
                    key={index}
                    id="productId"
                    name="Product Name"
                    description="Product Description"
                    upvotes={200}
                    comments={12}
                    views={12}
                />
            ))}
        </div>
    );
} 