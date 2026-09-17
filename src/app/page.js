import TagPill from "@/components/ui/TagPill";
import ScrambleText from "@/components/ui/ScrambleText";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/projects/ProjectCard";
import { createClient } from "@/lib/supabase/server";
import Divider from "@/components/ui/Divider";

const EXPERIENCE = [
  {
    company: "Secure Meters",
    title: "GET",
    dates: "5 Jan 2026 — Present",
    description:
      "In the Project team, working on and developing production-level software.",
  },
  {
    company: "Freelance",
    title: "Designer & Developer",
    dates: "2022 — Present",
    description:
      "No handoffs, no relay race — I sketch it, build it, and ship it myself.",
  },
];

const SKILLS = [
  "MERN",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "JavaScript",
  "React-Native",
  "Figma",
  "Framer",
  "Shopify",
  "C#",
  "Java"
];

const SERVICES = [
  "Software Development",
  "Mobile design and development",
  "Web design and development",
  "Full-stack development",
  "Desktop Application Development",
  "Shopify stores",
  "Prototyping",
];

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredProjects } = await supabase
    .from("projects")
    .select("*, project_tags(tags(name)), project_images(*)")
    .eq("is_featured", true)
    .order("sort_order", { ascending: true });

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 pt-12 pb-6">
      <div className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="Hi, I'm Rohan" />
        </h1>
        <div className="flex flex-col gap-1 text-muted [&>p]:text-[11px] [&>p]:leading-snug">
          <p className="!font-[500]">Docked here, but never idle.</p>
          <p className="text-justify">I build things. Then I build them again, better.</p>
          <p className="text-justify">
            Call it stubbornness or call it craft — once I start something, I
            finish it. Late nights, broken builds, designs that look wrong
            until suddenly they don&apos;t — I stay with it until it works, and then until it feels right.
          </p>
          <p className="text-justify">
            New tools don&apos;t scare me. Give me an unfamiliar framework on a
            Monday, I&apos;ll have something running by Wednesday. I&apos;ve
            learned that the fastest way to actually understand something is
            to just start building with it — so that&apos;s what I do, every
            time.
          </p>
          <p className="text-justify">
            I sit in the gap most people split into two jobs: I write the
            code, and I shape how it looks and feels. No handoffs, no
            lost-in-translation. What you see is what I imagined, built by the
            same hands.
          </p>
          <p className="text-justify">
            This place is my shipyard — every project I&apos;ve ever launched,
            half-finished, sunk, or sailing, logged in one spot. Small boats
            and flagships alike. Traceable, all the way back to day one.
          </p>
        </div>
        <Button href="mailto:rohan.design@icloud.com" className="w-fit rounded-none">
          Let&apos;s talk →
        </Button>
      </div>
      <Divider />
      <Reveal className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="Experience" />
        </h1>
        <div className="relative flex flex-col gap-6 pl-5">
          <div
            className="absolute top-1 bottom-1 left-1 bg-border"
            aria-hidden="true"
          />
          {EXPERIENCE.map((role) => (
            <div
              key={`${role.company}-${role.title}`}
              className="relative flex flex-col gap-1"
            >
              <span
                className="absolute top-1 -left-4 h-2 w-2 rounded-full bg-accent ring-4 ring-paper"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                <p className="text-sm font-semibold text-ink">
                  {role.title} · {role.company}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
                  {role.dates}
                </span>
              </div>
              <p className="text-[11px] leading-snug text-muted">
                {role.description}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
      <Divider />
      <Reveal className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="Skills" />
        </h1>
        <div className="flex max-w-lg flex-wrap gap-x-4 gap-y-2">
          {SKILLS.map((skill) => (
            <TagPill key={skill} name={skill} />
          ))}
        </div>
      </Reveal>
      <Divider />
      <Reveal className="flex flex-col gap-6">
        <h1>
          <ScrambleText text="Things I can build" />
        </h1>
        <div className="grid max-w-lg grid-cols-2 gap-3">
          {SERVICES.map((service, index) => (
            <div
              key={service}
              className="group relative flex min-h-[92px] flex-col justify-between gap-3 border border-border bg-paper p-3 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lg overflow-hidden"
            >
              <span className="absolute w-6 h-6 -top-6 -right-6 transition-all duration-300 group-hover:top-0 group-hover:right-0 bg-black"></span>
              <span className="font-mono text-[10px] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-semibold leading-snug text-ink">
                {service}
                <span className="block h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
              </span>
            </div>
          ))}
        </div>
      </Reveal>
      <Divider />
      <Reveal className="flex flex-col gap-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-6 w-full">
            <ScrambleText text="Featured projects" />
          </div>
          <Button href="/projects" className="whitespace-nowrap rounded-none">See All</Button>
        </div>
        <p className="max-w-lg text-muted">
          Full traceability for everything I&apos;ve shipped — status,
          timeline, and update logs, not just a static list.
        </p>
        {featuredProjects?.length ? (
          <div className="grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-muted">
            No featured projects yet — check back soon.
          </p>
        )}
      </Reveal>
    </div>
  );
}
