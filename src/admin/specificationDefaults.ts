import { accessoryProducts } from "../pages/Pages";
import type {
  AccessoryCategory,
  AccessoryType,
  ProductSpecification,
} from "./types";

export const mobileDefaultSpecificationNames = [
  "Storage (GB)",
  "Colours",
  "Mobile Specifications",
] as const;

const accessoryTypesByCategory: Record<AccessoryCategory, AccessoryType[]> = {
  "Chargers & Data Cables": ["Charger", "Data Cable", "Wireless Charger"],
  "Headphones & Speakers": ["Headphones", "Neckband", "Bluetooth Speaker"],
  "Power Banks": ["Power Bank"],
  "Cases & Screen Guards": ["Mobile Case", "Screen Guard"],
  Smartwatches: ["Smartwatch"],
};

const templateProductIds: Record<AccessoryType, string> = {
  Charger: "dummy-fast-charger",
  "Data Cable": "dummy-cable-kit",
  "Wireless Charger": "dummy-wireless-pad",
  Headphones: "dummy-wireless-headphones",
  Neckband: "dummy-neckband",
  "Bluetooth Speaker": "dummy-mini-speaker",
  "Power Bank": "dummy-power-bank-1",
  "Mobile Case": "dummy-case-1",
  "Screen Guard": "dummy-case-2",
  Smartwatch: "dummy-watch-1",
};

export function getAccessoryTypes(category: string): AccessoryType[] {
  return accessoryTypesByCategory[category as AccessoryCategory] ?? [];
}

export function getDefaultSpecificationNames(
  productType: "mobile" | "accessory",
  category: string,
  accessoryType?: AccessoryType,
): string[] {
  if (productType === "mobile") {
    return [...mobileDefaultSpecificationNames];
  }

  const resolvedType =
    accessoryType ?? getAccessoryTypes(category)[0];
  if (!resolvedType) return [];

  const template = accessoryProducts.find(
    (product) => product.id === templateProductIds[resolvedType],
  );
  return template ? Object.keys(template.specifications) : [];
}

export function getDefaultSpecifications(
  productType: "mobile" | "accessory",
  category: string,
  accessoryType?: AccessoryType,
  existing: ProductSpecification[] = [],
): ProductSpecification[] {
  const existingByName = new Map(
    existing.map((specification) => [specification.name, specification]),
  );
  return getDefaultSpecificationNames(productType, category, accessoryType).map(
    (name) => ({
      id: existingByName.get(name)?.id ?? `default:${name}`,
      name,
      value: existingByName.get(name)?.value ?? "",
      isDefault: true,
    }),
  );
}

export function getAdditionalSpecifications(
  specifications: ProductSpecification[],
  productType: "mobile" | "accessory",
  category: string,
  accessoryType?: AccessoryType,
): ProductSpecification[] {
  const defaultNames = getDefaultSpecificationNames(
    productType,
    category,
    accessoryType,
  );
  return specifications.filter(
    (specification) =>
      specification.isDefault === false ||
      (specification.isDefault !== true &&
        !defaultNames.includes(specification.name)),
  );
}

export function switchAccessorySpecifications(
  specifications: ProductSpecification[],
  currentCategory: string,
  currentType: AccessoryType,
  nextCategory: string,
  nextType: AccessoryType,
): ProductSpecification[] {
  const additional = getAdditionalSpecifications(
    specifications,
    "accessory",
    currentCategory,
    currentType,
  );
  return [
    ...getDefaultSpecifications("accessory", nextCategory, nextType),
    ...additional,
  ];
}

export function getAccessoryTemplateType(
  productId: string,
): AccessoryType | undefined {
  return (
    Object.entries(templateProductIds).find(([, id]) => id === productId)?.[0] as
      | AccessoryType
      | undefined
  );
}
