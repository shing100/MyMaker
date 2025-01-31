import type { MetaFunction } from "react-router";
import { Outlet } from "react-router";

export const meta: MetaFunction = () => {
    return [
        { title: "프로필 | MyMake" },
        { name: "description", content: "사용자 프로필" },
    ];
};


export default function ProfileLayout() {
    return (
        <div className="space-y-10">
            <Outlet />
        </div>
    );
} 