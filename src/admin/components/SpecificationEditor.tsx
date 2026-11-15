import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { newSpecification } from "../productService";
import type { ProductSpecification } from "../types";

export function appendAdditionalSpecification(
  specifications: ProductSpecification[],
): ProductSpecification[] {
  return [...specifications, newSpecification()];
}

export function removeAdditionalSpecification(
  specifications: ProductSpecification[],
  id: string,
): ProductSpecification[] {
  return specifications.filter((specification) => specification.id !== id);
}

type SpecificationEditorProps = {
  defaultSpecifications: ProductSpecification[];
  additionalSpecifications: ProductSpecification[];
  onChange: (
    defaultSpecifications: ProductSpecification[],
    additionalSpecifications: ProductSpecification[],
  ) => void;
};

function updateSpecification(
  specifications: ProductSpecification[],
  id: string,
  changes: Partial<ProductSpecification>,
) {
  return specifications.map((specification) =>
    specification.id === id ? { ...specification, ...changes } : specification,
  );
}

export default function SpecificationEditor({
  defaultSpecifications,
  additionalSpecifications,
  onChange,
}: SpecificationEditorProps) {
  const duplicateNames = useMemo(() => {
    const seen = new Set<string>();
    const duplicates = new Set<string>();
    [...defaultSpecifications, ...additionalSpecifications].forEach((specification) => {
      const name = specification.name.trim().toLocaleLowerCase();
      if (!name) return;
      if (seen.has(name)) duplicates.add(specification.id);
      seen.add(name);
    });
    return duplicates;
  }, [defaultSpecifications, additionalSpecifications]);

  function handleAddAdditionalSpecification() {
    onChange(
      defaultSpecifications,
      appendAdditionalSpecification(additionalSpecifications),
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Default Specifications</h3>
        <p className="mt-1 text-xs text-slate-500">
          These fields are defined for the selected product type and cannot be removed.
        </p>
      </div>
      <div className="space-y-2">
        {defaultSpecifications.map((specification, index) => (
          <div
            key={specification.id}
            className="grid gap-2 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
          >
            <label
              htmlFor={`default-spec-value-${specification.id}`}
              className="flex items-center rounded-lg bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700"
            >
              {index + 1}. {specification.name}
            </label>
            <input
              id={`default-spec-value-${specification.id}`}
              aria-label={`${specification.name} value`}
              value={specification.value}
              onChange={(event) =>
                onChange(
                  updateSpecification(defaultSpecifications, specification.id, {
                    value: event.target.value,
                  }),
                  additionalSpecifications,
                )
              }
              placeholder="Enter value"
              className="admin-input"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Additional Specifications</h4>
          <p className="mt-1 text-xs text-slate-500">Optional custom name and value fields.</p>
        </div>
        <button
          type="button"
          onClick={handleAddAdditionalSpecification}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          <Plus size={14} /> Add Specification
        </button>
      </div>
      {additionalSpecifications.length ? (
        <div className="space-y-2">
          {additionalSpecifications.map((specification, index) => (
            <div key={specification.id} className="grid gap-2 sm:grid-cols-[1fr_1.4fr_auto]">
              <div>
                <label className="sr-only" htmlFor={`custom-spec-name-${specification.id}`}>
                  Custom specification name {index + 1}
                </label>
                <input
                  id={`custom-spec-name-${specification.id}`}
                  value={specification.name}
                  onChange={(event) =>
                    onChange(
                      defaultSpecifications,
                      updateSpecification(additionalSpecifications, specification.id, {
                        name: event.target.value,
                      }),
                    )
                  }
                  placeholder="Custom specification name"
                  aria-invalid={!specification.name.trim() || duplicateNames.has(specification.id)}
                  className={`admin-input ${
                    !specification.name.trim() || duplicateNames.has(specification.id)
                      ? "border-rose-400"
                      : ""
                  }`}
                />
                {!specification.name.trim() && (
                  <p className="mt-1 text-xs text-rose-600">Enter a specification name.</p>
                )}
                {duplicateNames.has(specification.id) && (
                  <p className="mt-1 text-xs text-rose-600">Specification names must be unique.</p>
                )}
              </div>
              <label className="sr-only" htmlFor={`custom-spec-value-${specification.id}`}>
                Custom specification value {index + 1}
              </label>
              <input
                id={`custom-spec-value-${specification.id}`}
                value={specification.value}
                onChange={(event) =>
                  onChange(
                    defaultSpecifications,
                    updateSpecification(additionalSpecifications, specification.id, {
                      value: event.target.value,
                    }),
                  )
                }
                placeholder="Enter value"
                className="admin-input"
              />
              <button
                type="button"
                onClick={() =>
                  onChange(
                    defaultSpecifications,
                    removeAdditionalSpecification(
                      additionalSpecifications,
                      specification.id,
                    ),
                  )
                }
                aria-label={`Remove additional specification ${index + 1}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-lg bg-slate-50 px-3 py-4 text-sm text-slate-500">
          No additional specifications.
        </p>
      )}
    </section>
  );
}
