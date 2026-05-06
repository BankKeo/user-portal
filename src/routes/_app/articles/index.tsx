import ArticlesCard from "@/features/articles/articles-card";
import ArticlesFeedbackCard from "@/features/articles/articles-feedback-card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/articles/")({
    component: RouteComponent,
});

function RouteComponent() {
    const navigate = useNavigate();

    return (
        <div className="flex gap-4">
            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Track Your Submissions</h1>
                <div
                    onClick={() =>
                        navigate({
                            to: "/articles/author/$articleid",
                            params: { articleid: "456789" },
                        })
                    }
                    className="cursor-pointer"
                >
                    <ArticlesCard />
                </div>

                <ArticlesCard />
                <ArticlesCard />
                <ArticlesCard />
            </div>

            <div className="space-y-6">
                <h1 className="text-2xl font-bold">Recent Feedbacks</h1>

                <ArticlesFeedbackCard
                    title="Reviewer 2"
                    time="2 days ago"
                    message={`"The methodology section requires further elaboration regarding the sampling bias adjustment. Specifically, paragraph 3.2 lacks..."`}
                    reference="Re: Syntactic Structures in Early Aramaic..."
                    action="Respond to Comments"
                    highlight
                />

                <ArticlesFeedbackCard
                    title="Editorial Office"
                    time="1 week ago"
                    message={`Your manuscript "Longitudinal Analysis of Benthic..." has been formally approved for publication in Vol 42, Issue 3. Please review the final galleys attached to your dashboard.`}
                    reference="Re: Longitudinal Analysis of Benthic..."
                    action="View Galleys"
                />
            </div>
        </div>
    );
}
