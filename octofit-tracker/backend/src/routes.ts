import { Router, type Request, type Response } from 'express'
import mongoose from 'mongoose'
import {
  Activity,
  LeaderboardEntry,
  Team,
  User,
  Workout,
} from './models.js'

const router = Router()

function createCollectionHandlers(model: mongoose.Model<Record<string, unknown>>) {
  const list = async (_request: Request, response: Response) => {
    if (mongoose.connection.readyState !== 1) {
      response.json([])
      return
    }

    response.json(await model.find().lean())
  }

  const create = async (request: Request, response: Response) => {
    if (mongoose.connection.readyState !== 1) {
      response.status(503).json({ error: 'Database is unavailable' })
      return
    }

    const document = await model.create(request.body)
    response.status(201).json(document)
  }

  return { list, create }
}

const users = createCollectionHandlers(User)
const teams = createCollectionHandlers(Team)
const activities = createCollectionHandlers(Activity)
const leaderboard = createCollectionHandlers(LeaderboardEntry)
const workouts = createCollectionHandlers(Workout)

router.get('/users/', users.list)
router.post('/users/', users.create)
router.get('/teams/', teams.list)
router.post('/teams/', teams.create)
router.get('/activities/', activities.list)
router.post('/activities/', activities.create)
router.get('/leaderboard/', leaderboard.list)
router.post('/leaderboard/', leaderboard.create)
router.get('/workouts/', workouts.list)
router.post('/workouts/', workouts.create)

export default router