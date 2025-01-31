import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";


export const meta: MetaFunction = () => {
    return [
        { title: "아이디어 목록 | MyMake" },
        { name: "description", content: "사용자의 아이디어 목록" },
    ];
};


export default function ProfileIdeasPage() {
    return (
        <div className="space-y-5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <CardTitle>Idea {i + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            This is a detailed description of the idea.
                            It explains the problem it solves and how it would work.
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
} 