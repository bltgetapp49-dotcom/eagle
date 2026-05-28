import { shipmentsCollection, logsCollection } from "../../server/firebase.js";
import { isAdminPasswordValid } from "../../server/auth.js";

// Route-specific version of `/api/track` that lives under `track/[id]`
const buildShipment = (doc: any) => ({
  id: doc.id,
  ...doc.data(),
});

export default async function handler(req: any, res: any) {
  const { id } = req.query;
  const shipmentId = Array.isArray(id) ? id[0] : id;

  if (!shipmentId) {
    return res.status(400).json({ error: "Missing shipment ID" });
  }

  const docRef = shipmentsCollection.doc(shipmentId);
  const doc = await docRef.get();

  if (req.method === "GET") {
    if (!doc.exists) {
      return res.status(404).json({ error: "Shipment not found" });
    }
    return res.json(buildShipment(doc));
  }

  if (req.method === "PATCH") {
    if (!isAdminPasswordValid(req)) {
      return res.status(401).json({ error: "Unauthorized access detected." });
    }

    if (!doc.exists) {
      return res.status(404).json({ error: "Shipment not found" });
    }

    const existing = buildShipment(doc);
    const { progress, status } = req.body || {};
    const updates: any = {
      progress: typeof progress === "number" ? progress : existing.progress,
      updatedAt: new Date(),
    };

    if (status && status !== existing.status) {
      updates.status = status;
      updates.timeline = [
        ...(existing.timeline || []),
        { status, time: new Date().toLocaleString() },
      ];
    }

    await docRef.update(updates);
    const updatedDoc = await docRef.get();
    const updatedShipment = buildShipment(updatedDoc);
    await logsCollection.add({
      action: "update",
      shipmentId,
      details: { requestBody: req.body, updatedShipment },
      timestamp: new Date(),
    });

    return res.json(updatedShipment);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
