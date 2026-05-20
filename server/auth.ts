import { ADMIN_PASSWORD } from './config.js';

export const isAdminPasswordValid = (req: any) => {
  const passwordHeader = req.headers['x-admin-password'] ?? req.headers['X-Admin-Password'];
  return passwordHeader === ADMIN_PASSWORD;
};
