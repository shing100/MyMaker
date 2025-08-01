import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("products", [
        index("features/products/pages/products-page.tsx"),
        layout("features/products/layouts/leaderboard-layout.tsx", [
            ...prefix("leaderboards", [
                index("features/products/pages/leaderboards-page.tsx"),
                route("/yearly/:year", "features/products/pages/yearly-leaderboards-page.tsx"),
                route("/monthly/:year/:month", "features/products/pages/monthly-leaderboards-page.tsx"),
                route("/weekly/:year/:week", "features/products/pages/weekly-leaderboards-page.tsx"),
                route("/daily/:year/:month/:day", "features/products/pages/daily-leaderboards-page.tsx"),
                route("/:period", "features/products/pages/leaderboards-redirection-page.tsx"),
            ]),
        ]),
        ...prefix("categories", [
            index("features/products/pages/categories-page.tsx"),
            route("/:category", "features/products/pages/category-page.tsx"),
        ]),
        route("/search", "features/products/pages/search-page.tsx"),
        route("/submit", "features/products/pages/submit-product-page.tsx"),
        route("/promote", "features/products/pages/promote-page.tsx"),
        ...prefix("/:productId", [
            index("features/products/pages/product-redirect-page.tsx"),
            layout("features/products/layouts/product-overview-layout.tsx", [
                route("/overview", "features/products/pages/product-overview-page.tsx"),
                ...prefix("/reviews", [
                    index("features/products/pages/product-reviews-page.tsx"),
                ]),
            ]),
            route("/visit", "features/products/pages/product-visit-page.tsx"),
        ])
    ]),
    ...prefix("/ideas", [
        index("features/ideas/pages/ideas-page.tsx"),
        route("/:ideaId", "features/ideas/pages/idea-page.tsx"),
    ]),
    ...prefix("/jobs", [
        index("features/jobs/pages/jobs-page.tsx"),
        route("/:jobId", "features/jobs/pages/job-page.tsx"),
        route("/submit", "features/jobs/pages/submit-job-page.tsx"),
    ]),
    ...prefix("/auth", [
        layout("features/auth/layouts/auth-layout.tsx", [
            route("/login", "features/auth/pages/login-page.tsx"),
            route("/join", "features/auth/pages/join-page.tsx"),
            ...prefix("/otp", [
                route("/start", "features/auth/pages/otp-start-page.tsx"),
                route("/complete", "features/auth/pages/otp-complete-page.tsx"),
            ]),
            ...prefix("/social/:provider", [
                route("/start", "features/auth/pages/social-start-page.tsx"),
                route("/complete", "features/auth/pages/social-complete-page.tsx"),
            ]),
        ]),
        route("/logout", "features/auth/pages/logout-page.tsx"),
    ]),
    ...prefix("/community", [
        index("features/community/pages/community-page.tsx"),
        route("/:postId", "features/community/pages/post-page.tsx"),
        route("/:postId/upvote", "features/community/pages/upvote-post-page.tsx"),
        route("/submit", "features/community/pages/submit-post-page.tsx"),
    ]),
    ...prefix("/teams", [
        index("features/teams/pages/teams-page.tsx"),
        route("/:teamId", "features/teams/pages/team-page.tsx"),
        route("/create", "features/teams/pages/create-team-page.tsx"),
    ]),
    ...prefix("/my", [
        layout("features/users/layouts/dashboard-layout.tsx", [
            ...prefix("/dashboard", [
                index("features/users/pages/dashboard-page.tsx"),
                route("/:ideaId", "features/users/pages/dashboard-ideas-page.tsx"),
                route("/products/:productId", "features/users/pages/dashboard-product-page.tsx"),
            ]),
        ]),
        layout("features/users/layouts/messages-layout.tsx", [
            ...prefix("/messages", [
                index("features/users/pages/messages-page.tsx"),
                route("/:messageId", "features/users/pages/message-page.tsx"),
            ]),
        ]),
        route("/profile", "features/users/pages/my-profile-page.tsx"),
        route("/settings", "features/users/pages/settings-page.tsx"),
        route("/notifications", "features/users/pages/notifications-page.tsx"),
        route(
            "/notifications/:notificationId/see",
            "features/users/pages/see-notification-page.tsx"
        ),
    ]),
    ...prefix("/users/:username", [
        layout("features/users/layouts/profile-layout.tsx", [
            index("features/users/pages/profile-page.tsx"),
            route("/products", "features/users/pages/profile-products-page.tsx"),
            route("/posts", "features/users/pages/profile-posts-page.tsx"),
        ]),
        route("/messages", "features/users/pages/send-message-page.tsx"),
    ]),
] satisfies RouteConfig;
