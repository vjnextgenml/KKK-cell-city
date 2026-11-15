export type AdminCredentialConfig = Pick<
  ImportMetaEnv,
  "VITE_ADMIN_USER_ID" | "VITE_ADMIN_PASSWORD"
>;

export function isAdminLoginConfigured(
  config: AdminCredentialConfig = import.meta.env,
): boolean {
  return Boolean(config.VITE_ADMIN_USER_ID && config.VITE_ADMIN_PASSWORD);
}

export function verifyAdminCredentials(
  userId: string,
  password: string,
  config: AdminCredentialConfig = import.meta.env,
): boolean {
  if (!isAdminLoginConfigured(config)) return false;
  return (
    userId.trim() === config.VITE_ADMIN_USER_ID &&
    password === config.VITE_ADMIN_PASSWORD
  );
}
