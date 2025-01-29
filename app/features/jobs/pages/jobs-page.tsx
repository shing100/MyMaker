import { Link, useSearchParams, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { JobCard } from "../components/job-card";
import { Button } from "~/common/components/ui/button";
import { JOB_TYPES, LOCATION_TYPES, SALARY_TYPES } from "../constants";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => {
    return [
        { title: "구인구직 목록 | MyMake" },
        { name: "description", content: "사용 가능한 모든 채용 정보 목록" },
    ];
};

export default function JobsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const onFilterClick = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    }
    return (
        <div className="space-y-20">
            <Hero title="Jobs" subtitle="Companies looking for talents" />
            <div className="grid grid-cols-6 gap-20 items-start">
                <div className="grid grid-cols-3 col-span-4 gap-5">
                    {Array.from({ length: 11 }).map((_, index) => (
                        <JobCard
                            key={index}
                            id="jobId"
                            title="Software Engineer"
                            companyName="Meta"
                            companyLogoUrl="https://github.com/facebook.png"
                            companyHq="San Francisco, CA"
                            createdAt="12 hours ago"
                            type="Full-time"
                            salary="$100,000 - $120,000"
                            positionLocation="Remote"
                        />
                    ))}
                </div>
                <div className="col-span-2 space-y-4">
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
                            {SALARY_TYPES.map((salary) => (
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