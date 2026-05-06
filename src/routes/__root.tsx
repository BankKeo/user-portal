import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <TooltipProvider>
                <Outlet />
                <ToastContainer />
            </TooltipProvider>
        </React.Fragment>
    );
}
