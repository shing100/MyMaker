import { Link } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "../components/ui/button";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import type { Route } from "./+types/home-page";

export const meta: Route.MetaFunction = () => {
    return [
        {
            title: "Home | MyMake",
        },
        {
            name: "description",
            content: "Welcome to MyMake",
        },
    ];
};

export default function HomePage() {
    return (
        <div className="px-20 space-y-40">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">Today's Products</h2>
                    <p className="text-xl font-light text-foreground">The best products made by our community today.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/products/leaderboards">
                            Explore all products &rarr;
                        </Link>
                    </Button>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id="productId"
                        name="Product Name"
                        description="Product Description"
                        upvotes={200}
                        comments={12}
                        views={12}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
                    <p className="text-xl font-light text-foreground">The latest discussions from our community.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/community">
                            Explore all discussions &rarr;
                        </Link>
                    </Button>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                    <PostCard
                        key={index}
                        id="postId"
                        title="What is the best way to organize my workspace?"
                        authorName="Carrot"
                        authorAvatarUrl="https://github.com/apple.png"
                        category="Productivity"
                        createdAt="12 hours ago"
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
                    <p className="text-xl font-light text-foreground">Find ideas for your next project.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/ideas">
                            Explore all ideas &rarr;
                        </Link>
                    </Button>
                </div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <IdeaCard
                        key={index}
                        id="ideaId"
                        title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progesss using a mobile app to track workouts and progress as well as a website to track progress and see your stats."
                        views={123}
                        likes={123}
                        createdAt="12 hours ago"
                        claimed={index % 2 === 0}
                    />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
                    <p className="text-xl font-light text-foreground">Find your dream job.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/jobs">
                            Explore all jobs &rarr;
                        </Link>
                    </Button>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                    <JobCard
                        key={index}
                        id="jobId"
                        title="Software Engineer"
                        companyName="Meta"
                        companyLogoUrl="https://github.com/facebook.png"
                        companyHq="San Francisco, CA"
                        createdAt="12 hours ago"
                        type="Full-time"
                        salary="$100,000 - $120,000"
                        positionLocation="Remote"
                    />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <h2 className="text-5xl font-bold leading-tight tracking-tight">Find a team mate</h2>
                    <p className="text-xl font-light text-foreground">Join a team looking for a new member.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/jobs">
                            Explore all teams &rarr;
                        </Link>
                    </Button>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <TeamCard
                        key={index}
                        id="teamId"
                        leaderUsername="carrot"
                        leaderAvatarUrl="https://github.com/shing100.png"
                        positions={[
                            "React Developer",
                            "Backend Developer",
                            "Product Manager"
                        ]}
                        projectDescription="a new social media platform"
                    />
                ))}
            </div>
        </div>
    );
} 
