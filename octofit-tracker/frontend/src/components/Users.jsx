function CollectionState({ loading, error, onRetry }) {
  if (loading) return <p className="state-message">Loading members...</p>
  if (error) return <div className="state-message"><p>{error}</p><button className="btn btn-dark" onClick={onRetry}>Retry</button></div>
  return null
}

export default function Users({ items = [], loading, error, onRetry }) {
  return <section className="view"><div className="view-heading"><div><p className="eyebrow">The community</p><h1>Members</h1><p className="lede">Everyone bringing a little more energy to the day.</p></div><span className="count-badge">{items.length} members</span></div><CollectionState loading={loading} error={error} onRetry={onRetry} />{!loading && !error && <div className="member-grid">{items.map((user, index) => <article className="member-card" key={user._id || user.id || index}><span className="avatar large">{String(user.name || user.username || user.email || 'M').charAt(0).toUpperCase()}</span><div><h2>{user.name || user.username || 'New member'}</h2><p>{user.email || user.role || 'OctoFit member'}</p></div></article>)}{items.length === 0 && <p className="empty-message">No members have joined yet.</p>}</div>}</section>
}