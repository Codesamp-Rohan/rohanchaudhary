import ProjectCard from "@/components/projects/ProjectCard";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*, project_tags(tags(name)), project_images(*)")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 py-6">
      <h1>Projects</h1>
      <p className="max-w-lg text-muted">
        Everything I&apos;ve shipped, in progress, or shelved — with full
        traceability back to day one.
      </p>
      {projects?.length ? (
        <div className="flex max-w-lg flex-col gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-muted">No projects logged yet.</p>
      )}
    </div>
  );
}
