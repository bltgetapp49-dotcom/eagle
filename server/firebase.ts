import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const parseServiceAccount = (raw: string) => {
  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    const normalized = raw.replace(/\\r\\n/g, '\\n').replace(/\\n/g, '\\n');
    credentials = JSON.parse(normalized);
  }

  if (typeof credentials.private_key === 'string') {
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
  }

  return credentials;
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
