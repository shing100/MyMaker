import { z } from "zod";
import type { Route } from "./+types/search-page";
import { data, Form } from "react-router";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getProductsBySearch, getPagesBySearch } from "../queries";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Search Products | MyMake" },
        { name: "description", content: "Search for products" }
    ];
};

const searchParams = z.object({
    query: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const { success, data: parsedData } = searchParams.safeParse(
        Object.fromEntries(url.searchParams)
    );
    if (!success) {
        throw data({
            error_code: "INVALID_PARAMS",
            error_message: "Invalid params"
        }, {
            status: 500
        })
    }
    if (parsedData.query === "") {
        return { products: [], totalPages: 1 };
    }
    const products = await getProductsBySearch({
        query: parsedData.query,
        page: parsedData.page,
    });
    const totalPages = await getPagesBySearch({ query: parsedData.query });
    return { products, totalPages };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero
                title="Search Products"
                subtitle="Search for products by title or description"
            />
            <Form className="flex justify-center max-w-screen-sm items-center gap-2 mx-auto">
                <Input
                    name="query"
                    placeholder="Search for products"
                    className="text-lg"
                />
                <Button type="submit">Search</Button>
            </Form>
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
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
                <ProductPagination totalPages={loaderData.totalPages} />
            </div>
        </div>
    );
} 