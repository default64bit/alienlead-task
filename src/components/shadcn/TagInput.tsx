import * as React from "react";

import { cn } from "@/lib/utils";
import { TbX } from "react-icons/tb";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    tags: Set<string>;
    setTags: React.Dispatch<Set<string>>;
}

const TagInput = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, tags, setTags, ...props }, ref) => {
    const input = React.useRef<HTMLInputElement>(null);

    const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Tab" && e.key !== "Enter") return;
        if (e.currentTarget.value === "") return;
        tags.add(e.currentTarget.value);
        setTags(new Set(tags));
        if (input.current) input.current.value = "";
        e.preventDefault();
    };

    const removeTag = (tag: string) => {
        tags.delete(tag);
        setTags(new Set(tags));
    };

    return (
        <div
            className={cn(
                "flex flex-wrap items-center gap-2 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            onClick={() => input.current?.focus()}
            onFocus={() => input.current?.focus()}
        >
            {Array.from(tags).map((tag, i) => (
                <div className="flex items-center gap-0.5 px-2 rounded-md bg-secondary" key={i}>
                    <span className="">{tag}</span>
                    <TbX size=".9rem" onClick={() => removeTag(tag)} />
                </div>
            ))}
            <input className="outline-none" type={type} ref={input} onKeyDown={addTag} {...props} />
        </div>
    );
});
TagInput.displayName = "TagInput";

export { TagInput };
