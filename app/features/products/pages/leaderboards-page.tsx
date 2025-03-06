import { Button } from "~/common/components/ui/button.js";
import { ProductCard } from "../components/product-card.js";
import type { Route } from "./+types/leaderboards-page.js";
import { Hero } from "~/common/components/hero";
import { Link } from "react-router";
import { getProductsByDateRange } from "../queries.js";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | MyMake" },
        { name: "description", content: "Top products on MyMake" }
    ];
};

export const loader = async () => {
    const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
        await Promise.all([
            getProductsByDateRange({
                startDate: DateTime.now().startOf("day"),
                endDate: DateTime.now().endOf("day"),
                limit: 7,
            }),
            getProductsByDateRange({
                startDate: DateTime.now().startOf("week"),
                endDate: DateTime.now().endOf("week"),
                limit: 7,
            }),
            getProductsByDateRange({
                startDate: DateTime.now().startOf("month"),
                endDate: DateTime.now().endOf("month"),
                limit: 7,
            }),
            getProductsByDateRange({
                startDate: DateTime.now().startOf("year"),
                endDate: DateTime.now().endOf("year"),
                limit: 7,
            }),
        ]);
    return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};


export default function LeaderboardsPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Leaderboards"
                subtitle="See the top products of the week, month, and year."
            />
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most popular products of the day.</p>
                </div>
                {loaderData.dailyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id.toString()}
                        id={product.product_id.toString()}
                        name={product.name}
                        description={product.description}
                        upvotes={product.upvotes}
                        reviews={product.reviews}
                        views={product.views}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/products/leaderboards/daily">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most popular products of the week.</p>
                </div>
                {loaderData.weeklyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id.toString()}
                        id={product.product_id.toString()}
                        name={product.name}
                        description={product.description}
                        upvotes={product.upvotes}
                        reviews={product.reviews}
                        views={product.views}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/products/leaderboards/weekly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most popular products of the month.</p>
                </div>
                {loaderData.monthlyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id.toString()}
                        id={product.product_id.toString()}
                        name={product.name}
                        description={product.description}
                        upvotes={product.upvotes}
                        reviews={product.reviews}
                        views={product.views}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/products/leaderboards/monthly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboard</h2>
                    <p className="text-xl font-light text-foreground">The most popular products of the year.</p>
                </div>
                {loaderData.yearlyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id.toString()}
                        id={product.product_id.toString()}
                        name={product.name}
                        description={product.description}
                        upvotes={product.upvotes}
                        reviews={product.reviews}
                        views={product.views}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/products/leaderboards/yearly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
        </div>
    );
} 