import type { Route } from "~/types";
import type { MetaFunction } from "react-router";

interface SubmitJobPageProps extends Route.ComponentProps { }

export const meta: MetaFunction = () => {
    return [
        { title: "채용 등록" },
        { name: "description", content: "새로운 채용 정보 등록" },
    ];
};

export function loader({ }: Route.LoaderArgs) {
    return {};
}

export function action({ request }: Route.ActionArgs) {
    return {};
}

export default function SubmitJobPage({ loaderData, actionData }: SubmitJobPageProps) {
    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">채용 등록</h1>
            <form method="post" className="space-y-4">
                {/* job submission form */}
            </form>
        </div>
    );
} 