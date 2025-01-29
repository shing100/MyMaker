import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "채용 상세" },
        { name: "description", content: "채용 상세 정보" },
    ];
};

export default function JobPage() {
    return (
        <div className="container py-8">
            <h1 className="text-3xl font-bold mb-6">채용 상세</h1>
            {/* job details */}
        </div>
    );
} 