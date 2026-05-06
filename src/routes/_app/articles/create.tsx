import CreateArticleForm from "@/features/articles/create-article-form";
import CreateArticleHeader from "@/features/articles/create-article-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/articles/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex flex-col gap-6">
            <CreateArticleHeader />
            <CreateArticleForm />
        </div>
    );
}
