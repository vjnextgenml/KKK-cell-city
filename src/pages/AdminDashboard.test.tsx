import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

describe("admin dashboard", () => {
  it("renders a standalone admin shell without the public navigation", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>,
    );

    expect(markup).toContain("Admin workspace");
    expect(markup).toContain("Manage Mobile Phones");
    expect(markup).not.toContain("Manage Accessories");
    expect(markup).toContain("Back to Website");
    expect(markup).toContain("frontend demo login is not security");
    expect(markup).not.toContain('aria-label="Main navigation"');
  });
});
