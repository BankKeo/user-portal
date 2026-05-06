import ArticleReviewerFeedback from "@/features/articles/article-reviewer-feedback";
import UpdateArticleForm from "@/features/articles/update-article-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/articles/author/$articleid")({
    component: RouteComponent,
});

type Feedback = {
    reviewer: string;
    label: string;
    comment: string;
};

const feedbacks: Feedback[] = [
    {
        reviewer: "Reviewer 1",
        label: "Major Revisions",
        comment:
            "The methodology section lacks detail regarding the sample size justification for the control group. Please expand on the selection criteria and potential biases introduced during the initial screening phase. Additionally, the literature review misses recent 2025 publications on generative models in peer review.",
    },
    {
        reviewer: "Reviewer 2",
        label: "Minor Revisions",
        comment:
            "Overall a strong paper. Figure 3 is somewhat unclear; please improve the contrast and ensure all axes are properly labeled. The conclusion could be strengthened by explicitly linking the findings back to the initial hypothesis presented in the introduction.",
    },
];

function RouteComponent() {
    return (
        <div>
            <UpdateArticleForm />

            <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                Reviewer Feedback
            </h2>

            <div className="space-y-5">
                {feedbacks.map((item, i) => (
                    <ArticleReviewerFeedback key={i} {...item} />
                ))}
            </div>
        </div>
    );
}
