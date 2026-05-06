import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ArticleReviewerFeedback = ({
    reviewer,
    label,
    comment,
}: {
    reviewer: string;
    label: string;
    comment: string;
}) => {
    const isMajor = label === "Major Revisions";

    return (
        <Card>
            <CardContent className="p-5 space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700">
                        {reviewer}
                    </span>

                    <Badge
                        variant="secondary"
                        className={`text-xs ${
                            isMajor
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                        {label}
                    </Badge>
                </div>

                {/* Content */}
                <p className="text-[15px] leading-relaxed text-slate-700">
                    {comment}
                </p>
            </CardContent>
        </Card>
    );
};

export default ArticleReviewerFeedback;
