import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME.trim()}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/'

function CollectionState({ loading, error, onRetry }) {
  if (loading) return <p className="state-message">Loading leaderboard...</p>
  if (error) return <div className="state-message"><p>{error}</p><button className="btn btn-dark" onClick={onRetry}>Retry</button></div>
  return null
}

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => { fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Unable to load leaderboard'); return response.json() }).then((payload) => setItems(Array.isArray(payload) ? payload : payload?.results || payload?.data || payload?.items || [])).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false)) }, [])
  const ranked = [...items].sort((first, second) => (second.points || second.score || 0) - (first.points || first.score || 0))
  return <section className="view"><div className="view-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lede">Small wins add up. See who is setting the pace.</p></div></div><CollectionState loading={loading} error={error} onRetry={onRetry} />{!loading && !error && <div className="leaderboard-list">{ranked.map((item, index) => <article className="rank-row" key={item._id || item.id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="avatar">{String(item.user || item.username || item.name || 'A').charAt(0).toUpperCase()}</span><strong>{item.user || item.username || item.name || 'Community member'}</strong><span className="score">{item.points ?? item.score ?? 0}<small> pts</small></span></article>)}{ranked.length === 0 && <p className="empty-message">The leaderboard will appear after the first activity.</p>}</div>}</section>
}