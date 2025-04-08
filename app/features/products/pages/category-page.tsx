import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { getCategory, getCategoryPages, getProductsByCategory } from "../queries";
import { z } from "zod";
import { request } from "http";
import { makeSSRClient } from "~/supa-client";


export const meta: Route.MetaFunction = ({ params }: Route.MetaArgs) => {
    return [
        { title: `${params.category} | MyMake` },
        { name: "description", content: `Browse products in ${params.category} category` }
    ];
};

const paramsSchema = z.object({
    category: z.coerce.number(),
})

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    const { data, success } = paramsSchema.safeParse(params);
    if (!success) {
        throw new Response("Invalid category", { status: 400 });
    }

    const { client, headers } = makeSSRClient(request);
    const [category, products, totalPages] = await Promise.all([
        getCategory(client, data.category),
        getProductsByCategory(client, { categoryId: data.category, page: Number(page) }),
        getCategoryPages(client, data.category)
    ]);
    return { category, products, totalPages };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero
                title={loaderData.category.name}
                subtitle={loaderData.category.description}
            />
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {loaderData.products.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        upvotes={product.upvotes}
                        reviews={product.reviews}
                        views={product.views}
                    />
                ))}
                <ProductPagination totalPages={loaderData.totalPages} />
            </div>
        </div>
    );
} 