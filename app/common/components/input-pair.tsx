import type { InputHTMLAttributes } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function InputPair({
    label,
    description,
    textArea = false,
    ...rest
}: {
    label: string;
    description: string;
    textArea?: boolean;
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>) {
    return (
        <div className="space-y-2 flex flex-col">
            <Label htmlFor={rest.id} className="flex flex-col gap-1 text-lg">
                {label}
                <small className="text-muted-foreground text-sm">
                    {description}
                </small>
            </Label>
            {textArea ? <Textarea rows={6} className="resize-none" {...rest} /> : <Input {...rest} />}
        </div>
    )
}