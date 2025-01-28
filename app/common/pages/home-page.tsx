import { Link } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
    return [
        {
            title: "Home | MyMake",
        },
        {
            name: "description",
            content: "Welcome to MyMake",
        },
    ];
};

export default function HomePage() {
    return (
        <div className="px-20">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
                    <p className="text-xl font-light text-foreground">The best products made by our community today.</p>
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
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
        </div>
    );
} 
