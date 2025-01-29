import type { LoaderFunctionArgs } from "react-router";

export namespace Route {
    export interface LoaderArgs extends LoaderFunctionArgs {
        params: {
            productId: string;
        };
    }

    export interface ComponentProps {
        loaderData: {
            product: {
                id: string;
                name: string;
            };
            reviews: Array<{
                id: string;
                content: string;
                // ... 기타 리뷰 필드
            }>;
        };
    }
} 