import { Button } from "~/common/components/ui/button.js";
import { ProductCard } from "../components/product-card.js";
import type { Route } from "./+types/leaderboards-page.js";
import { Hero } from "~/common/components/hero";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | MyMake" },
        { name: "description", content: "Top products on MyMake" }
    ];
};


export default function LeaderboardsPage() {
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
                {Array.from({ length: 7 }).map((_, index) => (
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
                {Array.from({ length: 7 }).map((_, index) => (
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
                {Array.from({ length: 7 }).map((_, index) => (
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
                {Array.from({ length: 7 }).map((_, index) => (
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
                <Button variant="link" asChild className="text-lg self-center p-0">
                    <Link to="/products/leaderboards/yearly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
        </div>
    );
} 