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
        .limit(limit)
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
    const { data, error } = await baseQuery;
    if (error) {
        throw error;
    }
    return data;
}