import type { MetaFunction } from "react-router";


export const meta: MetaFunction = () => {
    return [
        { title: "프로필 | MyMake" },
        { name: "description", content: "사용자 프로필" },
    ];
};


export default function ProfilePage() {
    return (
        <div className="grid grid-cols-2 gap-5">

        </div>
    );
}