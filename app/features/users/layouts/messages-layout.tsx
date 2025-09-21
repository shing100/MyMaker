import { Outlet, useOutletContext } from "react-router";
import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarProvider } from "~/common/components/ui/sidebar";
import { MessageCard } from "../components/message-card";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessages } from "../queries";
import type { Route } from "./+types/messages-layout";

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = await makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const messages = await getMessages(client, { userId });
    return {
        messages,
    };
};

export default function MessagesLayout({ loaderData }: Route.ComponentProps) {
    const { userId } = useOutletContext<{ userId: string }>();
    return (
        <SidebarProvider className="max-h-[calc(100vh-14rem)] overflow-hidden min-h-full h-[calc(100vh-14rem)]">
            <Sidebar className="pt-16" variant="floating">
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu className="">
                            {loaderData.messages.map((message) => (
                                <MessageCard
                                    key={message.message_room_id}
                                    id={message.message_room_id.toString()}
                                    name={message.name}
                                    lastMessage={message.last_message}
                                    avatarUrl={message.avatar}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
            <div className="w-full flex-1">
                <Outlet context={{ userId }} />
            </div>
        </SidebarProvider>
    );
}