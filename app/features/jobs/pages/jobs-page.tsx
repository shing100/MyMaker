import { data, Link, useSearchParams, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_TYPES as SALARY_RANGE } from "../constants";
import { cn } from "~/lib/utils";
import { getJobs } from "../queries";
import type { Route } from "./+types/jobs-page";
import { z } from "zod";
import { URL } from "url";

export const meta: MetaFunction = () => {
    return [
        { title: "구인구직 목록 | MyMake" },
        { name: "description", content: "사용 가능한 모든 채용 정보 목록" },
    ];
};

const searchParamsSchema = z.object({
    type: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]).optional(),
    location: z.enum(LOCATION_TYPES.map((type) => type.value) as [string, ...string[]]).optional(),
    salary: z.enum(SALARY_RANGE).optional(),
});


export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const { success, data: parsedData } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!success) {
        throw data({ error_code: "INVALID_SEARCH_PARAMS", error_message: "Invalid search params" }, { status: 400 });
    }
    const jobs = await getJobs({ limit: 40, location: parsedData.location, type: parsedData.type, salary: parsedData.salary });
    return { jobs };
}

export default function JobsPage({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const onFilterClick = (key: string, value: string) => {
        if (searchParams.get(key) === value) {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
        setSearchParams(searchParams);
    }
    return (
        <div className="space-y-10 md:space-y-20">
            <Hero title="Jobs" subtitle="Companies looking for talents" />
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 xl:col-span-4 gap-5">
                    {loaderData.jobs.map((job) => (
                        <JobCard
                            key={job.job_id}
                            id={job.job_id}
                            title={job.position}
                            companyName={job.company_name}
                            companyLogoUrl={job.company_logo}
                            companyHq={job.company_location}
                            createdAt={job.created_at}
                            type={job.job_type}
                            salary={job.salary}
                            positionLocation={job.location}
                        />
                    ))}
                </div>
                <div className="xl:col-span-2 space-y-4 sticky top-20">
                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
                        <div className="flex flex-wrap gap-2">
                            {JOB_TYPES.map((type) => (
                                <Button
                                    variant="outline"
                                    onClick={() => onFilterClick("type", type.value)}
                                    className={cn(
                                        type.value === searchParams.get("type") && "bg-primary text-white",
                                    )}
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
                        <div className="flex flex-wrap gap-2">
                            {LOCATION_TYPES.map((type) => (
                                <Button
                                    variant="outline"
                                    onClick={() => onFilterClick("location", type.value)}
                                    className={cn(
                                        type.value === searchParams.get("location") && "bg-primary text-white",
                                    )}
                                >
                                    {type.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Salary Range</h4>
                        <div className="flex flex-wrap gap-2">
                            {SALARY_RANGE.map((salary) => (
                                <Button
                                    variant="outline"
                                    onClick={() => onFilterClick("salary", salary)}
                                    className={cn(
                                        salary === searchParams.get("salary") && "bg-primary text-white",
                                    )}
                                >
                                    {salary}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 