function titleCase(value) {
  return String(value || 'Activity').replace(/[-_]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function CollectionState({ loading, error, onRetry }) {
  if (loading) return <p className="state-message">Loading activity data...</p>
  if (error) return <div className="state-message"><p>{error}</p><button className="btn btn-dark" onClick={onRetry}>Retry</button></div>
  return null
}

export default function Activities({ items = [], loading, error, onRetry }) {
  return <section className="view"><div className="view-heading"><div><p className="eyebrow">Movement log</p><h1>Activities</h1><p className="lede">A live record of how the community is moving.</p></div><span className="count-badge">{items.length} logged</span></div><CollectionState loading={loading} error={error} onRetry={onRetry} />{!loading && !error && <div className="table-wrap"><table><thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Points</th></tr></thead><tbody>{items.map((item, index) => <tr key={item._id || item.id || index}><td><strong>{titleCase(item.type || item.name)}</strong><small>{item.date || item.createdAt ? new Date(item.date || item.createdAt).toLocaleDateString() : 'Recently logged'}</small></td><td>{item.user || item.username || item.userId || 'Community member'}</td><td>{item.duration ? `${item.duration} min` : item.distance ? `${item.distance} km` : '—'}</td><td className="accent-value">{item.points ?? '—'}</td></tr>)}</tbody></table>{items.length === 0 && <p className="empty-message">No activities have been logged yet.</p>}</div>}</section>
}