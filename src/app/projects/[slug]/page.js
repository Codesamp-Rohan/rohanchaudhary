import { notFound } from "next/navigation";
import StatusPill from "@/components/ui/StatusPill";
import TagPill from "@/components/ui/TagPill";
import Button from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";

const LINK_LABELS = {
  repo: "Repo",
  live: "Live",
  "demo-video": "Demo",
  writeup: "Write-up",
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select(
      "*, project_tags(tags(name)), project_links(*), project_images(*), project_updates(*)"
    )
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  const tags = (project.project_tags ?? [])
    .map((pt) => pt.tags?.name)
    .filter(Boolean);
  const links = (project.project_links ?? []).slice();
  const images = (project.project_images ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  const updates = (project.project_updates ?? [])
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 py-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h1>{project.title}</h1>
          <StatusPill status={project.status} />
        </div>
        {project.tagline && (
          <p className="max-w-lg text-muted">{project.tagline}</p>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {project.scale && <TagPill name={project.scale} />}
          {project.origin && <TagPill name={project.origin} />}
          {project.category?.map((category) => (
            <TagPill key={category} name={category} />
          ))}
          {tags.map((tag) => (
            <TagPill key={tag} name={tag} />
          ))}
        </div>
      </div>

      {project.description && (
        <p className="max-w-lg whitespace-pre-wrap text-[11px] leading-snug text-muted">
          {project.description}
        </p>
      )}

      {links.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {links.map((link) => (
            <Button
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label || LINK_LABELS[link.type] || link.type}
            </Button>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="grid max-w-lg grid-cols-2 gap-2">
          {images.map((image) => (
            <div
              key={image.id}
              className="group w-full overflow-hidden border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.caption || project.title}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      )}

      {updates.length > 0 && (
        <div className="flex max-w-lg flex-col gap-1 border border-border bg-ink/[0.03] p-3 font-mono text-[11px]">
          {updates.map((update) => (
            <div key={update.id} className="flex gap-2 text-muted">
              <span className="text-ink/50">
                [{new Date(update.created_at).toISOString().slice(0, 16).replace("T", " ")}]
              </span>
              <span>{update.body}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
