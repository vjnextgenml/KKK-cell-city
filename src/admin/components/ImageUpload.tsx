import { ImagePlus, Trash2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { validateImage } from "../validation";
import type { ProductImage } from "../types";

type ImageUploadProps = {
  label: string;
  value: ProductImage | null;
  onChange: (image: ProductImage | null) => void;
};

export default function ImageUpload({ label, value, onChange }: ImageUploadProps) {
  const [error, setError] = useState("");

  function chooseImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const validation = validateImage(file);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setError("");
        onChange({
          src: reader.result,
          fileName: file.name,
          contentType: file.type,
        });
      } else {
        setError("The selected image could not be previewed.");
      }
    };
    reader.onerror = () => setError("The selected image could not be read.");
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-slate-700">{label}</span>
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100">
          {value ? (
            <img src={value.src} alt={`${label} preview`} className="h-full w-full object-contain" />
          ) : (
            <ImagePlus size={22} className="text-slate-400" aria-hidden="true" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
            {value ? "Replace image" : "Choose image"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={chooseImage}
              className="sr-only"
            />
          </label>
          <p className="mt-1 truncate text-xs text-slate-500">
            {value?.fileName ?? "JPG, PNG, WEBP, or GIF · up to 5 MB"}
          </p>
        </div>
        {value && (
          <button
            type="button"
            onClick={() => {
              setError("");
              onChange(null);
            }}
            aria-label={`Remove ${label.toLowerCase()}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      {error && <p role="alert" className="text-xs text-rose-600">{error}</p>}
    </div>
  );
}
