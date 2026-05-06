import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Bookmark } from "lucide-react";
const HomeArticles = () => {
    return (
        <div className="flex-1 space-y-6">
            <Card className="rounded overflow-hidden py-0 cursor-pointer">
                {/* Cover Image */}
                <div className="w-full h-65 overflow-hidden">
                    <img
                        src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fjygg7a2fjhm97fss0gzj.png"
                        alt="cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                <CardContent className="p-6 space-y-4">
                    {/* Tag pill */}
                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-muted text-sm">
                            Designing for reversibility via modularity
                        </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                            <AvatarImage src="/avatar.jpg" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="text-sm font-medium">
                                Adam – The Developer
                            </p>
                            <p className="text-xs text-muted-foreground">
                                May 2 (2 days ago)
                            </p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                        Write Code That's Easy to Delete: The Art of Impermanent
                        Software
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span>#programming</span>
                        <span>#webdev</span>
                        <span>#productivity</span>
                        <span>#architecture</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3">
                        {/* Left */}
                        <div className="flex items-center gap-5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                ❤️ 🎉 🔥
                                <span>53 Reactions</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                31 Comments
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>5 min read</span>
                            <Bookmark className="w-4 h-4 cursor-pointer" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded overflow-hidden py-0 cursor-pointer">
                {/* Cover Image */}
                <div className="w-full h-65 overflow-hidden">
                    <img
                        src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fli5mqjfv32ln8lmmjh5f.png"
                        alt="cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                <CardContent className="p-6 space-y-4">
                    {/* Tag pill */}
                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-muted text-sm">
                            Designing for reversibility via modularity
                        </span>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                            <AvatarImage src="/avatar.jpg" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="text-sm font-medium">
                                Adam – The Developer
                            </p>
                            <p className="text-xs text-muted-foreground">
                                May 2 (2 days ago)
                            </p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                        Write Code That's Easy to Delete: The Art of Impermanent
                        Software
                    </h2>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span>#programming</span>
                        <span>#webdev</span>
                        <span>#productivity</span>
                        <span>#architecture</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3">
                        {/* Left */}
                        <div className="flex items-center gap-5 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                ❤️ 🎉 🔥
                                <span>53 Reactions</span>
                            </div>

                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                31 Comments
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>5 min read</span>
                            <Bookmark className="w-4 h-4 cursor-pointer" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HomeArticles;
