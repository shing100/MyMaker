export const JOB_TYPES = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Internship", value: "internship" },
    { label: "Freelance", value: "freelance" },
] as const;

export const LOCATION_TYPES = [
    { label: "Remote", value: "remote" },
    { label: "In-Person", value: "in-person" },
    { label: "Hybrid", value: "hybrid" },
] as const;


export const SALARY_TYPES = [
    "$0 - $50,000",
    "$50,000 - $70,000",
    "$70,000 - $100,000",
    "$100,000 - $150,000",
    "$150,000 - $200,000",
    "$200,000 - $250,000",
    "$250,000+",
] as const;