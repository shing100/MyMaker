import client from "~/supa-client"

export const getJobs = async ({ limit, location, type, salary }: { limit: number, location?: string, type?: string, salary?: string }) => {
    const baseQuery = client.from('jobs')
        .select(`
            job_id,
            position,
            overview,
            company_name,
            company_logo,
            company_location,
            apply_url,
            job_type,
            location,
            salary,
            created_at
        `)
        .order('created_at', { ascending: false })
    if (location) {
        baseQuery.eq("location", location);
    }
    if (type) {
        baseQuery.eq("job_type", type);
    }
    if (salary) {
        baseQuery.eq("salary", salary);
    }

    baseQuery.limit(limit);

    const { data, error } = await baseQuery;
    if (error) {
        throw error;
    }
    return data;
}


export const getJobById = async (jobId: string) => {
    const { data, error } = await client
        .from("jobs")
        .select("*")
        .eq("job_id", jobId)
        .single();
    if (error) throw error;
    return data;
};