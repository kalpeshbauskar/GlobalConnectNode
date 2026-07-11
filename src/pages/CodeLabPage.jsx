import { useEffect, useMemo, useState } from 'react'
import { compilerLinks, templates } from '../data/sessions'

const LANGS = Object.keys(templates)
const CHALLENGES = ['Basic output', 'AI idea', 'Student project']
const INLINE_LANGS = ['html', 'css', 'javascript', 'python']

function runMiniPython(code) {
  const vars = {}
  const out = []
  for (const raw of code.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    if (line.includes('=') && !line.startsWith('print')) {
      const parts = line.split('=')
      vars[parts[0].trim()] = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '')
      continue
    }
    if (line.startsWith('print')) {
      const inside = line.slice(line.indexOf('(') + 1, line.lastIndexOf(')'))
      out.push(
        inside.split(',').map((p) => vars[p.trim()] ?? p.trim().replace(/^['"]|['"]$/g, '')).join(' ')
      )
    }
  }
  return out.join('\n') || 'Python beginner code ran.'
}

export default function CodeLabPage({ addProgress }) {
  const [lang, setLang] = useState('html')
  const [challenge, setChallenge] = useState(CHALLENGES[0])
  const [code, setCode] = useState(templates.html)
  const [output, setOutput] = useState('')
  const [previewSrc, setPreviewSrc] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const tips = useMemo(
    () => (INLINE_LANGS.includes(lang) ? 'This runs in this page.' : `Use the full compiler link for complete ${lang.toUpperCase()} execution.`),
    [lang]
  )

  useEffect(() => {
    run('html', templates.html, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setCodeForLang(l, ch) {
    setCode(templates[l])
    run(l, templates[l], false)
  }

  function handleLangChange(e) {
    const l = e.target.value
    setLang(l)
    setCodeForLang(l, challenge)
  }

  function handleChallengeChange(e) {
    setChallenge(e.target.value)
  }

  function handleReset() {
    setCode(templates[lang])
    run(lang, templates[lang], false)
  }

  function run(l, src, countProgress) {
    let out = ''
    let preview = false
    try {
      if (l === 'html') {
        preview = true
        setPreviewSrc(src)
      } else if (l === 'css') {
        preview = true
        setPreviewSrc('<style>' + src.replace(/<\/style/gi, '<\\/style') + '</style><h1>CSS Preview</h1><p>Style is working.</p>')
      } else if (l === 'javascript') {
        const logs = []
        // eslint-disable-next-line no-new-func
        new Function('console', src)({ log: (...a) => logs.push(a.join(' ')) })
        out = logs.join('\n') || 'Code ran successfully.'
      } else if (l === 'python') {
        out = runMiniPython(src)
      } else {
        out = `Template ready. Open the free compiler for full ${l.toUpperCase()} running.`
      }
    } catch (e) {
      out = 'Error: ' + e.message
    }
    setShowPreview(preview)
    setOutput(out)
    if (countProgress) addProgress('code')
  }

  function handleRun() {
    run(lang, code, true)
  }

  return (
    <section className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Coding Platform</p>
        <h2>Working browser code lab</h2>
        <p>HTML, CSS, and JavaScript run live here. Beginner Python logic runs in the page. Other languages include templates and free compiler links.</p>
      </div>
      <div className="notice">
        A free static website cannot securely run every programming language on its own server. This lab runs safe browser code and connects students to free full compilers for advanced languages.
      </div>
      <div className="code-grid" style={{ marginTop: 20 }}>
        <aside className="codebox">
          <h3>Choose language</h3>
          <div className="select-row">
            <select value={lang} onChange={handleLangChange}>
              {LANGS.map((l) => <option key={l} value={l}>{l.toUpperCase()}</option>)}
            </select>
            <select value={challenge} onChange={handleChallengeChange}>
              {CHALLENGES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <p>Practice {challenge} in {lang.toUpperCase()}.</p>
          <div className="actions">
            <button className="btn primary" onClick={handleRun}>Run Code</button>
            <button className="btn secondary" onClick={handleReset}>Reset</button>
            <a className="btn secondary" href={compilerLinks[lang]} target="_blank" rel="noopener noreferrer">Full Compiler</a>
          </div>
          <div className="result">{tips}</div>
        </aside>
        <section className="codebox">
          <h3>Editor</h3>
          <textarea spellCheck="false" value={code} onChange={(e) => setCode(e.target.value)} />
          <h3>Output</h3>
          <div className="console" style={{ display: showPreview ? 'none' : 'block' }}>{output}</div>
          <iframe title="Live preview" srcDoc={previewSrc} style={{ display: showPreview ? 'block' : 'none' }} />
        </section>
      </div>
    </section>
  )
}
