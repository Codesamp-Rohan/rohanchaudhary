import ScrambleText from "@/components/ui/ScrambleText";
import Reveal from "@/components/ui/Reveal";
import Divider from "@/components/ui/Divider";
import Button from "@/components/ui/Button";
import TagPill from "@/components/ui/TagPill";

const PRINCIPLES = [
  {
    title: "Own it end to end",
    body: "I design it, build it, and ship it myself. No handoffs, no lost-in-translation between the person who imagined it and the person who built it.",
  },
  {
    title: "Ship, then refine",
    body: "Working software beats a perfect plan. I get something real in front of people, then iterate based on what actually breaks or matters.",
  },
  {
    title: "Learn by building",
    body: "The fastest way to understand a new tool or framework is to start a project with it. I don't wait until I feel ready — readiness comes from doing.",
  },
  {
    title: "Traceability over tidiness",
    body: "Every project I've touched — shipped, shelved, or still in progress — stays logged. I'd rather have an honest record than a curated highlight reel.",
  },
];

export const metadata = {
  title: "About — Rohan Chaudhary",
  description:
    "Designer and developer who owns projects end to end, from first sketch to shipped product.",
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 pt-12 pb-6">
      <div className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="About" />
        </h1>
        <div className="flex max-w-lg flex-col gap-4 text-[11px] leading-snug text-muted">
          <p>
            I&apos;m Rohan — a designer and developer who ended up doing both
            because I got tired of watching good ideas get flattened by the
            handoff between them. Somewhere along the way that became the
            whole point: I sit in the gap most people split into two jobs,
            and I like it there.
          </p>
          <p>
            This site is my shipyard. Not a highlight reel of the polished
            stuff — an actual log. Small boats and flagships, live projects
            and abandoned ones, all traceable back to day one. If you want to
            see how something actually got built, not just the finished
            screenshot, this is where that lives.
          </p>
          <p>
            Right now that means working full-time as a GET on the project
            team at Secure Meters, and taking on freelance design and
            development work on the side — same approach either way:
            sketch it, build it, ship it, and stay with it until it feels
            right.
          </p>
        </div>
      </div>

      <Divider />

      <Reveal className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="How I work" />
        </h1>
        <div className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <div
              key={principle.title}
              className="flex flex-col gap-2 border border-border bg-paper p-3"
            >
              <span className="font-mono text-[10px] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold text-ink">
                {principle.title}
              </span>
              <p className="text-[11px] leading-snug text-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>

      <Divider />

      <Reveal className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="Toolbox" />
        </h1>
        <p className="max-w-lg text-muted">
          What I reach for most, roughly in order of how often it shows up
          in a project.
        </p>
        <div className="flex max-w-lg flex-wrap gap-x-4 gap-y-2">
          {[
            "Next.js",
            "React",
            "Node.js",
            "MERN",
            "JavaScript",
            "Tailwind CSS",
            "React Native",
            "Figma",
            "Framer",
            "Shopify",
          ].map((skill) => (
            <TagPill key={skill} name={skill} />
          ))}
        </div>
      </Reveal>

      <Divider />

      <Reveal className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="Let's talk" />
        </h1>
        <p className="max-w-lg text-muted">
          Freelance work, a full-time role, or just want to talk shop about
          something you&apos;re building — I read every email myself.
        </p>
        <Button href="mailto:rohan.design@icloud.com" className="w-fit rounded-none">
          Say hello →
        </Button>
      </Reveal>
    </div>
  );
}
