import type { ProductDraft } from "./types";
import {
  getAdditionalSpecifications,
  getDefaultSpecificationNames,
} from "./specificationDefaults";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export type ImageValidationResult =
  | { valid: true }
  | { valid: false; message: string };

export function validateImage(file: File): ImageValidationResult {
  if (!allowedImageTypes.has(file.type)) {
    return {
      valid: false,
      message: "Choose a JPG, PNG, WEBP, or GIF image.",
    };
  }
  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      message: "Images must be 5 MB or smaller.",
    };
  }
  return { valid: true };
}

export function validateProduct(draft: ProductDraft): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!draft.name.trim()) errors.name = "Enter a product name.";
  if (!draft.brand.trim()) errors.brand = "Enter a brand.";
  if (!draft.category.trim()) errors.category = "Choose a category.";
  if (!Number.isFinite(draft.price) || draft.price <= 0) {
    errors.price = "Enter a price greater than zero.";
  }
  if (
    draft.offer.originalPrice !== undefined &&
    (!Number.isFinite(draft.offer.originalPrice) || draft.offer.originalPrice <= 0)
  ) {
    errors.originalPrice = "Original price must be greater than zero.";
  }
  if (
    draft.offer.enabled &&
    draft.offer.originalPrice !== undefined &&
    draft.price > draft.offer.originalPrice
  ) {
    errors.originalPrice = "Offer price cannot be greater than the original price.";
  }
  if (draft.offer.enabled && draft.offer.originalPrice === undefined) {
    errors.originalPrice = "Enter an original price to enable an offer.";
  }

  const currentDefaultSpecifications = draft.specifications.filter(
    (specification) => specification.isDefault === true,
  );
  const defaultNames = currentDefaultSpecifications.length
    ? currentDefaultSpecifications.map(({ name }) => name)
    : getDefaultSpecificationNames(
        draft.productType,
        draft.category,
        draft.productType === "accessory" ? draft.accessoryType : undefined,
      );
  const defaultNameSet = new Set(defaultNames.map((name) => name.toLocaleLowerCase()));
  const additionalSpecifications = getAdditionalSpecifications(
    draft.specifications,
    draft.productType,
    draft.category,
    draft.productType === "accessory" ? draft.accessoryType : undefined,
  );
  const specificationNames = new Set(defaultNameSet);
  additionalSpecifications.forEach((specification) => {
    const name = specification.name.trim().toLocaleLowerCase();
    if (!name) {
      errors[`specification-${specification.id}`] =
        "Additional specification names cannot be empty.";
    } else if (specificationNames.has(name)) {
      errors[`specification-${specification.id}`] =
        "Specification names must be unique.";
    } else {
      specificationNames.add(name);
    }
  });
  return errors;
}
