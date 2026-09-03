import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

function Dashboard() {

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
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return <Dashboard />
}

export default App
