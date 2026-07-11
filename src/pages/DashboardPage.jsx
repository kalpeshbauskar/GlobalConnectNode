import { allVideos, simDefs, games } from '../data/sessions'

export default function DashboardPage({ progress, resetProgress, onLogout }) {
  const done = progress.videos.length + progress.sims.length + progress.games.length + Math.min(progress.code, 20)
  const total = allVideos.length + simDefs.length + games.length + 20
  const pct = Math.round((done / total) * 100)

  function handleReset() {
    if (window.confirm('Reset progress on this browser?')) {
      resetProgress()
    }
  }

  return (
    <section className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Progress</p>
        <h2>Your private dashboard</h2>
        <p>Progress, notes, and profile stay in this browser. Students can use it without a paid backend.</p>
      </div>
      <div className="dash">
        <div className="stat"><strong>{progress.videos.length}</strong><small>Videos</small></div>
        <div className="stat"><strong>{progress.sims.length}</strong><small>Activities</small></div>
        <div className="stat"><strong>{progress.games.length}</strong><small>Games</small></div>
        <div className="stat"><strong>{progress.code}</strong><small>Code Runs</small></div>
      </div>
      <div className="progress"><span style={{ width: pct + '%' }} /></div>
      <div className="actions">
        <button className="btn secondary" onClick={handleReset}>Reset Progress</button>
        <button className="btn bad" onClick={onLogout}>Logout</button>
      </div>
    </section>
  )
}
