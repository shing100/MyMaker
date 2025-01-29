import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import type { MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";


export const meta: MetaFunction = () => {
    return [
        { title: "IdeasGPT | MyMake" },
        { name: "description", content: "IdeasGPT is a tool that helps you generate ideas for your business." }
    ];
}



export default function IdeasPage() {
    return (
        <div className="space-y-20">
            <Hero title="Idea #392841" />
            <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
                <p className="italic">
                    "A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progesss using a mobile app to track workouts and progress as well as a website to track progress and see your stats."
                </p>
                <div className="flex items-center text-sm">
                    <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>123</span>
                    </div>
                    <DotIcon className="w-4 h-4" />
                    <span>12 hours ago</span>
                    <DotIcon className="w-4 h-4" />
                    <Button variant="outline">
                        <HeartIcon className="w-4 h-4" />
                        <span>23</span>
                    </Button>
                </div>
                <Button size="lg">Claim idea now</Button>
            </div>
        </div>
    );
} 