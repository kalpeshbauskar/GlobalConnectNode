import { useState } from 'react'

const SIZE = 5

export default function PixelVision() {
  const [cells, setCells] = useState(Array(SIZE * SIZE).fill(false))
  const [result, setResult] = useState({
    label: 'Draw something!',
    detail: 'Click squares to toggle pixels on and off, then classify your pattern.',
    msg: 'Tip: try a filled block, a symmetric shape, and a scattered pattern to see different results.',
  })

  function toggle(i) {
    setCells((prev) => {
      const next = [...prev]
      next[i] = !next[i]
      return next
    })
  }

  function clearGrid() {
    setCells(Array(SIZE * SIZE).fill(false))
  }

  function classify() {
    const count = cells.filter(Boolean).length
    let label = 'Pattern', msg = ''
    if (count === 0) {
      label = 'Empty canvas'
      msg = 'No pixels are switched on, so the AI has nothing to classify yet.'
    } else {
      let symmetric = true
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          const leftOn = cells[r * SIZE + c]
          const rightOn = cells[r * SIZE + (SIZE - 1 - c)]
          if (leftOn !== rightOn) symmetric = false
        }
      }
      const density = count / (SIZE * SIZE)
      if (density > 0.6) { label = 'Dense blob'; msg = 'Most pixels are on, so the AI reads this as a solid, filled shape.' }
      else if (symmetric) { label = 'Symmetric pattern'; msg = 'Left and right sides match, so the AI flags this as a balanced, symmetric shape (like a face or letter).' }
      else { label = 'Irregular pattern'; msg = 'The pixels are scattered without symmetry, so the AI treats this as a unique, irregular shape.' }
    }
    setResult({ label, detail: `${count} of ${SIZE * SIZE} pixels are on.`, msg })
  }

  return (
    <div>
      <h3>Pixel Vision</h3>
      <div className="sim-shell">
        <div className="controls">
          <p style={{ fontWeight: 900, margin: '0 0 10px' }}>Draw a pattern, then ask the AI to classify it.</p>
          <div className="tile-grid">
            {cells.map((on, i) => (
              <div key={i} className={'tile' + (on ? ' on' : '')} onClick={() => toggle(i)} />
            ))}
          </div>
          <button className="btn primary" style={{ marginTop: 14 }} onClick={classify}>Classify pattern</button>
          <button className="btn secondary" style={{ marginTop: 8 }} onClick={clearGrid}>Clear grid</button>
        </div>
        <div>
          <div className="visual">
            <h2>{result.label}</h2>
            <p>{result.detail}</p>
          </div>
          <div className="result">{result.msg}</div>
        </div>
      </div>
    </div>
  )
}
