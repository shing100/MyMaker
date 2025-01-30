import { DotIcon } from "lucide-react";
import type { MetaFunction } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";

export const meta: MetaFunction = () => {
    return [
        { title: "채용 상세" },
        { name: "description", content: "채용 상세 정보" },
    ];
};

export default function JobPage() {
    return (
        <div>
            <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
            <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
                <div className="col-span-4 space-y-8">
                    <div>
                        <div className="size-40 bg-white rounded-full border-2 overflow-hidden relative left-10">
                            <img src="https://github.com/facebook.png" alt="company logo" />
                        </div>
                        <h1 className="text-4xl font-bold">Software Engineer</h1>
                        <h4 className="text-lg text-muted-foreground">Meta Inc.</h4>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary">Full-time</Badge>
                        <Badge variant="secondary">Remote</Badge>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Overview</h4>
                        <p className="text-lg">
                            We are looking for a software engineer to join our team. You will be
                            responsible for developing and maintaining our software.
                        </p>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Responsibilities</h4>
                        <ul className="text-lg list-disc list-inside">
                            {["Develop and maintain our software", "Collaborate with other teams", "Optimize our software for performance"].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Qualifications</h4>
                        <ul className="text-lg list-disc list-inside">
                            {["Bachelor's degree in Computer Science", "3+ years of experience in software development", "Strong problem-solving skills"].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Benefits</h4>
                        <ul className="text-lg list-disc list-inside">
                            {["Flexible working hours", "Remote work", "Competitive salary"].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Skills</h4>
                        <ul className="text-lg list-disc list-inside">
                            {["JavaScript", "React", "Node.js"].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 mt-32 sticky top-20 p-6 border rounded-lg space-y-8">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Avg. Salary</span>
                        <span className="text-2xl font-medium">$100,000 - $120,000</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Position Location</span>
                        <span className="text-2xl font-medium">Remote</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Job Type</span>
                        <span className="text-2xl font-medium">Full-time</span>
                    </div>
                    <div className="flex">
                        <span className="text-sm text-muted-foreground">395 views</span>
                        <DotIcon className="size-4" />
                        <span className="text-sm text-muted-foreground">100 applicants</span>
                        <DotIcon className="size-4" />
                        <span className="text-sm text-muted-foreground">Posted 2 days ago</span>
                    </div>
                    <Button className="w-full">Apply Now</Button>
                </div>
            </div>
        </div>
    );
} 