import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Bookmark } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

const HomeArticlesCard = () => {
    const navigate = useNavigate();

    const handleNaviagate = () => {
        navigate({
            to: "/articles/$articleId",
            params: { articleId: "12345" },
        });
    };

    return (
        <Card className="cursor-pointer" onClick={handleNaviagate}>
            <CardContent className="p-6">
                <div className="flex justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                            <p className="text-sm text-muted-foreground">
                                In Towards AI by{" "}
                                <span className="font-medium text-black">
                                    Shreyas Naphad
                                </span>
                            </p>
                        </div>

                        {/* Title */}
                        <h1 className="text-xl font-bold leading-tight mb-3">
                            If You Understand These 5 AI Terms, You’re Ahead of
                            90% of People
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg text-muted-foreground mb-6">
                            Master the core ideas behind AI without getting lost
                        </p>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>⭐ Mar 29</span>
                                <span>👏 16.2K</span>
                                <span>💬 341</span>
                            </div>

                            <div className="flex items-center gap-4 text-muted-foreground">
                                <MessageCircle size={18} />
                                <Bookmark size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="w-65 hidden md:block">
                        <img
                            src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*qbVrf-wO9PYtthAj6E4RYQ.png"
                            alt="thumbnail"
                            className="rounded-md object-cover"
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default HomeArticlesCard;
