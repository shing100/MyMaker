import { Outlet } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarProvider } from "~/common/components/ui/sidebar";
import { MessageCard } from "../components/message-card";

export default function MessagesLayout() {
    return (
        <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden min-h-full h-[calc(100vh-14rem)]">
            <Sidebar className="pt-16" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu className="">
                            {Array.from({ length: 10 }).map((_, index) => (
                                <MessageCard
                                    avatarUrl="https://github.com/shadcn.png"
                                    name="John Doe"
                                    lastMessage="Last message"
                                    key={index}
                                    id={index.toString()}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="w-full flex-1">
                <Outlet />
            </div>
        </SidebarProvider>
    );
}