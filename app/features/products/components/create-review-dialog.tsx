import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/common/components/ui/dialog";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

export default function CreateReviewDialog() {
    const [rating, setRating] = useState<number>(0);
    const [hoveredStar, setHoveredStar] = useState<number>(0);
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl">What do you think of this product?</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Please share your thoughts with us.
            </DialogDescription>
            <Form className="space-y-10">
                <div>
                    <Label className="flex flex-col gap-1">
                        Rating
                        <small className="text-muted-foreground">
                            What would you rate this product?
                        </small>
                    </Label>
                    <div className="flex gap-2 mt-5">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Label key={star} className="relative"
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                            >
                                <StarIcon
                                    className="size-5 
                                    text-yellow-500"
                                    fill={hoveredStar >= star || rating >= star ? "currentColor" : "none"}
                                />
                                <Input
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    required
                                    className="opacity-0 h-px w-px absolute"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                            </Label>
                        ))}
                    </div>
                </div>
                <InputPair
                    textArea
                    required
                    label="Review"
                    description="Please share your thoughts with us. Maximum 1000 characters."
                    maxLength={1000}
                    placeholder="Tell us more about your experience with this product."
                />
                <DialogFooter>
                    <Button type="submit">Submit review</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    )
}