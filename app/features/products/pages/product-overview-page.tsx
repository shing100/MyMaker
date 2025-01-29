import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: `Product Overview | MyMake` },
        { name: "description", content: "Product Overview" }
    ];
};

export default function ProductOverviewPage() {
    return (
        <div className="space-y-10">
            <div className="space-y-1">
                <h3 className="text-lg font-bold">What is this product?</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
            <div className="space-y-1">
                <h3 className="text-lg font-bold">How does it work?</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </div>
        </div>
    );
} 