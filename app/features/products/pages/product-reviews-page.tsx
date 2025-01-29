import type { Route } from "./+types/product-reviews-page.types";
import type { MetaFunction } from "react-router";

export function loader({ params }: Route.LoaderArgs) {
    return {
        product: {
            id: params.productId,
            // ... 제품 데이터 로드
        },
        reviews: [
            // ... 리뷰 데이터 로드
        ]
    };
}

export const meta: MetaFunction = ({ data }) => {
    return [
        { title: `${data.product.name} - Reviews` },
        { name: "description", content: `Reviews for ${data.product.name}` }
    ];
};

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
    const { product, reviews } = loaderData;

    return (
        <div>
            <h1>제품 리뷰</h1>
            {/* 리뷰 목록 표시 */}
        </div>
    );
} 