import { useEffect, useRef, useState } from 'react'

const FEATURES = ['Fur length', 'Ear shape', 'Tail length', 'Body size']
const FEAT_COLORS = ['#1D9E75', '#7F77DD', '#EF9F27', '#D85A30']

function sigmoid(x) { return 1 / (1 + Math.exp(-x)) }
function sigmoidD(x) { const s = sigmoid(x); return s * (1 - s) }

function makeSamples() {
  return Array.from({ length: 20 }, (_, i) => {
    const isCat = i < 10
    return {
      label: isCat ? 0 : 1,
      emoji: isCat ? '🐱' : '🐶',
      name: isCat ? 'Cat' : 'Dog',
      x: isCat
        ? [0.3 + Math.random() * 0.35, 0.6 + Math.random() * 0.3, 0.2 + Math.random() * 0.3, 0.25 + Math.random() * 0.3]
        : [0.55 + Math.random() * 0.4, 0.2 + Math.random() * 0.35, 0.6 + Math.random() * 0.35, 0.55 + Math.random() * 0.4],
    }
  })
}

function initNetwork() {
  return {
    W1: Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => (Math.random() - 0.5) * 0.5)),
    b1: Array(4).fill(0),
    W2: Array.from({ length: 4 }, () => (Math.random() - 0.5) * 0.5),
    b2: 0,
  }
}

function forward(net, x) {
  const z1 = net.W1.map((row, j) => row.reduce((s, w, i) => s + w * x[i], 0) + net.b1[j])
  const a1 = z1.map(sigmoid)
  const z2 = net.W2.reduce((s, w, j) => s + w * a1[j], 0) + net.b2
  const a2 = sigmoid(z2)
  return { z1, a1, z2, a2 }
}

function trainStep(net, sample, lr) {
  const { x, label } = sample
  const { z1, a1, z2, a2 } = forward(net, x)
  const loss = -label * Math.log(a2 + 1e-9) - (1 - label) * Math.log(1 - a2 + 1e-9)
  const d2 = a2 - label
  net.W2.forEach((_, j) => { net.W2[j] -= lr * d2 * a1[j] })
  net.b2 -= lr * d2
  a1.forEach((_, j) => {
    const dz1 = d2 * net.W2[j] * sigmoidD(z1[j])
    x.forEach((_, i) => { net.W1[j][i] -= lr * dz1 * x[i] })
    net.b1[j] -= lr * dz1
  })
  return loss
}

export default function NeuralNetLab({ onComplete }) {
  const netCanvasRef = useRef(null)
  const lossCanvasRef = useRef(null)
  const netRef = useRef(initNetwork())
  const samplesRef = useRef(makeSamples())
  const lossHistoryRef = useRef([])
  const intervalRef = useRef(null)
  const trainingRef = useRef(false)

  const [epoch, setEpoch] = useState(0)
  const [training, setTraining] = useState(false)
  const [speed, setSpeed] = useState(4)
  const [sampleIdx, setSampleIdx] = useState(0)
  const [loss, setLoss] = useState(null)
  const [acc, setAcc] = useState(null)
  const [done, setDone] = useState(false)
  const [explanation, setExplanation] = useState(
    '<strong>How it works:</strong> This network has 4 inputs (fur length, ear shape, tail length, size) → 4 hidden neurons → 1 output (0 = cat, 1 = dog). Click <strong>Train</strong> to watch it learn from 20 synthetic examples using backpropagation. The glowing edges show which connections fire most strongly for the current sample.'
  )

  function getAccuracy() {
    let correct = 0
    samplesRef.current.forEach((s) => {
      const { a2 } = forward(netRef.current, s.x)
      correct += Math.round(a2) === s.label ? 1 : 0
    })
    return correct / samplesRef.current.length
  }
  function getAvgLoss() {
    let l = 0
    samplesRef.current.forEach((s) => {
      const { a2 } = forward(netRef.current, s.x)
      l += -s.label * Math.log(a2 + 1e-9) - (1 - s.label) * Math.log(1 - a2 + 1e-9)
    })
    return l / samplesRef.current.length
  }

  function drawNetwork(inputs, hidden, output) {
    const canvas = netCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)
    const textColor = 'rgba(20,32,51,0.75)'
    const bgColor = 'rgba(20,32,51,0.06)'
    const net = netRef.current
    const layers = [
      { x: 70, nodes: inputs.map((v, i) => ({ val: v, label: FEATURES[i].split(' ')[0], color: FEAT_COLORS[i] })) },
      { x: 210, nodes: hidden.map((v, i) => ({ val: v, label: 'H' + (i + 1), color: '#7F77DD' })) },
      { x: 350, nodes: [{ val: output, label: 'Output', color: output > 0.5 ? '#7F77DD' : '#1D9E75' }] },
    ]
    const nodeR = 18
    layers.forEach((layer) => {
      const n = layer.nodes.length
      layer.nodes.forEach((node, ni) => { node.y = H / 2 + (ni - (n - 1) / 2) * 62 })
    })
    for (let li = 0; li < layers.length - 1; li++) {
      const src = layers[li], dst = layers[li + 1]
      src.nodes.forEach((sn, si) => {
        dst.nodes.forEach((dn, di) => {
          const w = li === 0 ? net.W1[di][si] : net.W2[di]
          const strength = Math.abs(w) * sn.val
          const alpha = Math.min(0.85, 0.08 + strength * 0.6)
          const positive = w > 0
          ctx.beginPath()
          ctx.moveTo(src.x + nodeR, sn.y)
          ctx.lineTo(dst.x - nodeR, dn.y)
          ctx.strokeStyle = positive ? `rgba(29,158,117,${alpha})` : `rgba(168,45,45,${alpha})`
          ctx.lineWidth = 0.5 + strength * 2.5
          ctx.stroke()
        })
      })
    }
    layers.forEach((layer, li) => {
      layer.nodes.forEach((node) => {
        const { val, label, color } = node, x = layer.x, y = node.y
        ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI * 2); ctx.fillStyle = bgColor; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, nodeR, 0, Math.PI * 2)
        const alpha = 0.15 + val * 0.75
        ctx.strokeStyle = color; ctx.lineWidth = 1.5 + val * 2; ctx.globalAlpha = alpha; ctx.stroke(); ctx.globalAlpha = 1
        ctx.beginPath(); ctx.arc(x, y, nodeR * 0.75, 0, Math.PI * 2); ctx.fillStyle = color; ctx.globalAlpha = val * 0.7; ctx.fill(); ctx.globalAlpha = 1
        ctx.fillStyle = textColor; ctx.font = '600 10px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        ctx.fillText(li === 2 ? (val > 0.5 ? '🐶' : '🐱') : label, x, y)
        ctx.font = '400 9px Inter,sans-serif'; ctx.fillStyle = 'rgba(20,32,51,0.45)'
        ctx.fillText(val.toFixed(2), x, y + nodeR + 10)
      })
    })
    const layerNames = ['Input layer', 'Hidden layer', 'Output']
    layers.forEach((layer, li) => {
      ctx.font = '600 10px Inter,sans-serif'; ctx.fillStyle = 'rgba(20,32,51,0.45)'; ctx.textAlign = 'center'
      ctx.fillText(layerNames[li], layer.x, 18)
    })
  }

  function drawLoss() {
    const canvas = lossCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)
    const hist = lossHistoryRef.current
    if (hist.length < 2) return
    const pad = { l: 36, r: 16, t: 10, b: 20 }
    const cW = W - pad.l - pad.r, cH = H - pad.t - pad.b
    const maxL = Math.max(...hist, 0.7), minL = 0
    const xScale = cW / (100 - 1), yScale = cH / (maxL - minL)
    ;[0.2, 0.4, 0.6].forEach((v) => {
      const y = pad.t + cH - v * yScale
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + cW, y)
      ctx.strokeStyle = 'rgba(20,32,51,0.08)'; ctx.lineWidth = 0.5; ctx.setLineDash([3, 3]); ctx.stroke(); ctx.setLineDash([])
      ctx.font = '9px Inter,sans-serif'; ctx.fillStyle = 'rgba(20,32,51,0.4)'; ctx.textAlign = 'right'
      ctx.fillText(v.toFixed(1), pad.l - 4, y + 3)
    })
    ctx.beginPath()
    hist.forEach((l, i) => {
      const px = pad.l + i * xScale, py = pad.t + cH - (l - minL) * yScale
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
    })
    ctx.strokeStyle = '#E24B4A'; ctx.lineWidth = 1.5; ctx.stroke()
    const last = hist[hist.length - 1]
    const lx = pad.l + (hist.length - 1) * xScale, ly = pad.t + cH - (last - minL) * yScale
    ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2); ctx.fillStyle = '#E24B4A'; ctx.fill()
  }

  function updateDisplay(idx) {
    const s = samplesRef.current[idx]
    const { a1, a2 } = forward(netRef.current, s.x)
    drawNetwork(s.x, a1, a2)
    return { catP: 1 - a2, dogP: a2, pred: Math.round(a2), correct: Math.round(a2) === s.label }
  }

  useEffect(() => {
    drawLoss()
    updateDisplay(sampleIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    updateDisplay(sampleIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sampleIdx, epoch])

  function runTraining() {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!trainingRef.current || netRef.current.__epoch >= 100) {
        clearInterval(intervalRef.current)
        return
      }
      let e = netRef.current.__epoch || 0
      for (let i = 0; i < speed; i++) {
        if (e >= 100) break
        samplesRef.current.forEach((s) => trainStep(netRef.current, s, 0.1))
        e++
      }
      netRef.current.__epoch = e
      const l = getAvgLoss(), a = getAccuracy()
      lossHistoryRef.current.push(l)
      setLoss(l); setAcc(a); setEpoch(e)
      drawLoss()
      if (e >= 100) {
        clearInterval(intervalRef.current)
        setTraining(false); trainingRef.current = false
        setDone(true)
        const pct = Math.round(a * 100)
        let msg
        if (pct >= 95) msg = `<strong>Excellent!</strong> The network achieved <strong>${pct}% accuracy</strong>. It has learned strong decision boundaries — green edges carry cat-like features, red edges suppress them. The hidden layer neurons act as feature detectors: some fire for long tails, others for upright ears.`
        else if (pct >= 80) msg = `<strong>Good progress!</strong> At <strong>${pct}% accuracy</strong>, the network mostly separates cats from dogs. A few ambiguous samples still confuse it — those with medium fur length or neutral ear shapes land near the decision boundary.`
        else msg = `<strong>Still learning.</strong> At <strong>${pct}% accuracy</strong>, the network is finding patterns but struggling. Try resetting and training again — random initialization sometimes puts weights in a poor region of the loss landscape.`
        setExplanation(msg)
        onComplete?.()
      }
    }, 60)
  }

  function toggleTraining() {
    const next = !training
    setTraining(next)
    trainingRef.current = next
    if (next) runTraining()
    else clearInterval(intervalRef.current)
  }

  function resetAll() {
    clearInterval(intervalRef.current)
    setTraining(false); trainingRef.current = false
    setEpoch(0); setDone(false)
    lossHistoryRef.current = []
    netRef.current = initNetwork()
    netRef.current.__epoch = 0
    setLoss(null); setAcc(null)
    setExplanation('<strong>How it works:</strong> This network has 4 inputs (fur length, ear shape, tail length, size) → 4 hidden neurons → 1 output (0 = cat, 1 = dog). Click <strong>Train</strong> to watch it learn from 20 synthetic examples using backpropagation. The glowing edges show which connections fire most strongly for the current sample.')
    drawLoss()
    updateDisplay(sampleIdx)
  }

  function nextSample() {
    setSampleIdx((i) => (i + 1) % samplesRef.current.length)
  }

  const s = samplesRef.current[sampleIdx]
  const { a1, a2 } = forward(netRef.current, s.x)
  const catP = Math.round((1 - a2) * 100), dogP = Math.round(a2 * 100)
  const pred = Math.round(a2), correct = pred === s.label
  const lossClass = loss == null ? '' : loss > 0.5 ? 'bad' : loss > 0.2 ? 'med' : 'good'
  const accClass = acc == null ? '' : acc >= 0.9 ? 'good' : acc >= 0.7 ? 'med' : 'bad'

  return (
    <div className="nn-container">
      <div className="nn-header">
        <div className="nn-title">Neural network — cat vs dog classifier</div>
        <div className="nn-epoch-badge">Epoch {epoch} / 100</div>
      </div>
      <div className="nn-controls">
        <button className="nn-btn-primary" onClick={toggleTraining} disabled={done}>
          {done ? '✓ Done' : training ? '⏸ Pause' : '▶ Train'}
        </button>
        <button className="nn-btn-secondary" onClick={resetAll}>Reset</button>
        <button className="nn-btn-secondary" onClick={nextSample}>Next sample</button>
        <div className="nn-speed-wrap">
          <span className="nn-speed-label">Speed</span>
          <input
            type="range" min="1" max="10" step="1" value={speed}
            onChange={(e) => {
              const v = +e.target.value
              setSpeed(v)
              if (trainingRef.current) { clearInterval(intervalRef.current); runTraining() }
            }}
          />
          <span className="nn-speed-label">{speed}×</span>
        </div>
      </div>
      <div className="nn-stats-row">
        <div className="nn-stat-card"><div className="nn-stat-label">Loss</div><div className={'nn-stat-value ' + lossClass}>{loss == null ? '—' : loss.toFixed(3)}</div></div>
        <div className="nn-stat-card"><div className="nn-stat-label">Accuracy</div><div className={'nn-stat-value ' + accClass}>{acc == null ? '—' : Math.round(acc * 100) + '%'}</div></div>
        <div className="nn-stat-card"><div className="nn-stat-label">Learning rate</div><div className="nn-stat-value">0.1</div></div>
      </div>
      <div className="nn-main-grid">
        <div className="nn-network-wrap"><canvas className="nn-canvas-net" ref={netCanvasRef} width="420" height="280" /></div>
        <div className="nn-side-panel">
          <div className="nn-sample-display">
            <div className="nn-sample-title">Current sample</div>
            <span className="nn-animal-emoji">{s.emoji}</span>
            <div className="nn-sample-title" style={{ marginTop: 8 }}>Features</div>
            <div className="nn-sample-features">
              {s.x.map((v, i) => (
                <div className="nn-feature-row" key={i}>
                  <span className="nn-feature-name">{FEATURES[i]}</span>
                  <div className="nn-feature-bar-wrap">
                    <div className="nn-feature-bar" style={{ width: Math.round(v * 100) + '%', background: FEAT_COLORS[i] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="nn-prediction-box">
            <div className="nn-pred-title">Network output</div>
            <div className="nn-pred-row"><span className="nn-pred-animal">🐱 Cat</span><span className="nn-pred-pct">{catP}%</span></div>
            <div className="nn-pred-bar-wrap"><div className="nn-pred-bar" style={{ width: catP + '%', background: '#1D9E75' }} /></div>
            <div className="nn-pred-row"><span className="nn-pred-animal">🐶 Dog</span><span className="nn-pred-pct">{dogP}%</span></div>
            <div className="nn-pred-bar-wrap"><div className="nn-pred-bar" style={{ width: dogP + '%', background: '#7F77DD' }} /></div>
            <div className={'nn-verdict ' + (correct ? 'correct' : 'wrong')}>{correct ? '✓ Correct' : '✗ Wrong'}</div>
          </div>
        </div>
      </div>
      <div className="nn-loss-section">
        <div className="nn-loss-header">
          <span className="nn-loss-title">Training loss curve</span>
          <span className="nn-loss-title">{training ? 'Training...' : done ? 'Training complete!' : ''}</span>
        </div>
        <canvas className="nn-canvas-loss" ref={lossCanvasRef} width="660" height="84" />
      </div>
      <div className="nn-explanation-box"><div className="nn-explanation-text" dangerouslySetInnerHTML={{ __html: explanation }} /></div>
    </div>
  )
}
