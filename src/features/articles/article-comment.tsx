import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type CommentProps = {
    name: string;
    time: string;
    content: string;
    featured?: boolean;
};

const ArticleComment = ({ name, time, content }: CommentProps) => {
    return (
        <div className="flex gap-4">
            {/* Avatar */}
            <div className="relative">
                <Avatar className="w-10 h-10">
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
            </div>

            {/* Content */}
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                </div>

                {/* Text */}
                <p className="mt-3 text-[15px] leading-relaxed">{content}</p>
            </div>
        </div>
    );
};

export default ArticleComment;
