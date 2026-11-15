import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProductTable from "./ProductTable";

describe("admin product table filters", () => {
  it("omits the redundant category filter for mobile phones", () => {
    const markup = renderToStaticMarkup(
      <ProductTable
        kind="mobile"
        products={[]}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(markup).not.toContain("Filter by category");
    expect(markup).not.toContain("All categories");
  });

  it("keeps the category filter for accessories", () => {
    const markup = renderToStaticMarkup(
      <ProductTable
        kind="accessory"
        products={[]}
        onAdd={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />,
    );

    expect(markup).toContain("Filter by category");
    expect(markup).toContain("All categories");
  });
});
