import type { Route } from "../../../types/routes.ts";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Promote Product | MyMake" },
        { name: "description", content: "Promote your product on MyMake" }
    ];
};

export function loader({ }: Route.LoaderArgs) {
    return {};
}

export function action({ }: Route.ActionArgs) {
    return {};
}

export default function PromotePage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Promote Your Product</h1>
        </div>
    );
} 