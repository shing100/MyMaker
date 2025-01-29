import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-reviews-page.types";
import type { MetaFunction } from "react-router";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";

export const meta: MetaFunction = ({ data }) => {
    return [
        { title: `Product Reviews | MyMake` },
        { name: "description", content: `Product Reviews` }
    ];
};

export default function ProductReviewsPage() {
    return (
        <Dialog>
            <div className="space-y-10 max-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">10 Reviews</h2>
                    <DialogTrigger>
                        <Button variant="secondary">Write a Review</Button>
                    </DialogTrigger>
                </div>
                <div className="space-y-20">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ReviewCard
                            key={index}
                            avatarUrl="https://github.com/shadcn.png"
                            avatarFallback="N"
                            username="John Doe"
                            handle="@username"
                            rating={5}
                            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                            postedAt="10 days ago"
                        />
                    ))}
                </div>
            </div>
            <CreateReviewDialog />
        </Dialog>
    );
} 