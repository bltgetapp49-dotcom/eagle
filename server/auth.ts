import { ADMIN_PASSWORD } from "./config.js";

/**
 * Server-side helper to validate calls that require admin authorization.
 * The admin password is expected in the `x-admin-password` header.
 */
export const isAdminPasswordValid = (req: any) => {
  const passwordHeader =
    req.headers["x-admin-password"] ?? req.headers["X-Admin-Password"];
  return passwordHeader === ADMIN_PASSWORD;
};
