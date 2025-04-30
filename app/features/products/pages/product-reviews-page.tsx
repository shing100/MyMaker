import { Button } from "~/common/components/ui/button";
import type { MetaFunction } from "react-router";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviews } from "../queries";
import type { Route } from "./+types/product-reviews-page";
import { makeSSRClient } from "~/supa-client";
import { createProductReview } from "../mutations";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { useEffect, useState } from "react";


export const meta: MetaFunction = ({ data }) => {
    return [
        { title: `Product Reviews | MyMake` },
        { name: "description", content: `Product Reviews` }
    ];
};

const formSchema = z.object({
    review: z.string().min(1),
    rating: z.coerce.number().min(1).max(5),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
    const { client, headers } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
        };
    }
    await createProductReview(client, {
        productId: params.productId,
        review: data.review,
        rating: data.rating,
        userId,
    });
    return {
        ok: true,
    };
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const reviews = await getReviews(client, params.productId);
    return { reviews };
};

export default function ProductReviewsPage({ loaderData, actionData }: Route.ComponentProps) {
    const { review_count } = useOutletContext<{ review_count: string }>();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (actionData?.ok) {
            setOpen(false);
        }
    }, [actionData]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="space-y-10 max-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {review_count} {review_count === "1" ? "Review" : "Reviews"}
                    </h2>
                    <DialogTrigger>
                        <Button variant="secondary">Write a Review</Button>
                    </DialogTrigger>
                </div>
                <div className="space-y-20">
                    {loaderData.reviews.map((review) => (
                        <ReviewCard
                            key={review.review_id}
                            avatarUrl={review.user.avatar}
                            avatarFallback={review.user.name[0]}
                            username={review.user.name}
                            handle={review.user.username}
                            rating={review.rating}
                            content={review.review}
                            postedAt={review.created_at}
                        />
                    ))}
                </div>
            </div>
            <CreateReviewDialog />
        </Dialog>
    );
} 