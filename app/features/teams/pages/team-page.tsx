import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "Team Details | Product Hunt" },
        { name: "description", content: "Team details and information" },
    ];
};

export default function TeamPage() {
    return (
        <div>
            <h1>Team Details</h1>
        </div>
    );
} 