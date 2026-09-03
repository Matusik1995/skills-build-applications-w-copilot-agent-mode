export const endpoint = '/api/leaderboard/'

function CollectionState({ loading, error, onRetry }) {
  if (loading) return <p className="state-message">Loading leaderboard...</p>
  if (error) return <div className="state-message"><p>{error}</p><button className="btn btn-dark" onClick={onRetry}>Retry</button></div>
  return null
}

export default function Leaderboard({ items = [], loading, error, onRetry }) {
  const ranked = [...items].sort((first, second) => (second.points || second.score || 0) - (first.points || first.score || 0))
  return <section className="view"><div className="view-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1><p className="lede">Small wins add up. See who is setting the pace.</p></div></div><CollectionState loading={loading} error={error} onRetry={onRetry} />{!loading && !error && <div className="leaderboard-list">{ranked.map((item, index) => <article className="rank-row" key={item._id || item.id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="avatar">{String(item.user || item.username || item.name || 'A').charAt(0).toUpperCase()}</span><strong>{item.user || item.username || item.name || 'Community member'}</strong><span className="score">{item.points ?? item.score ?? 0}<small> pts</small></span></article>)}{ranked.length === 0 && <p className="empty-message">The leaderboard will appear after the first activity.</p>}</div>}</section>
}