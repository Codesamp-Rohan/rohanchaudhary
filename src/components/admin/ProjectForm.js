"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { compressImage } from "@/lib/compressImage";
import { deleteProjectImage } from "@/app/admin/actions";

const STATUS_OPTIONS = [
  "idea",
  "in-progress",
  "shipped",
  "maintained",
  "archived",
];

const SCALE_OPTIONS = ["micro", "small", "medium", "flagship"];

const ORIGIN_OPTIONS = ["company", "freelance", "personal"];

const inputClass =
  "rounded border border-border bg-transparent px-3 py-2 text-sm outline-none focus:border-ink";

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-muted">{label}</span>
      {children}
    </label>
  );
}

export default function ProjectForm({ action, project }) {
  const [compressing, setCompressing] = useState(false);

  async function handleImagesChange(event) {
    const input = event.target;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;

    setCompressing(true);
    try {
      const compressed = await Promise.all(files.map(compressImage));
      const dataTransfer = new DataTransfer();
      compressed.forEach((file) => dataTransfer.items.add(file));
      input.files = dataTransfer.files;
    } finally {
      setCompressing(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 pb-20">
      {project?.project_images?.length > 0 && (
        <Field label="Existing images">
          <div className="grid grid-cols-4 gap-2">
            {project.project_images.map((image) => (
              <div key={image.id} className="flex flex-col gap-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.caption || ""}
                  className="aspect-square w-full rounded border border-border object-cover"
                />
                <form
                  action={deleteProjectImage.bind(null, project.id, image.id)}
                >
                  <button
                    type="submit"
                    className="text-[10px] text-muted underline hover:text-ink"
                  >
                    Remove
                  </button>
                </form>
              </div>
            ))}
          </div>
        </Field>
      )}

      <form id="project-form" action={action} className="flex flex-col gap-4">
      <Field label="Title">
        <input
          name="title"
          required
          defaultValue={project?.title}
          className={inputClass}
        />
      </Field>

      <Field label="Slug (optional — derived from title if blank)">
        <input
          name="slug"
          defaultValue={project?.slug}
          className={inputClass}
        />
      </Field>

      <Field label="Tagline">
        <input
          name="tagline"
          defaultValue={project?.tagline ?? ""}
          className={inputClass}
        />
      </Field>

      <Field label="Description (markdown)">
        <textarea
          name="description"
          rows={6}
          defaultValue={project?.description ?? ""}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start date">
          <input
            type="date"
            name="start_date"
            defaultValue={project?.start_date ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="End date">
          <input
            type="date"
            name="end_date"
            defaultValue={project?.end_date ?? ""}
            className={inputClass}
          />
          <label className="flex items-center gap-2 pt-1 text-xs text-muted">
            <input
              type="checkbox"
              name="end_date_present"
              defaultChecked={Boolean(project && !project.end_date)}
            />
            Present (ongoing)
          </label>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Status">
          <select
            name="status"
            defaultValue={project?.status ?? ""}
            className={inputClass}
          >
            <option value="">—</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Scale">
          <select
            name="scale"
            defaultValue={project?.scale ?? ""}
            className={inputClass}
          >
            <option value="">—</option>
            {SCALE_OPTIONS.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Origin">
          <select
            name="origin"
            defaultValue={project?.origin ?? ""}
            className={inputClass}
          >
            <option value="">—</option>
            {ORIGIN_OPTIONS.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Categories (comma-separated, e.g. web app, ai)">
        <input
          name="category"
          defaultValue={project?.category?.join(", ") ?? ""}
          className={inputClass}
        />
      </Field>

      <div className="grid grid-cols-2 items-end gap-4">
        <Field label="Sort order">
          <input
            type="number"
            name="sort_order"
            defaultValue={project?.sort_order ?? 0}
            className={inputClass}
          />
        </Field>
        <label className="flex items-center gap-2 pb-2 text-sm">
          <input
            type="checkbox"
            name="is_featured"
            defaultChecked={project?.is_featured ?? false}
          />
          Featured
        </label>
      </div>

      <Field label="Add images">
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImagesChange}
          className={inputClass}
        />
        <span className="pt-1 text-xs text-muted">
          {compressing
            ? "Compressing…"
            : "New images are compressed to WebP before upload."}
        </span>
      </Field>

      </form>

      <div className="fixed inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-xl items-center justify-between gap-3 border-t border-border bg-paper px-6 py-3">
        <Button href="/admin" variant="outline">
          Cancel
        </Button>
        <Button type="submit" form="project-form" disabled={compressing}>
          {compressing ? "Compressing…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
