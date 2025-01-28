import { DateTime } from "luxon";
import { data, redirect } from "react-router";
import type { Route } from "./+types/leaderboards-redirection-page";

export function loader({ params, request }: Route.LoaderArgs) {
    const { period } = params;
    let url: string;
    const today = DateTime.now().setZone("Asia/Seoul");

    if (period === "daily") {
        url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}?page=1`;
    } else if (period === "weekly") {
        url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}?page=1`;
    } else if (period === "monthly") {
        url = `/products/leaderboards/monthly/${today.year}/${today.month}?page=1`;
    } else if (period === "yearly") {
        url = `/products/leaderboards/yearly/${today.year}?page=1`;
    } else {
        return data(null, { status: 400 })
    }
    return redirect(url);
}
