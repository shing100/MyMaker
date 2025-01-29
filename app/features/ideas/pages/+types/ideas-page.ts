import type { MetaFunction } from "react-router";

export namespace Route {
    export interface LoaderData {
        ideas: {
            id: string;
            title: string;
            description: string;
            votes: number;
            createdAt: string;
        }[];
    }

    export type LoaderArgs = {
        request: Request;
    };

    export type ActionArgs = {
        request: Request;
    };

    export type MetaArgs = {
        data: LoaderData;
    };
}

export type { MetaFunction }; 