import type { Route } from "./+types/submit-page";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Product | MyMake" },
        { name: "description", content: "Submit your product to MyMake" }
    ];
};

export function loader({ }: Route.LoaderArgs) {
    return {};
}

export function action({ }: Route.ActionArgs) {
    return {};
}

export default function SubmitPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">Submit Your Product</h1>
        </div>
    );
} 