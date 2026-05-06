import AppHeader from "@/components/app-header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex flex-1 flex-col">
            {/* Header */}
            <AppHeader />

            {/* Content */}
            <main className="container p-4 m-auto flex-1">
                <Outlet />
            </main>
        </div>
    );
}
