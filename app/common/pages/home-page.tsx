import { Button } from "../components/ui/button";

export default function HomePage() {
    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6">홈페이지</h1>
            <p className="text-lg mb-8">
                Get started by exploring our community or sign in to your account.
            </p>
            <div className="flex gap-4">
                <Button variant="default">Explore Community</Button>
                <Button variant="outline">Sign In</Button>
            </div>
        </main>
    );
} 
