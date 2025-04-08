import { DotIcon } from "lucide-react";
import type { MetaFunction } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { getJobById } from "../queries";
import { DateTime } from "luxon";
import type { Route } from "./+types/job-page";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
    return [
        { title: "채용 상세" },
        { name: "description", content: "채용 상세 정보" },
    ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const job = await getJobById(client, params.jobId);
    return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
            <div className="grid grid-cols-6 -mt-20 gap-20 items-start">
                <div className="col-span-4 space-y-8">
                    <div>
                        <div className="size-40 bg-white rounded-full border-2 overflow-hidden relative left-10">
                            <img src={loaderData.job.company_logo} className="object-cover" />
                        </div>
                        <h1 className="text-4xl font-bold">{loaderData.job.position}</h1>
                        <h4 className="text-lg text-muted-foreground">
                            {loaderData.job.company_name}
                        </h4>
                    </div>
                    <div className="flex gap-2 capitalize">
                        <Badge variant={"secondary"}>{loaderData.job.job_type}</Badge>
                        <Badge variant={"secondary"}>{loaderData.job.location}</Badge>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Overview</h4>
                        <p className="text-lg">{loaderData.job.overview}</p>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Responsibilities</h4>
                        <ul className="text-lg list-disc list-inside">
                            {loaderData.job.responsibilities.split(",").map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Qualifications</h4>
                        <ul className="text-lg list-disc list-inside">
                            {loaderData.job.qualifications.split(",").map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Benefits</h4>
                        <ul className="text-lg list-disc list-inside">
                            {loaderData.job.benefits.split(",").map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2.5">
                        <h4 className="text-2xl font-bold">Skills</h4>
                        <ul className="text-lg list-disc list-inside">
                            {loaderData.job.skills.split(",").map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 mt-32 sticky top-20 p-6 border rounded-lg space-y-8">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Avg. Salary</span>
                        <span className="text-2xl font-medium">
                            {loaderData.job.salary}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Position Location</span>
                        <span className="text-2xl font-medium capitalize">
                            {loaderData.job.location}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Job Type</span>
                        <span className="text-2xl font-medium capitalize">
                            {loaderData.job.job_type}
                        </span>
                    </div>
                    <div className="flex">
                        <span className="text-sm text-muted-foreground">395 views</span>
                        <DotIcon className="size-4" />
                        <span className="text-sm text-muted-foreground">100 applicants</span>
                        <DotIcon className="size-4" />
                        <span className="text-sm text-muted-foreground">Posted {DateTime.fromISO(loaderData.job.created_at).toRelative()}</span>
                    </div>
                    <Button className="w-full">Apply Now</Button>
                </div>
            </div>
        </div>
    );
} 