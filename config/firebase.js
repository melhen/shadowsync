// config/firebase.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'fs';

// Read service account key manually
const serviceAccount = JSON.parse(
  readFileSync(new URL('../serviceAccountKey.json', import.meta.url))
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

export { db, auth };
