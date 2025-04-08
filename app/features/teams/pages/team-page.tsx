import { Form, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import InputPair from "~/common/components/input-pair";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { getTeamById } from "../queries";
import type { Route } from "./+types/team-page";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
    return [
        { title: "Team Details | Product Hunt" },
        { name: "description", content: "Team details and information" },
    ];
};


export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const team = await getTeamById(client, params.teamId);
    return { team };
};


export default function TeamPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />
            <div className="grid grid-cols-6 gap-40 items-start">
                <div className="col-span-4 grid grid-cols-4 gap-5">
                    {[
                        {
                            title: "Product Name",
                            value: loaderData.team.product_name,
                        },
                        {
                            title: "Stage",
                            value: loaderData.team.product_stage
                        },
                        {
                            title: "Team size",
                            value: loaderData.team.team_size,
                        },
                        {
                            title: "Available equity",
                            value: loaderData.team.equity_split,
                        },
                    ].map(item =>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                                <CardContent className="p-0 capitalize font-bold text-2xl">
                                    <p>{item.value}</p>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    )}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Looking for</CardTitle>
                            <CardContent className="p-0 font-bold text-2xl">
                                <ul className="text-lg list-disc list-inside">
                                    {loaderData.team.roles.split(",").map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">Idea description</CardTitle>
                            <CardContent className="p-0 font-medium text-xl">
                                <p>{loaderData.team.product_description}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>
                                {loaderData.team.team_leader.name[0]}
                            </AvatarFallback>
                            {loaderData.team.team_leader.avatar ? (
                                <AvatarImage src={loaderData.team.team_leader.avatar} />
                            ) : null}
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">
                                {loaderData.team.team_leader.name}
                            </h4>
                            <Badge variant="secondary" className="capitalize">
                                {loaderData.team.team_leader.role}
                            </Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
                        <span>🍰 Joined 3 months ago</span>
                        <span>🚀 Launched 10 products</span>
                    </div>
                    <Form className="space-y-5">
                        <InputPair
                            label="Introduce yourself"
                            name="introduction"
                            description="Tell us about yourself"
                            type="text"
                            id="introduction"
                            placeholder="I'm a product manager with 5 years of experience in the industry. I'm looking for a team to join and help build a social media platform for dogs."
                            required
                            textArea
                        />
                    </Form>
                    <Button type="submit" className="w-full">Get in touch</Button>
                    <Button variant="outline" className="w-full">Follow</Button>
                </aside>
            </div>
        </div>
    );
} 