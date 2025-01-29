import type { Route } from "./+types/new-product-review-page.types";
import type { MetaFunction } from "react-router";
import { redirect } from "react-router";

export function loader({ params }: Route.LoaderArgs) {
    return {
        product: {
            id: params.productId,
            // ... 제품 데이터 로드
        }
    };
}

export function action({ request, params }: Route.ActionArgs) {
    // 리뷰 제출 로직
    return redirect(`/products/${params.productId}/reviews`);
}

export const meta: MetaFunction = ({ data }) => {
    return [
        { title: `Write a Review - ${data.product.name}` },
        { name: "description", content: `Write a review for ${data.product.name}` }
    ];
};

export default function NewProductReviewPage({ loaderData }: Route.ComponentProps) {
    const { product } = loaderData;

    return (
        <div>
            <h1>새 리뷰 작성</h1>
            {/* 리뷰 작성 폼 */}
        </div>
    );
} 