import mongoose from 'mongoose'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from '../models.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        avatar: 'JL',
        fitnessLevel: 'Intermediate',
      },
      {
        name: 'Maya Patel',
        email: 'maya.patel@example.com',
        avatar: 'MP',
        fitnessLevel: 'Beginner',
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@example.com',
        avatar: 'EB',
        fitnessLevel: 'Advanced',
      },
    ])

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on consistency and endurance.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Campus Chargers',
        description: 'Strength and speed training for every fitness level.',
        members: [users[2]._id],
      },
    ])

    await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 32,
        distanceKm: 5.1,
        points: 51,
        completedAt: new Date('2026-08-30'),
      },
      {
        user: users[1]._id,
        type: 'Walking',
        durationMinutes: 45,
        distanceKm: 3.6,
        points: 36,
        completedAt: new Date('2026-08-31'),
      },
      {
        user: users[2]._id,
        type: 'Strength Training',
        durationMinutes: 40,
        points: 60,
        completedAt: new Date('2026-09-01'),
      },
    ])

    await LeaderboardEntry.create([
      { user: users[2]._id, team: teams[1]._id, points: 420, rank: 1 },
      { user: users[0]._id, team: teams[0]._id, points: 385, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 240, rank: 3 },
    ])

    await Workout.create([
      {
        title: 'Steady 5K Builder',
        type: 'Running',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        description: 'Warm up, run at a conversational pace, then cool down.',
      },
      {
        title: 'Bodyweight Foundations',
        type: 'Strength Training',
        difficulty: 'Beginner',
        durationMinutes: 20,
        description: 'A simple circuit of squats, push-ups, lunges, and planks.',
      },
      {
        title: 'Speed Intervals',
        type: 'Running',
        difficulty: 'Advanced',
        durationMinutes: 30,
        description: 'Alternate short fast efforts with controlled recovery jogs.',
      },
    ])

    console.log('Seeded users, teams, activities, leaderboard, and workouts')
    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

void seedDatabase()
