"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseCategories(value) {
  if (!value) return null;

  const categories = value
    .split(",")
    .map((category) => category.trim())
    .filter(Boolean);

  return categories.length ? categories : null;
}

function safeFileName(name) {
  const dotIndex = name.lastIndexOf(".");
  const base = dotIndex > -1 ? name.slice(0, dotIndex) : name;
  const ext = dotIndex > -1 ? name.slice(dotIndex + 1).toLowerCase() : "";
  const safeBase = slugify(base) || "image";
  return ext ? `${safeBase}.${ext}` : safeBase;
}

async function uploadProjectImages(supabase, projectId, formData) {
  const files = formData
    .getAll("images")
    .filter((file) => file instanceof File && file.size > 0);

  for (const file of files) {
    const path = `${projectId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;

    const { error: uploadError } = await supabase.storage
      .from("project-media")
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("project-media").getPublicUrl(path);

    const { error: insertError } = await supabase
      .from("project_images")
      .insert({ project_id: projectId, url: publicUrl });

    if (insertError) {
      throw new Error(insertError.message);
    }
  }
}

function projectPayloadFromForm(formData) {
  const title = formData.get("title")?.toString().trim();
  if (!title) {
    throw new Error("Title is required.");
  }

  const slugInput = formData.get("slug")?.toString().trim();
  const slug = slugify(slugInput || title);
  if (!slug) {
    throw new Error("Could not derive a valid slug from the title.");
  }

  return {
    title,
    slug,
    tagline: formData.get("tagline")?.toString().trim() || null,
    description: formData.get("description")?.toString() || null,
    start_date: formData.get("start_date")?.toString() || null,
    end_date:
      formData.get("end_date_present") === "on"
        ? null
        : formData.get("end_date")?.toString() || null,
    status: formData.get("status")?.toString() || null,
    scale: formData.get("scale")?.toString() || null,
    origin: formData.get("origin")?.toString() || null,
    category: parseCategories(formData.get("category")?.toString()),
    is_featured: formData.get("is_featured") === "on",
    sort_order: Number(formData.get("sort_order")) || 0,
  };
}

export async function createProject(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const payload = projectPayloadFromForm(formData);

  const { data: inserted, error } = await supabase
    .from("projects")
    .insert(payload)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }

  await uploadProjectImages(supabase, inserted.id, formData);

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(id, formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const payload = projectPayloadFromForm(formData);

  const { error } = await supabase
    .from("projects")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await uploadProjectImages(supabase, id, formData);

  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProjectImage(projectId, imageId) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { data: image } = await supabase
    .from("project_images")
    .select("url")
    .eq("id", imageId)
    .single();

  const marker = "/project-media/";
  const markerIndex = image?.url?.indexOf(marker) ?? -1;
  if (markerIndex !== -1) {
    const path = image.url.slice(markerIndex + marker.length);
    await supabase.storage.from("project-media").remove([path]);
  }

  const { error } = await supabase
    .from("project_images")
    .delete()
    .eq("id", imageId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/projects/${projectId}/edit`);
}

export async function deleteProject(id) {
  const supabase = await createClient();
  await requireUser(supabase);

  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}
