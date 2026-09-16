import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "../../actions";

export default function NewProjectPage() {
  return (
    <div className="flex w-full flex-1 flex-col gap-6 px-6 py-12">
      <h1 className="text-lg font-semibold">New project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
