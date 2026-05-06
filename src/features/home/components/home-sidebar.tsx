import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const discussions = [
    { title: "AI Isn't Stupid. Your Setup Is. 🛠️", comments: 21 },
    { title: "I Love Tailwind. Sorry Not Sorry", comments: 25 },
    {
        title: "Write Code That's Easy to Delete: The Art of Impermanent Software",
        comments: 31,
    },
    {
        title: "OpenAI Tells You What You Spent. Not Where. So I Built a Dashboard.",
        comments: 40,
        active: true,
    },
    {
        title: "5 Levels of AI Code Review — From 'Trust Me Bro' to Production Ready",
        comments: 23,
    },
    { title: "Meme Monday", comments: 12 },
];

const HomeSidebar = () => {
    return (
        <Card className="rounded w-67">
            {/* Header */}
            <CardHeader>
                <CardTitle className="text-lg font-semibold">
                    Active discussions
                </CardTitle>
            </CardHeader>

            {/* List */}
            <CardContent className="p-0">
                <ul className="divide-y">
                    {discussions.map((item, i) => (
                        <li
                            key={i}
                            className="px-5 py-4 hover:bg-muted/40 transition cursor-pointer"
                        >
                            {/* Title */}
                            <p
                                className={`text-sm leading-snug font-medium ${
                                    item.active
                                        ? "text-primary"
                                        : "text-foreground"
                                }`}
                            >
                                {item.title}
                            </p>

                            {/* Comments */}
                            <p className="text-xs text-muted-foreground mt-1">
                                {item.comments} comments
                            </p>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

export default HomeSidebar;
