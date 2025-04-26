// config/firebase.js

import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Resolve __dirname manually in ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load the service account JSON manually
const serviceAccountPath = path.resolve(__dirname, 'serviceAccountKey.json')
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
}

export const db = getFirestore()
