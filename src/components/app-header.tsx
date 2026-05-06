import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Search, PenSquare, FileText, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "@tanstack/react-router";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const AppHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 border-b bg-white z-50">
            <div className="container p-4 flex items-center justify-between m-auto">
                <div className="flex items-center justify-between gap-4">
                    <div className="px-2 h-10 bg-black text-white flex items-center justify-center font-bold rounded">
                        JESM
                    </div>

                    {/* Search */}
                    <div className="hidden md:flex flex-1 max-w-2xl relative">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />

                        <Input placeholder="Search..." className="pl-9 pr-28" />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Create Post */}
                    <Button
                        variant="outline"
                        onClick={() => navigate({ to: "/articles/create" })}
                    >
                        Create Post
                    </Button>

                    {/* Notification */}
                    <div className="relative">
                        <Bell className="w-5 h-5 text-muted-foreground cursor-pointer" />

                        <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] bg-red-500 text-white flex items-center justify-center rounded-full">
                            1
                        </span>
                    </div>

                    {/* Avatar */}
                    <DropdownMenu>
                        {/* Trigger */}
                        <DropdownMenuTrigger asChild>
                            <Avatar className="w-8 h-8 cursor-pointer">
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        {/* Content */}
                        <DropdownMenuContent
                            align="end"
                            className="w-80 p-4 space-y-4"
                        >
                            {/* Profile */}
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback>B</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium">
                                        Bank Keonakhone
                                    </p>
                                    <p className="text-sm text-muted-foreground cursor-pointer">
                                        View profile
                                    </p>
                                </div>
                            </div>

                            <DropdownMenuSeparator />

                            {/* Settings + Help */}
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate({ to: "/articles/create" })
                                }
                                className="flex gap-3 cursor-pointer focus:bg-transparent hover:bg-transparent"
                            >
                                <PenSquare className="size-5 text-muted-foreground" />
                                <span>Create Post</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => navigate({ to: "/articles" })}
                                className="flex gap-3 cursor-pointer focus:bg-transparent hover:bg-transparent"
                            >
                                <FileText className="size-5 text-muted-foreground" />
                                <span>Stories</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Sign out */}
                            <DropdownMenuItem className="flex gap-3 cursor-pointer focus:bg-transparent hover:bg-transparent">
                                <LogOut className="size-5 text-muted-foreground" />
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
