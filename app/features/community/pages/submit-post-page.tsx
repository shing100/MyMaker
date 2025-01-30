import { Form, type MetaFunction } from "react-router"
import type { Route } from "./+types/submit-post-page"
import InputPair from "~/common/components/input-pair"
import { Hero } from "~/common/components/hero"
import SelectPair from "~/common/components/select-pair"
import { Button } from "~/common/components/ui/button"

export const meta: MetaFunction = () => {
    return [
        { title: "게시물 작성 | MyMake" },
        { name: "description", content: "새로운 커뮤니티 게시물을 작성합니다." },
    ]
}


export default function SubmitPostPage({ actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero
                title="새 게시물 작성"
                subtitle="새로운 게시물을 작성하세요."
            />
            <Form className="space-y-10 max-w-screen-md mx-auto">
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
                    options={[
                        { label: "자유", value: "free" },
                        { label: "질문", value: "question" },
                        { label: "토론", value: "debate" },
                    ]}
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
                <Button type="submit" className="w-full">
                    게시물 작성
                </Button>
            </Form>
        </div>
    )
} 