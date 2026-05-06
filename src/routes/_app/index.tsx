import HomeActiveDiscussion from "@/features/home/components/home-active-discussion";
import HomeArticlesCard from "@/features/home/components/home-articles-card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    const handleNaviagate = () => {
        navigate({
            to: "/articles/$articleId",
            params: { articleId: "12345" },
        });
    };

    return (
        <div className="flex gap-4">
            <div className="space-y-6">
                <div onClick={handleNaviagate}>
                    <HomeArticlesCard />
                </div>

                <HomeArticlesCard />
                <HomeArticlesCard />
                <HomeArticlesCard />
            </div>

            <div>
                <HomeActiveDiscussion />
            </div>
        </div>
    );
}
