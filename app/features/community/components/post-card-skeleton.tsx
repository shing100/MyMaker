export function PostCardSkeleton() {
    return (
        <div className="rounded-lg border p-4 space-y-4 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-muted rounded" />
                        <div className="h-3 w-16 bg-muted rounded" />
                    </div>
                </div>
                <div className="h-6 w-20 bg-muted rounded" />
            </div>
            <div className="space-y-2">
                <div className="h-6 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
            </div>
        </div>
    )
} 