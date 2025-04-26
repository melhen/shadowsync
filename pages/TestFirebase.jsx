// pages/TestFirebase.jsx (or wherever)

import { db } from '../services/firebase.js'
import { doc, getDoc } from 'firebase/firestore'

export default function TestFirebase() {
  async function fetchData() {
    const testDoc = doc(db, 'users', 'SOME_EXISTING_USER_ID', 'shadow', 'state')
    const snapshot = await getDoc(testDoc)

    if (snapshot.exists()) {
      console.log('Shadow State:', snapshot.data())
    } else {
      console.log('No Shadow State found.')
    }
  }

  return (
    <div className="text-white">
      <h1>Firebase Test</h1>
      <button
        onClick={fetchData}
        className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded"
      >
        Fetch Shadow State
      </button>
    </div>
  )
}
