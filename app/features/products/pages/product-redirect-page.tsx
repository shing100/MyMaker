import { redirect } from "react-router";
import type { Route } from "./+types/product-redirect-page.types";


export const loader = ({ params }: Route.LoaderArgs) => {
    return redirect(`/products/${params.productId}/overview`);
}