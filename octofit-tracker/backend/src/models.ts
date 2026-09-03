import mongoose, { Schema } from 'mongoose'

const flexibleSchema = new Schema<Record<string, unknown>>(
  {},
  { strict: false, timestamps: true },
)

export const User = mongoose.model('User', flexibleSchema, 'users')
export const Team = mongoose.model('Team', flexibleSchema, 'teams')
export const Activity = mongoose.model('Activity', flexibleSchema, 'activities')
export const LeaderboardEntry = mongoose.model(
  'LeaderboardEntry',
  flexibleSchema,
  'leaderboard',
)
export const Workout = mongoose.model('Workout', flexibleSchema, 'workouts')