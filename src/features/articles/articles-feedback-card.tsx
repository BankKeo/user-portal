import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type NotificationCardProps = {
    title: string;
    time: string;
    message: string;
    reference: string;
    action: string;
    highlight?: boolean;
};

const ArticlesFeedbackCard = ({
    title,
    time,
    message,
    reference,
    action,
    highlight = false,
}: NotificationCardProps) => {
    return (
        <Card
            className={`py-0 rounded-xl border w-87.5 hidden md:block ${
                highlight ? "border-l-4 border-l-blue-500" : ""
            }`}
        >
            <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-base">{title}</h3>
                    <span className="text-sm text-muted-foreground">
                        {time}
                    </span>
                </div>

                {/* Message */}
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                    {message}
                </p>

                <Separator />

                {/* Footer */}
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{reference}</p>
                    <button className="text-sm font-medium text-blue-600 hover:underline">
                        {action}
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ArticlesFeedbackCard;
