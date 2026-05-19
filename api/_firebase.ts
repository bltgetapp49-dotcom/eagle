import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const parseServiceAccount = (raw: string) => {
  try {
    return JSON.parse(raw);
  } catch (firstError) {
    const normalized = raw.replace(/\\r\\n/g, '\\n').replace(/\\n/g, '\\n');
    return JSON.parse(normalized);
  }
};

const firebaseCredentials = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp(
    firebaseCredentials
      ? { credential: admin.credential.cert(firebaseCredentials) }
      : undefined
  );
}

export const db = admin.firestore();
export const shipmentsCollection = db.collection('shipments');
export const logsCollection = db.collection('admin_logs');
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
