import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

export namespace Route {
    export interface LoaderArgs extends LoaderFunctionArgs {
        params: {
            productId: string;
        };
    }

    export interface ActionArgs extends ActionFunctionArgs {
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
        };
    }
} 