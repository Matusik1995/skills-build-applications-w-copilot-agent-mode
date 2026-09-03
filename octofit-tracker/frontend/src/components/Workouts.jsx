import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/workouts/`
  : '/api/workouts/'

function CollectionState({ loading, error, onRetry }) {
  if (loading) return <p className="state-message">Loading workouts...</p>
  if (error) return <div className="state-message"><p>{error}</p><button className="btn btn-dark" onClick={onRetry}>Retry</button></div>
  return null
}

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Unable to load workouts'); return response.json() }).then((payload) => setItems(Array.isArray(payload) ? payload : payload?.results || payload?.data || payload?.items || [])).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  return <section className="view"><div className="view-heading"><div><p className="eyebrow">Personalized suggestions</p><h1>Workouts</h1><p className="lede">A few good ways to make today count.</p></div><span className="count-badge">{items.length} plans</span></div><CollectionState loading={loading} error={error} onRetry={onRetry} />{!loading && !error && <div className="card-grid workout-grid">{items.map((workout, index) => <article className="info-card" key={workout._id || workout.id || index}><span className="workout-tag">{workout.category || workout.type || 'Workout'}</span><h2>{workout.name || workout.title || 'Daily movement'}</h2><p>{workout.description || workout.details || 'A focused session for building consistency.'}</p><footer>{workout.duration ? `${workout.duration} min` : 'Flexible pace'} <span>Start →</span></footer></article>)}{items.length === 0 && <p className="empty-message">No workout suggestions are available yet.</p>}</div>}</section>
}