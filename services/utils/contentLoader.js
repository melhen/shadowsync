// services/utils/contentLoader.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentPath = path.join(
  __dirname,
  '..',
  '..', // move up one more level: from utils/ to base
  'content',
  'systemMessages.json',
)

const rawData = fs.readFileSync(contentPath, 'utf8')

export const systemMessages = JSON.parse(rawData)
