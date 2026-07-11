import { useEffect, useState } from 'react'
import { simDefs } from '../data/sessions'
import { withBase } from '../assetPath'
import NeuralNetLab from '../components/NeuralNetLab'
import PromptBuilder from '../components/PromptBuilder'
import PixelVision from '../components/PixelVision'

const IFRAME_SIM = {
  session1quiz: { title: 'Session 1 Quiz', desc: 'Test your knowledge of AI basics.', src: withBase('games/session1-quiz.html') },
  session2quiz: { title: 'Session 2 Quiz', desc: 'AI concepts, prompting, and ethics challenge.', src: withBase('games/session2-quiz.html') },
  promptsorter: { title: 'The Prompt Sorter', desc: 'Sort prompts: normal chat or Game Maker?', src: withBase('games/prompt-sorter.html') },
}

export default function SimulationsPage({ addProgress }) {
  const [active, setActive] = useState(0)
  const [frameHeights, setFrameHeights] = useState({})

  const activeId = simDefs[active][0]

  useEffect(() => {
    addProgress('sims', activeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId])

  useEffect(() => {
    function onMessage(e) {
      if (!e.data || typeof e.data.gcGameHeight !== 'number') return
      const h = Math.max(300, Math.min(500, Math.round(e.data.gcGameHeight) + 4))
      setFrameHeights((prev) => ({ ...prev, [activeId]: h }))
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [activeId])

  return (
    <section className="page wrap">
      <div className="section-head">
        <p className="eyebrow">AI Simulation Lab</p>
        <h2>Interactive concept activities</h2>
        <p>Simple browser-based labs and quizzes help students understand prediction, prompting, computer vision, and AI ethics.</p>
      </div>
      <div className="tabs">
        {simDefs.map((s, i) => (
          <button key={s[0]} className={'tab' + (i === active ? ' active' : '')} onClick={() => setActive(i)}>
            {s[1]}
            <small>{s[2]}</small>
          </button>
        ))}
      </div>
      <div className="stage">
        {activeId === 'neural' && <NeuralNetLab onComplete={() => addProgress('sims', 'neural')} />}
        {activeId === 'prompt' && <PromptBuilder />}
        {activeId === 'vision' && <PixelVision />}
        {IFRAME_SIM[activeId] && (
          <>
            <h3>{IFRAME_SIM[activeId].title}</h3>
            <p>{IFRAME_SIM[activeId].desc}</p>
            <div className="game-frame-wrap">
              <iframe
                title={IFRAME_SIM[activeId].title}
                src={IFRAME_SIM[activeId].src}
                loading="lazy"
                style={{ height: (frameHeights[activeId] || 400) + 'px' }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
