import { describe, expect, it } from "vitest";
import {
  isAdminLoginConfigured,
  verifyAdminCredentials,
} from "./auth";

describe("admin demo credentials", () => {
  const config = {
    VITE_ADMIN_USER_ID: "admin",
    VITE_ADMIN_PASSWORD: "1234",
  };

  it("requires both configured values", () => {
    expect(isAdminLoginConfigured(config)).toBe(true);
    expect(isAdminLoginConfigured({ VITE_ADMIN_USER_ID: "store-admin" })).toBe(false);
    expect(isAdminLoginConfigured({})).toBe(false);
  });

  it("accepts only the configured user ID and password", () => {
    expect(verifyAdminCredentials("admin", "1234", config)).toBe(true);
    expect(verifyAdminCredentials("wrong-user", "1234", config)).toBe(false);
    expect(verifyAdminCredentials("admin", "wrong-password", config)).toBe(false);
    expect(verifyAdminCredentials("admin", "1234", {})).toBe(false);
  });
});
