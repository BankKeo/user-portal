import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getStatusBadge(status: string) {
    switch (status) {
        case "Under Review":
            return "bg-amber-100 text-amber-600";
        case "Revision Required":
            return "bg-purple-100 text-purple-600";
        case "Accepted":
            return "bg-green-100 text-green-600";
        case "Rejected":
            return "bg-red-100 text-red-600";
        default:
            return "bg-muted text-muted-foreground";
    }
}
