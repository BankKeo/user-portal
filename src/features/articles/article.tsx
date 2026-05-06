import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
    MessageCircle,
    BookmarkPlus,
    Play,
    Share,
    MoreHorizontal,
    Hand,
} from "lucide-react";

const Article = () => {
    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            {/* Title */}
            <h1 className="text-5xl font-bold leading-tight tracking-tight">
                Twilio In-App Calling with Flutter: A Complete Guide
            </h1>

            {/* Author Row */}
            <div className="flex items-center gap-4 mt-6">
                <Avatar className="w-10 h-10">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium">Umairliaqat</span>

                    <Button
                        variant="outline"
                        className="rounded-full px-4 py-1 h-auto text-sm"
                    >
                        Follow
                    </Button>

                    <span className="text-muted-foreground text-sm">
                        6 min read · May 1, 2025
                    </span>
                </div>
            </div>

            {/* Divider */}
            <Separator className="my-6" />

            {/* Actions Row */}
            <div className="flex items-center justify-between text-muted-foreground">
                {/* Left */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Hand size={18} />
                        <span>9</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MessageCircle size={18} />
                        <span>2</span>
                    </div>
                </div>

                {/* Right */}
                <div className="flex items-center gap-5">
                    <BookmarkPlus size={18} />
                    <Play size={18} />
                    <Share size={18} />
                    <MoreHorizontal size={18} />
                </div>
            </div>

            <Separator className="my-6" />

            {/* Article Content */}
            <article className="prose prose-lg max-w-none text-[20px] leading-8">
                <p>
                    In today’s digital ecosystem, real-time communication is a
                    core feature of many apps — whether it’s customer support,
                    consultation, or collaboration.
                </p>

                <p>
                    For our application, we needed a seamless and secure way to
                    enable voice calling between users without relying on
                    external dialers or native phone UIs. Twilio stood out as a
                    reliable platform to power VoIP functionality, and
                    integrating it directly within our Flutter app allowed us to
                    offer a consistent, in-app experience across devices —
                    complete with custom call screens and push notifications via
                    Firebase.
                </p>

                {/* Paragraph */}
                <p className="text-[22px] leading-[1.8] text-gray-800 mb-8 font-serif">
                    Integrating voice calling inside your Flutter app using
                    Twilio can feel overwhelming — from managing Firebase push
                    notifications to handling call states across platforms. In
                    this article, we’ll walk through setting up Twilio Voice
                    with Firebase Cloud Messaging (FCM) and building a custom
                    calling experience in Flutter — no native UI needed!
                </p>

                {/* Section Title */}
                <h2 className="text-3xl font-semibold mt-12 mb-6 font-serif">
                    What do we need?
                </h2>

                {/* List */}
                <ul className="space-y-6 text-[22px] leading-[1.8] font-serif text-gray-800">
                    <li className="flex items-start gap-4">
                        <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                        <span>A Firebase project</span>
                    </li>

                    <li className="flex items-start gap-4">
                        <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                        <span>A Twilio console</span>
                    </li>

                    <li className="flex items-start gap-4">
                        <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                        <span>
                            A local server (will be used to push call from
                            twilio to our app)
                        </span>
                    </li>

                    <li className="flex items-start gap-4">
                        <span className="mt-2 h-2 w-2 rounded-full bg-black" />
                        <span>A Flutter project set up</span>
                    </li>
                </ul>
            </article>
        </div>
    );
};

export default Article;
