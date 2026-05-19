import { logsCollection } from '../_firebase';
import { isAdminPasswordValid } from '../_auth';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isAdminPasswordValid(req)) {
    return res.status(401).json({ error: 'Unauthorized access detected.' });
  }

  const snapshot = await logsCollection.orderBy('timestamp', 'desc').limit(100).get();
  const logs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.json(logs);
}
