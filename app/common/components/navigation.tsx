import { Link } from "react-router";
import { Separator } from "~/common/components/ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                name: "Leaderboards",
                description: "See the top performers in our community",
                to: "/products/leaderboards"
            },
            {
                name: "Categories",
                description: "Explore products by category",
                to: "/products/categories"
            },
            {
                name: "Search",
                description: "Search for products",
                to: "/products/search"
            },
            {
                name: "Submit a Product",
                description: "Submit a product to be featured on our platform",
                to: "/products/submit"
            },
            {
                name: "Promote",
                description: "Promote your product to the community",
                to: "/products/promote"
            }
        ]
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            {
                name: "Remote Jobs",
                description: "Find remote jobs in our community",
                to: "/jobs?location=remote"
            },
            {
                name: "Full-Time Jobs",
                description: "Find full-time jobs in our community",
                to: "/jobs?location=full-time"
            },
            {
                name: "Freelance Jobs",
                description: "Find freelance jobs in our community",
                to: "/jobs?location=freelance"
            },
            {
                name: "Internships",
                description: "Find internships in our community",
                to: "/jobs?location=internship"
            },
            {
                name: "Submit a Job",
                description: "Submit a job to be featured on our platform",
                to: "/jobs/submit"
            }
        ]
    },
    {
        name: "Community",
        to: "/community",
        items: [
            {
                name: "All Posts",
                description: "See all posts in our community",
                to: "/community"
            },
            {
                name: "Top Posts",
                description: "See the top posts in our community",
                to: "/community?sort=top"
            },
            {
                name: "New Posts",
                description: "See the newest posts in our community",
                to: "/community?sort=new"
            },
            {
                name: "Create a Post",
                description: "Create a post to share with our community",
                to: "/community/create"
            }
        ]
    },
    {
        name: "IdeasGPT",
        to: "/ideas",
        items: [
        ]
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            {
                name: "All Teams",
                description: "See all teams in our community",
                to: "/teams"
            },
            {
                name: "Create a Team",
                description: "Create a team to collaborate with others",
                to: "/teams/create"
            }
        ]
    }
]

export default function Navigation() {
    return (
        <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
            <div className="flex items-center">
                <Link to="/" className="font-bold tracking-tighter text-lg">
                    MyMake
                </Link>
                <Separator orientation="vertical" className="h-6 mx-4" />
                <NavigationMenu>
                    <NavigationMenuList>
                        {menus.map((menu) => (
                            <NavigationMenuItem key={menu.name}>
                                <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {menu.items?.map((item) => (
                                        <NavigationMenuItem key={item.name}>
                                            <Link to={item.to}>{item.name}</Link>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
}
