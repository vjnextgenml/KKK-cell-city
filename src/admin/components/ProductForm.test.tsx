import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProductForm from "./ProductForm";
import { adminProductService } from "../productService";
import {
  appendAdditionalSpecification,
  removeAdditionalSpecification,
} from "./SpecificationEditor";

describe("admin product specification forms", () => {
  it("shows all mobile defaults and does not render their removal controls", () => {
    const markup = renderToStaticMarkup(
      <ProductForm kind="mobile" onCancel={() => {}} onSave={() => {}} />,
    );

    expect(markup).toContain("Storage (GB)");
    expect(markup).toContain("Colours");
    expect(markup).toContain("Mobile Specifications");
    expect(markup).not.toContain("Remove additional specification");
  });

  it("shows defaults for the selected accessory type without remove controls", () => {
    const markup = renderToStaticMarkup(
      <ProductForm kind="accessory" onCancel={() => {}} onSave={() => {}} />,
    );

    expect(markup).toContain("Charger");
    expect(markup).toContain("Type");
    expect(markup).toContain("Output");
    expect(markup).toContain("Compatibility");
    expect(markup).not.toContain("Remove additional specification");
  });

  it("loads the individual existing product specs and saved values when editing", async () => {
    const product = await adminProductService.getAccessoryById("dummy-power-bank-2");
    expect(product).not.toBeNull();
    if (!product) throw new Error("Expected the seeded power bank to exist.");

    const markup = renderToStaticMarkup(
      <ProductForm
        kind="accessory"
        product={product}
        onCancel={() => {}}
        onSave={() => {}}
      />,
    );

    expect(markup).toContain("Capacity");
    expect(markup).toContain("Output");
    expect(markup).toContain("Weight");
    expect(markup).toContain('value="6000mAh"');
    expect(markup).toContain('value="18W"');
    expect(markup).toContain('value="Lightweight design"');
  });

  it("adds and removes custom specifications without changing the defaults", () => {
    const defaults = [
      { id: "capacity", name: "Capacity", value: "10000mAh", isDefault: true },
      { id: "output", name: "Output", value: "22.5W", isDefault: true },
      { id: "ports", name: "Ports", value: "USB-C + USB-A", isDefault: true },
    ];
    const added = appendAdditionalSpecification([]);
    const removed = removeAdditionalSpecification(added, added[0].id);

    expect(added).toHaveLength(1);
    expect(removed).toEqual([]);
    expect(defaults).toHaveLength(3);
    expect(defaults.every((specification) => specification.isDefault)).toBe(true);
  });
});
