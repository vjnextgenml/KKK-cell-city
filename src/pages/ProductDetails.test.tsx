import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProductDetails from "./ProductDetails";

describe("product details page", () => {
  it("renders the mobile name, details sections, and three image controls", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/product/samsung-galaxy-s24"]}>
        <Routes>
          <Route
            path="/product/:productId"
            element={<ProductDetails cartCount={0} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(markup).toContain(">Samsung Galaxy S24</h1>");
    expect(markup).toContain("Storage (GB)");
    expect(markup).toContain("Colours");
    expect(markup).toContain("Mobile Specifications");
    expect(markup.match(/aria-pressed=/g)).toHaveLength(3);
    expect(markup).toContain("You May Also Like");
    expect(markup.match(/aria-label="View details for [^"]+"/g)).toHaveLength(5);
  });

  it("renders accessory image, name, price, and specifications", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/product/dummy-fast-charger"]}>
        <Routes>
          <Route
            path="/product/:productId"
            element={<ProductDetails cartCount={0} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(markup).toContain('src="/images/category-chargers-cables.jpg"');
    expect(markup).toContain(">Fast Charger Pro</h1>");
    expect(markup).toContain("₹1,499");
    expect(markup).toContain("USB-C fast charger");
    expect(markup).toContain("20W");
  });
});
