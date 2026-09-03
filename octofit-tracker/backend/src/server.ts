import express from 'express'
import { connectDatabase } from './config/database.js'
import apiRouter from './routes.js'

function getApiBaseUrl(codespaceName: string | undefined, port: number) {
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`
}

const app = express()
const port = Number(process.env.PORT) || 8000
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = getApiBaseUrl(codespaceName, port)

app.use(express.json())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.header('Access-Control-Allow-Headers', 'Content-Type')
  if (request.method === 'OPTIONS') {
    response.sendStatus(204)
    return
  }
  next()
})

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

app.use('/api', apiRouter)

void connectDatabase()

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`)
})