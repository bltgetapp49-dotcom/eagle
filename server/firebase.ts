import admin from "firebase-admin";
import dotenv from "dotenv";

// Load `.env` silently; service account JSON is expected in an env var
dotenv.config({ quiet: true });

/**
 * Accepts either a compact JSON string or a JSON string where newlines
 * are escaped and normalizes it into a valid service account object.
 * This allows the service account to be provided via a single environment
 * variable in hosting providers that escape newlines.
 */
const parseServiceAccount = (raw: string) => {
  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    const normalized = raw.replace(/\r\n/g, "\n").replace(/\n/g, "\n");
    credentials = JSON.parse(normalized);
  }

  if (typeof credentials.private_key === "string") {
    // Convert escaped newline sequences into actual newlines for the key
    credentials.private_key = credentials.private_key.replace(/\n/g, "\n");
  }

  return credentials;
};

const firebaseCredentials = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  : undefined;

// Initialize Firebase Admin once. When running locally without credentials
// admin.initializeApp() will use application default credentials where available.
if (!admin.apps.length) {
  admin.initializeApp(
    firebaseCredentials
      ? { credential: admin.credential.cert(firebaseCredentials) }
      : undefined,
  );
}

export const db = admin.firestore();
export const shipmentsCollection = db.collection("shipments");
export const logsCollection = db.collection("admin_logs");
