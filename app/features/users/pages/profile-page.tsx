import type { MetaFunction } from "react-router";


export const meta: MetaFunction = () => {
    return [
        { title: "프로필 | MyMake" },
        { name: "description", content: "사용자 프로필" },
    ];
};


export default function ProfilePage() {
    return (
        <div className="max-w-screen-md flex flex-col space-y-10">
            <div className="space-y-2">
                <h4 className="text-lg font-bold">headline</h4>
                <p className="text-muted-foreground">
                    I'm a product designer and a startup enthusiast. I'm currently the co-founder and product designer.
                </p>
            </div>
            <div>
                <h4 className="text-lg font-bold">About</h4>
                <p className="text-muted-foreground">
                    I'm a product designer and a startup enthusiast. I'm currently the co-founder and product designer
                    also a software engineer.
                </p>
            </div>
        </div>
    );
}