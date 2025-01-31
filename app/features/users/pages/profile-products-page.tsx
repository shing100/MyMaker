import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";


export const meta: MetaFunction = () => {
    return [
        { title: "제품 목록 | MyMake" },
        { name: "description", content: "사용자의 제품 목록" },
    ];
};


export default function ProfileProductsPage() {
    return (
        <div className="grid grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <CardTitle>Product {i + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="aspect-video bg-muted rounded-md" />
                        <p className="mt-3 text-muted-foreground">
                            A brief description of the product goes here.
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 