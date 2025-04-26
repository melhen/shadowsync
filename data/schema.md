# Firestore Structure

## Collection: users
- id (Telegram ID)
- username
- firstName
- joinedAt
- shadowPersonaId
- streak
- trophies[]
- runtimeFlags {}

## Subcollection: users/{userId}/taskLogs
- ritualId
- status: "OBEY" | "NEGOTIATE" | "DEFY"
- timestamp
- notes (optional)
- responseDuration (optional)

## Collection: rituals
- id
- title
- prompt
- module
- conditions
- runtimeTags
- tier

## Subcollection: users/{userId}/shadow
- toneProfile
- complianceStreak
- resistanceStreak
- lastResponse
