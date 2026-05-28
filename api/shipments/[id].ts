import { shipmentsCollection, logsCollection } from "../../server/firebase.js";
import { isAdminPasswordValid } from "../../server/auth.js";

/**
 * Route: `/api/shipments/[id]` (DELETE)
 * Deletes a shipment by id and writes an admin_log entry. Admin-only.
 */
export default async function handler(req: any, res: any) {
  const { id } = req.query;
  const shipmentId = Array.isArray(id) ? id[0] : id;

  if (!shipmentId) {
    return res.status(400).json({ error: "Missing shipment ID" });
  }

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAdminPasswordValid(req)) {
    return res.status(401).json({ error: "Unauthorized access detected." });
  }

  const docRef = shipmentsCollection.doc(shipmentId);
  const doc = await docRef.get();
  if (!doc.exists) {
    return res.status(404).json({ error: "Shipment not found" });
  }

  await docRef.delete();
  await logsCollection.add({
    action: "delete",
    shipmentId,
    details: { deletedAt: new Date() },
    timestamp: new Date(),
  });

  return res.json({ success: true });
}
