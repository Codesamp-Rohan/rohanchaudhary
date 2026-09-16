import ScrambleText from "./ScrambleText";

export default function TagPill({ name }) {
    return (
        <span className="inline-flex cursor-default font-mono text-[10px] lowercase tracking-wide text-paper before:mr-0.5 before:text-paper/60 px-2 py-0.5 before:content-['#'] bg-accent rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105">
            <ScrambleText text={name} />
        </span>
    );
}
