const CreateArticleHeader = () => {
    return (
        <div className="space-y-2">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Submit New Article
            </h1>

            {/* Description */}
            <p className="text-sm text-muted-foreground max-w-xl">
                Ensure all fields are accurate. You can save your progress at
                any time.
            </p>
        </div>
    );
};

export default CreateArticleHeader;
