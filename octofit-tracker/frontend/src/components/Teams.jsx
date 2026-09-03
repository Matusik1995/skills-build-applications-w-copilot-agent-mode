function CollectionState({ loading, error, onRetry }) {
  if (loading) return <p className="state-message">Loading teams...</p>
  if (error) return <div className="state-message"><p>{error}</p><button className="btn btn-dark" onClick={onRetry}>Retry</button></div>
  return null
}

export default function Teams({ items = [], loading, error, onRetry }) {
  return <section className="view"><div className="view-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1><p className="lede">Move together, keep each other accountable.</p></div><span className="count-badge">{items.length} teams</span></div><CollectionState loading={loading} error={error} onRetry={onRetry} />{!loading && !error && <div className="card-grid">{items.map((team, index) => <article className="info-card" key={team._id || team.id || index}><span className="card-index">0{index + 1}</span><h2>{team.name || team.teamName || 'Unnamed team'}</h2><p>{team.description || 'A new challenge starts here.'}</p><footer>{team.members?.length ?? team.memberCount ?? 0} members <span>→</span></footer></article>)}{items.length === 0 && <p className="empty-message">No teams have been created yet.</p>}</div>}</section>
}