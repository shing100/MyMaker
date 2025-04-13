import { Form, redirect, useNavigation, type MetaFunction } from "react-router"
import type { Route } from "./+types/submit-post-page"
import InputPair from "~/common/components/input-pair"
import { Hero } from "~/common/components/hero"
import SelectPair from "~/common/components/select-pair"
import { Button } from "~/common/components/ui/button"
import { makeSSRClient } from "~/supa-client"
import { getLoggedInUserId } from "~/features/users/queries"
import { getTopics } from "../queries"
import { z } from "zod"
import { createPost } from "../mutations"
import { LoaderCircle } from "lucide-react"

export const meta: MetaFunction = () => {
    return [
        { title: "게시물 작성 | MyMake" },
        { name: "description", content: "새로운 커뮤니티 게시물을 작성합니다." },
    ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
    const topics = await getTopics(client);
    return { topics };
};


const formSchema = z.object({
    title: z.string().min(1).max(40),
    category: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            fieldErrors: error.flatten().fieldErrors,
        };
    }
    const { title, category, content } = data;
    const { post_id } = await createPost(client, {
        title,
        category,
        content,
        userId,
    });
    return redirect(`/community/${post_id}`);
};


export default function SubmitPostPage({ loaderData, actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    return (
        <div className="space-y-10">
            <Hero
                title="새 게시물 작성"
                subtitle="새로운 게시물을 작성하세요."
            />
            <Form className="space-y-10 max-w-screen-md mx-auto" method="post">
                <InputPair
                    label="제목"
                    name="title"
                    placeholder="제목을 입력하세요."
                    description="제목은 최대 50자까지 입력할 수 있습니다."
                    required
                    id="title"
                    maxLength={50}
                />
                <SelectPair
                    label="카테고리"
                    name="category"
                    placeholder="카테고리를 선택하세요."
                    required
                    description="카테고리는 게시물의 주제를 나타냅니다."
                    options={loaderData.topics.map((topic) => ({
                        value: topic.slug,
                        label: topic.name,
                    }))}
                />
                <InputPair
                    label="내용"
                    name="content"
                    placeholder="내용을 입력하세요."
                    description="내용은 최대 1000자까지 입력할 수 있습니다."
                    required
                    id="content"
                    textArea
                />
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        "게시물 작성"
                    )}
                </Button>
            </Form>
        </div>
    )
} 