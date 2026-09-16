import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "../../../actions";

export default async function EditProjectPage({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_images(*)")
    .eq("id", id)
    .single();

  if (!project) {
    notFound();
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-lg font-semibold">Edit project</h1>
      <ProjectForm action={updateProject.bind(null, id)} project={project} />
    </div>
  );
}
