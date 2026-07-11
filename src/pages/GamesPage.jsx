import { useEffect, useState } from 'react'
import { games } from '../data/sessions'

export default function GamesPage({ addProgress }) {
  const [active, setActive] = useState(0)
  const [frameHeights, setFrameHeights] = useState({})
  const [reloadKey, setReloadKey] = useState(0)

  const [id, label, desc, src] = games[active]

  useEffect(() => {
    addProgress('games', id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    function onMessage(e) {
      if (!e.data || typeof e.data.gcGameHeight !== 'number') return
      const h = Math.max(300, Math.min(500, Math.round(e.data.gcGameHeight) + 4))
      setFrameHeights((prev) => ({ ...prev, [id]: h }))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [id])

  function restart() {
    setReloadKey((k) => k + 1)
  }

  return (
    <section className="page wrap">
      <div className="section-head">
        <p className="eyebrow">AI Power Playground</p>
        <h2>AI-Powered Play</h2>
        <p>These games are intentionally simple, mobile-friendly, and reliable. Every game teaches one AI idea with clicks and instant feedback.</p>
      </div>
      <div className="tabs">
        {games.map((g, i) => (
          <button key={g[0]} className={'tab' + (i === active ? ' active' : '')} onClick={() => setActive(i)}>
            {g[1]}
            <small>{g[2]}</small>
          </button>
        ))}
      </div>
      <div className="stage">
        <h3>{label}</h3>
        <p>{desc}</p>
        <div className="game-layout">
          <div className="game-frame-wrap">
            <iframe
              key={id + reloadKey}
              title={label}
              src={src}
              loading="lazy"
              style={{ height: (frameHeights[id] || 400) + 'px' }}
            />
          </div>
        </div>
        <div className="actions" style={{ marginTop: 14 }}>
          <button className="btn primary" onClick={restart}>Restart</button>
        </div>
      </div>
    </section>
  )
}
