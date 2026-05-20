import { shipmentsCollection, logsCollection } from '../server/firebase.js';
import { isAdminPasswordValid } from '../server/auth.js';

const buildShipment = (doc: any) => ({
  id: doc.id,
  ...doc.data(),
});

export default async function handler(req: any, res: any) {
  if (req.method === 'DELETE') {
    if (!isAdminPasswordValid(req)) {
      return res.status(401).json({ error: 'Unauthorized access detected.' });
    }

    const { id } = req.query;
    const shipmentId = Array.isArray(id) ? id[0] : id;

    if (!shipmentId) {
      return res.status(400).json({ error: 'Missing shipment ID' });
    }

    const docRef = shipmentsCollection.doc(shipmentId);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    await docRef.delete();
    await logsCollection.add({
      action: 'delete',
      shipmentId,
      details: { deletedAt: new Date() },
      timestamp: new Date(),
    });

    return res.json({ success: true });
  }

  if (req.method === 'GET') {
    if (!isAdminPasswordValid(req)) {
      return res.status(401).json({ error: 'Unauthorized access detected.' });
    }

    const snapshot = await shipmentsCollection.orderBy('createdAt', 'desc').get();
    const shipments = snapshot.docs.map(buildShipment);
    return res.json(shipments);
  }

  if (req.method === 'POST') {
    if (!isAdminPasswordValid(req)) {
      return res.status(401).json({ error: 'Unauthorized access detected.' });
    }

    const id = `TRK-${Math.floor(1000 + Math.random() * 9000)}`;
    const body = req.body || {};
    const newShipment = {
      id,
      ...body,
      progress: 0,
      status: 'In Transit',
      timeline: [{ status: 'Order Processed', time: new Date().toLocaleString() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await shipmentsCollection.doc(id).set(newShipment);
    await logsCollection.add({
      action: 'create',
      shipmentId: id,
      details: { shipment: newShipment },
      timestamp: new Date(),
    });

    return res.json(newShipment);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
