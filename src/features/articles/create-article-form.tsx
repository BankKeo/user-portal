import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    ArrowRight,
    FileText,
    Tag,
    UploadCloud,
    X,
} from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";

type Author = {
    name: string;
    email: string;
    affiliation: string;
    corresponding: boolean;
};

const CreateArticleForm = () => {
    const navigate = useNavigate();
    const [abstract, setAbstract] = useState("");

    const maxWords = 500;
    const wordCount = abstract.trim() ? abstract.trim().split(/\s+/).length : 0;

    const [authors, setAuthors] = useState<Author[]>([
        {
            name: "Dr. Alexander J. Sterling",
            email: "a.sterling@oxford.ac.uk",
            affiliation:
                "University of Oxford, Department of Environmental Sciences",
            corresponding: true,
        },
    ]);

    const updateAuthor = <K extends keyof Author>(
        index: number,
        field: K,
        value: Author[K],
    ) => {
        const updated = [...authors];
        updated[index] = { ...updated[index], [field]: value } as Author;
        setAuthors(updated);
    };

    const addAuthor = () => {
        setAuthors([
            ...authors,
            { name: "", email: "", affiliation: "", corresponding: false },
        ]);
    };

    const removeAuthor = (index: number) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };

    const setCorresponding = (index: number) => {
        setAuthors(
            authors.map((a, i) => ({
                ...a,
                corresponding: i === index,
            })),
        );
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState(false);

    const handleFile = (file: File) => {
        if (!file) return;

        // basic validation
        const allowed = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword",
        ];

        if (!allowed.includes(file.type)) {
            alert("Invalid file type");
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            alert("Max file size is 50MB");
            return;
        }

        setFile(file);
    };

    const [keywords, setKeywords] = useState([
        "Climate Change",
        "Neural Networks",
        "Data Modeling",
    ]);

    const [input, setInput] = useState("");

    const addKeyword = () => {
        const value = input.trim();
        if (!value || keywords.includes(value)) return;

        setKeywords([...keywords, value]);
        setInput("");
    };

    const removeKeyword = (item: string) => {
        setKeywords(keywords.filter((k) => k !== item));
    };

    return (
        <div className="space-y-6">
            <Card>
                {/* Header */}
                <CardHeader className="flex flex-row items-center gap-2 pb-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Article Details
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-muted-foreground">
                            Manuscript Title
                        </label>

                        <Input
                            placeholder="Enter the full title of your research paper"
                            className="h-10"
                        />
                    </div>

                    {/* Abstract */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-muted-foreground">
                            Abstract
                        </label>

                        <Textarea
                            value={abstract}
                            onChange={(e) => setAbstract(e.target.value)}
                            placeholder="Provide a concise summary of the research (max 500 words)..."
                            className="min-h-35 resize-none"
                        />

                        {/* Word count */}
                        <div className="flex justify-end">
                            <span
                                className={`text-xs ${
                                    wordCount > maxWords
                                        ? "text-red-500"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {wordCount} / {maxWords} words
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                {/* Header */}
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <CardTitle className="text-base font-semibold">
                            Authors & Affiliations
                        </CardTitle>
                    </div>

                    <Button variant="ghost" size="sm" onClick={addAuthor}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add Author
                    </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                    {authors.map((author, i) => (
                        <div
                            key={i}
                            className="border rounded-xl p-4 space-y-4 bg-muted/20"
                        >
                            {/* Top Row */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="space-y-1">
                                    <label className="text-xs uppercase text-muted-foreground">
                                        Full Name
                                    </label>
                                    <Input
                                        value={author.name}
                                        onChange={(e) =>
                                            updateAuthor(
                                                i,
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-1 relative">
                                    <label className="text-xs uppercase text-muted-foreground">
                                        Email Address
                                    </label>

                                    <Input
                                        value={author.email}
                                        onChange={(e) =>
                                            updateAuthor(
                                                i,
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Affiliation */}
                            <div className="space-y-1">
                                <label className="text-xs uppercase text-muted-foreground">
                                    Institutional Affiliation
                                </label>
                                <Input
                                    value={author.affiliation}
                                    onChange={(e) =>
                                        updateAuthor(
                                            i,
                                            "affiliation",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center pt-2">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCorresponding(i)}
                                    >
                                        Set as Corresponding
                                    </Button>
                                </div>

                                {authors.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeAuthor(i)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Add Co-author */}
                    <button
                        onClick={addAuthor}
                        className="w-full border-2 border-dashed rounded-xl py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:bg-muted/30 transition"
                    >
                        <Plus className="w-4 h-4" />
                        Add Co-author
                    </button>
                </CardContent>
            </Card>

            <Card>
                {/* Header */}
                <CardHeader>
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                        <UploadCloud className="w-4 h-4 text-muted-foreground" />
                        Manuscript Upload
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Upload Area */}
                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            handleFile(e.dataTransfer.files[0]);
                        }}
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition
                                ${dragging ? "border-primary bg-primary/5" : "border-muted"}
                            `}
                    >
                        {!file ? (
                            <>
                                <UploadCloud className="mx-auto mb-3 w-8 h-8 text-muted-foreground" />

                                <p className="text-sm font-medium">
                                    Drag and drop your manuscript
                                </p>

                                <p className="text-xs text-muted-foreground mt-1">
                                    PDF, DOCX, or LaTeX files (max 50MB)
                                </p>

                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    Select File
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <div className="text-left">
                                        <p className="text-sm font-medium truncate max-w-50">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {(file.size / 1024 / 1024).toFixed(
                                                2,
                                            )}{" "}
                                            MB
                                        </p>
                                    </div>
                                </div>

                                <button onClick={() => setFile(null)}>
                                    <X className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                                </button>
                            </div>
                        )}

                        <input
                            ref={inputRef}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                                e.target.files && handleFile(e.target.files[0])
                            }
                        />
                    </div>

                    {/* Info */}
                    <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg text-xs text-muted-foreground">
                        <span className="mt-0.5">ℹ️</span>
                        <p>
                            Please ensure all author identification has been
                            removed for double-blind peer review if required by
                            the journal guidelines.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                {/* Header */}
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Keywords & Metadata
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Keywords */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase text-muted-foreground">
                            Keywords
                        </label>

                        <div className="flex items-center flex-wrap gap-2 border rounded-lg p-2">
                            {keywords.map((item) => (
                                <Badge
                                    key={item}
                                    className="flex items-center gap-1 px-3 py-1"
                                >
                                    {item}
                                    <X
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => removeKeyword(item)}
                                    />
                                </Badge>
                            ))}

                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addKeyword();
                                    }

                                    if (e.key === "Backspace" && !input) {
                                        setKeywords((prev) =>
                                            prev.slice(0, -1),
                                        );
                                    }
                                }}
                                placeholder="Type and press Enter..."
                                className="border-none focus-visible:ring-0 h-7 w-40"
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Add 3–5 keywords to help peer reviewers find your
                            work.
                        </p>
                    </div>

                    {/* Metadata */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* DOI */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-muted-foreground">
                                DOI Assignment
                            </label>

                            <Select defaultValue="auto">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="auto">
                                        Automatic (Registry Preferred)
                                    </SelectItem>
                                    <SelectItem value="manual">
                                        Manual Entry
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Subject */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase text-muted-foreground">
                                Subject Area
                            </label>

                            <Select defaultValue="env">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select subject" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="env">
                                        Environmental Sciences
                                    </SelectItem>
                                    <SelectItem value="ai">
                                        Artificial Intelligence
                                    </SelectItem>
                                    <SelectItem value="bio">Biology</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between px-6 py-4 bg-background">
                {/* LEFT */}
                <button
                    onClick={() => navigate({ to: "/dashboard" })}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium tracking-wide">
                        Back to Dashboard
                    </span>
                </button>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-2">
                    {/* Secondary */}
                    <Button variant="outline" className="px-5">
                        Save as Draft
                    </Button>

                    {/* Primary */}
                    <Button className="gap-2 px-5">
                        Next Step
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateArticleForm;
