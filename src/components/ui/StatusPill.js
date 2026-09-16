const STATUS_LABELS = {
    idea: "idea",
    "in-progress": "in progress",
    shipped: "shipped",
    maintained: "maintained",
    archived: "archived",
};

const STATUS_DOT = {
    idea: "bg-muted",
    "in-progress": "bg-accent",
    shipped: "bg-accent",
    maintained: "bg-ink",
    archived: "bg-muted",
};

const STATUS_TEXT = {
    idea: "text-muted",
    "in-progress": "text-ink font-semibold",
    shipped: "text-ink font-semibold",
    maintained: "text-ink",
    archived: "text-muted",
};

export default function StatusPill({ status }) {
    const label = STATUS_LABELS[status] ?? status;
    const dot = STATUS_DOT[status] ?? "bg-muted";
    const text = STATUS_TEXT[status] ?? "text-muted";
    const isLive = status === "in-progress";

    return (
        <span
            className={`inline-flex items-center gap-1.5 border border-1 px-2 rounded-full font-mono text-[10px] uppercase tracking-wide ${text}`}
        >
            <span className="relative flex h-1 w-1" aria-hidden="true">
                {isLive && (
                    <span
                        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dot}`}
                    />
                )}
                <span className={`relative inline-flex h-1 w-1 rounded-full ${dot}`} />
            </span>
            {label}
        </span>
    );
}
