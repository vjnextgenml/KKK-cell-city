import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AdminLogin from "./AdminLogin";

describe("admin login page", () => {
  it("renders a separate login form and warns that frontend credentials are not secure", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <AdminLogin onLoginSuccess={() => {}} />
      </MemoryRouter>,
    );

    expect(markup).toContain(">Admin Login</h1>");
    expect(markup).toContain('autoComplete="username"');
    expect(markup).toContain('type="password"');
    expect(markup).toContain(">Login</button>");
    expect(markup).toContain("Credentials are included in the browser app");
  });
});
