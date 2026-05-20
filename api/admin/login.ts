import { ADMIN_PASSWORD } from '../../server/config.js';

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
