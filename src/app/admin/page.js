import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { deleteProject } from "./actions";
import StatusPill from "@/components/ui/StatusPill";
import Button from "@/components/ui/Button";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Admin</h1>
        <form action={signOut}>
          <button type="submit" className="text-sm text-muted hover:text-ink">
            Sign out
          </button>
        </form>
      </div>

      <Button href="/admin/projects/new" className="w-fit rounded-none">
        New project
      </Button>

      {error && <p className="text-sm text-red-600">{error.message}</p>}

      <ul className="flex flex-col divide-y divide-border rounded border border-border bg-paper">
        {projects?.length ? (
          projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">{project.title}</span>
                <span className="font-mono text-xs text-muted">
                  {project.slug}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill status={project.status} />
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-sm text-muted hover:text-ink"
                >
                  Edit
                </Link>
                <form action={deleteProject.bind(null, project.id)}>
                  <button
                    type="submit"
                    className="text-sm text-muted hover:text-ink"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-6 text-sm text-muted">No projects yet.</li>
        )}
      </ul>
    </div>
  );
}
