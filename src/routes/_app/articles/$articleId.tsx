import Article from "@/features/articles/article";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/articles/$articleId")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <Article />
        </div>
    );
}
