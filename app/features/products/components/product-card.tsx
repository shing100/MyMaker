import { Link } from "react-router";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    upvotes: string;
    reviews: string;
    views: string;
}

export function ProductCard({ id, name, description, upvotes, reviews, views }: ProductCardProps) {
    return (
        <Link to={`/products/${id}`} className="block">
            <Card className="w-full flex items-center justify-between bg-transparent hover:bg-card/50">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                        {name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                        {description}
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-px text-xs text-muted-foreground">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>{reviews}</span>
                        </div>
                        <div className="flex items-center gap-px text-xs text-muted-foreground">
                            <EyeIcon className="w-4 h-4" />
                            <span>{views}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardFooter className="py-0">
                    <Button variant="outline" className="flex flex-col h-14">
                        <ChevronUpIcon className="size-4 shrink-0" />
                        <span>{upvotes}</span>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 