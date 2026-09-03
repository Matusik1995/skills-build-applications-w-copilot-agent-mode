import { useEffect, useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiRoot = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

const collections = ['activities', 'leaderboard', 'teams', 'users', 'workouts']

function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

function Dashboard() {
  const [records, setRecords] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadCollections(showLoading = true) {
    if (showLoading) setLoading(true)
    setError('')
    try {
      const responses = await Promise.all(
        collections.map(async (collection) => {
          const response = await fetch(`${apiRoot}/${collection}/`)
          if (!response.ok) throw new Error(`Unable to load ${collection}`)
          return [collection, getItems(await response.json())]
        }),
      )
      setRecords(Object.fromEntries(responses))
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function loadInitialCollections() {
      try {
        const responses = await Promise.all(
          collections.map(async (collection) => {
            const response = await fetch(`${apiRoot}/${collection}/`)
            if (!response.ok) throw new Error(`Unable to load ${collection}`)
            return [collection, getItems(await response.json())]
          }),
        )
        setRecords(Object.fromEntries(responses))
      } catch (requestError) {
        setError(requestError.message)
      } finally {
        setLoading(false)
      }
    }

    loadInitialCollections()
  }, [])

  const viewProps = { loading, error, onRetry: loadCollections }

  return (
    <div className="app-shell">
      <header className="app-header">
        <NavLink className="brand" to="/">
          <span className="brand-mark">OF</span>
          <span>
            <strong>OctoFit</strong>
            <small>TRACKER</small>
          </span>
        </NavLink>
        <nav className="primary-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
        <span className={`connection ${codespaceName ? 'online' : ''}`}>
          {codespaceName ? 'Codespace API' : 'Local API'}
        </span>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities items={records.activities} {...viewProps} />} />
          <Route path="/workouts" element={<Workouts items={records.workouts} {...viewProps} />} />
          <Route path="/teams" element={<Teams items={records.teams} {...viewProps} />} />
          <Route path="/leaderboard" element={<Leaderboard items={records.leaderboard} {...viewProps} />} />
          <Route path="/users" element={<Users items={records.users} {...viewProps} />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return <Dashboard />
}

export default App
