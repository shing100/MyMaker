import { HomeIcon, PackageIcon, RocketIcon, SparkleIcon } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "~/common/components/ui/sidebar";
import { getLoggedInUserId, getProductsByUserId } from "../queries";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/dashboard-layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = await makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const products = await getProductsByUserId(client, { userId });
    return {
        userId,
        products,
    };
};

export default function DashboardLayout({ loaderData }: Route.ComponentProps) {
    const location = useLocation();

    return (
        <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden min-h-full h-[calc(100vh-14rem)]">
            <Sidebar className="pt-16" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/my/dashboard"}>
                                    <Link to="/my/dashboard">
                                        <HomeIcon className="size-4" />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={location.pathname === "/my/dashboard/ideas"}>
                                    <Link to="/my/dashboard/ideas">
                                        <SparkleIcon className="size-4" />
                                        <span>Ideas</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Product Analytics</SidebarGroupLabel>
                        <SidebarMenu>
                            {loaderData.products.map((product) => (
                                <SidebarMenuItem key={product.product_id}>
                                    <SidebarMenuButton asChild isActive={location.pathname === `/my/dashboard/products/${product.product_id}`}>
                                        <Link to={`/my/dashboard/products/${product.product_id}`}>
                                            <RocketIcon className="size-4" />
                                            <span>{product.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="w-full h-full">
                <Outlet />
            </div>
        </SidebarProvider>
    );
}