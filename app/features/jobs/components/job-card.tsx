import { Link } from "react-router";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";

interface JobCardProps {
    id: string;
    title: string;
    companyName: string;
    companyLogoUrl: string;
    companyHq: string;
    createdAt: string;
    type: string;
    salary: string;
    positionLocation: string;
}

export function JobCard({
    id,
    title,
    companyName,
    companyLogoUrl,
    companyHq,
    createdAt,
    type,
    salary,
    positionLocation
}: JobCardProps) {
    return (
        <Link to={`/jobs/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <img
                            src={companyLogoUrl}
                            alt={`${companyName} Logo`}
                            className="size-12 rounded-full"
                        />
                        <div className="space-x-2">
                            <span className="font-medium">{companyName}</span>
                            <span className="text-sm text-muted-foreground">{createdAt}</span>
                        </div>
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant="outline">{type}</Badge>
                    <Badge variant="outline">{positionLocation}</Badge>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                            {salary}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            {companyHq}
                        </span>
                    </div>
                    <Button variant="secondary" size="sm">
                        Apply now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 