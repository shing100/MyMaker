
import { Form, redirect, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_TYPES } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import type { Route } from "./+types/submit-job-page";
import { z } from "zod";
import { createJob } from "../mutations";

export const meta: MetaFunction = () => {
    return [
        { title: "채용 등록 | MyMake" },
        { name: "description", content: "새로운 채용 정보 등록" },
    ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
};

export const formSchema = z.object({
    position: z.string().max(40),
    overview: z.string().max(400),
    responsibilities: z.string().max(400),
    qualifications: z.string().max(400),
    benefits: z.string().max(400),
    skills: z.string().max(400),
    companyName: z.string().max(40),
    companyLogoUrl: z.string().max(40),
    companyLocation: z.string().max(40),
    applyUrl: z.string().max(40),
    jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]),
    jobLocation: z.enum(
        LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
    ),
    salaryRange: z.enum(SALARY_TYPES),
});


export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            fieldErrors: error.flatten().fieldErrors,
        };
    }
    const { job_id } = await createJob(client, data);
    return redirect(`/jobs/${job_id}`);
};


export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
    return (
        <div>
            <Hero
                title="채용 등록"
                subtitle="새로운 채용 정보를 등록하고 채용 공고를 홍보해보세요."
            />
            <Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center" method="post">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        label="Position"
                        description="채용 공고의 직책을 입력해주세요."
                        name="position"
                        placeholder="Software Engineer"
                        required
                        type="text"
                        maxLength={40}
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.position}</p>
                    )}
                    <InputPair
                        label="Overview"
                        description="채용 공고의 상세내용을 입력해주세요."
                        name="overview"
                        placeholder="we are looking for a full-stack developer who is passionate about building web applications."
                        required
                        type="text"
                        maxLength={1000}
                        textArea
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.overview}</p>
                    )}
                    <InputPair
                        label="Responsibilities"
                        description="채용 공고의 책임 사항을 입력해주세요. 콤마로 구분해주세요."
                        name="responsibilities"
                        placeholder="i.e Implementing new features, Maintaining existing codebase, etc."
                        required
                        type="text"
                        maxLength={1000}
                        textArea
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.responsibilities}</p>
                    )}
                    <InputPair
                        label="Qualifications"
                        description="채용 공고의 자격 요건을 입력해주세요. 콤마로 구분해주세요."
                        name="qualifications"
                        placeholder="i.e 3+ years of experience, Bachelor's degree in Computer Science, etc."
                        required
                        type="text"
                        maxLength={1000}
                        textArea
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.qualifications}</p>
                    )}
                    <InputPair
                        label="Benefits"
                        description="채용 공고의 혜택을 입력해주세요. 콤마로 구분해주세요."
                        name="benefits"
                        placeholder="i.e Health insurance, Dental insurance, etc."
                        required
                        type="text"
                        maxLength={1000}
                        textArea
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.benefits}</p>
                    )}
                    <InputPair
                        label="Skills"
                        description="채용 공고의 기술 스택을 입력해주세요. 콤마로 구분해주세요."
                        name="skills"
                        placeholder="i.e JavaScript, React, Node.js, etc."
                        required
                        type="text"
                        maxLength={1000}
                        textArea
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.skills}</p>
                    )}
                    <InputPair
                        label="Company Name"
                        description="채용 공고의 회사 이름을 입력해주세요."
                        name="companyName"
                        placeholder="MyMake"
                        required
                        type="text"
                        maxLength={1000}
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.companyName}</p>
                    )}
                    <InputPair
                        label="Company Logo Url"
                        description="채용 공고의 회사 로고 URL을 입력해주세요."
                        name="companyLogoUrl"
                        placeholder="https://www.mymake.com/logo.png"
                        required
                        type="text"
                        maxLength={1000}
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.companyLogoUrl}</p>
                    )}
                    <InputPair
                        label="Company Location"
                        description="채용 공고의 회사 위치를 입력해주세요."
                        name="companyLocation"
                        placeholder="Remote"
                        required
                        type="text"
                        maxLength={1000}
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.companyLocation}</p>
                    )}
                    <InputPair
                        label="Company ApplyUrl"
                        description="채용 공고의 회사 웹사이트 URL을 입력해주세요."
                        name="applyUrl"
                        placeholder="https://www.mymake.com"
                        required
                        type="text"
                        maxLength={1000}
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>
                    )}
                    <SelectPair
                        label="Job Type"
                        description="채용 공고의 채용 형태를 선택해주세요."
                        name="jobType"
                        placeholder="Select the job type"
                        options={JOB_TYPES.map((type) => ({
                            label: type.label,
                            value: type.value,
                        }))}
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.jobType}</p>
                    )}
                    <SelectPair
                        label="Job Location"
                        description="채용 공고의 채용 위치를 선택해주세요."
                        name="jobLocation"
                        placeholder="Select the job location"
                        options={LOCATION_TYPES.map((location) => ({
                            label: location.label,
                            value: location.value,
                        }))}
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.jobLocation}</p>
                    )}
                    <SelectPair
                        label="Salary"
                        description="채용 공고의 급여를 선택해주세요."
                        name="salaryRange"
                        placeholder="Select the salary"
                        options={SALARY_TYPES.map((salary) => ({
                            label: salary,
                            value: salary,
                        }))}
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.salaryRange}</p>
                    )}
                </div>
                <Button type="submit" size="lg" className="w-full max-w-sm">Post job for $100</Button>
            </Form>
        </div>
    );
} 