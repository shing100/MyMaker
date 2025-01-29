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
                description: string;
            };
        };
    }
} 