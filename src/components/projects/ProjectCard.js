import Link from "next/link";
import Image from "next/image";
import StatusPill from "@/components/ui/StatusPill";
import TagPill from "@/components/ui/TagPill";

export default function ProjectCard({ project }) {
  const tags = (project.project_tags ?? [])
    .map((pt) => pt.tags?.name)
    .filter(Boolean);
  const thumbnail = (project.project_images ?? []).slice().sort(
    (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
  )[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-2 border border-border bg-paper p-3 transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-lg"
    >
      {thumbnail && (
        <div className="relative aspect-video w-full overflow-hidden border border-border">
          <Image
            src={thumbnail.url}
            alt={thumbnail.caption || project.title}
            fill
            sizes="(max-width: 640px) 100vw, 512px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5">
        <span className="font-serif text-base font-thin text-muted">
          {project.title}
          <span className="block h-px w-0 bg-ink transition-all duration-300 group-hover:w-full" />
        </span>
        <StatusPill status={project.status} />
      </div>
      {project.tagline && (
        <p className="text-[11px] leading-snug text-muted">
          {project.tagline}
        </p>
      )}
      {(project.origin || project.category?.length || tags.length) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {project.origin && <TagPill name={project.origin} />}
          {project.category?.map((category) => (
            <TagPill key={category} name={category} />
          ))}
          {tags.map((tag) => (
            <TagPill key={tag} name={tag} />
          ))}
        </div>
      )}
    </Link>
  );
}
