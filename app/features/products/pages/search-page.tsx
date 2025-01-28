import { z } from "zod";
import type { Route } from "./+types/search-page";
import { data, Form } from "react-router";
import { Hero } from "~/common/components/hero";
import ProductPagination from "~/common/components/product-pagination";
import { ProductCard } from "../components/product-card";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Search Products | MyMake" },
        { name: "description", content: "Search for products" }
    ];
};

const paramsSchema = z.object({
    query: z.string().optional().default(""),
    page: z.string().optional().default("1"),
});

export function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const { success, data: parsedData } = paramsSchema.safeParse(
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

    return {
        ...parsedData,
    };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
    const { query } = loaderData;

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
                    value={query}
                />
                <Button type="submit">Search</Button>
            </Form>
            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {Array.from({ length: 11 }).map((_, index) => (
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
                <ProductPagination totalPages={10} />
            </div>
        </div>
    );
} 