import { useState } from 'react'

export default function PromptBuilder() {
  const [role, setRole] = useState('friendly AI teacher')
  const [task, setTask] = useState('explain machine learning')
  const [audience, setAudience] = useState('Class 8 students')
  const [format, setFormat] = useState('5 easy bullet points')
  const [safety, setSafety] = useState('include one safe AI rule')

  const output = `You are a ${role}. Please ${task} for ${audience}. Use ${format}, one school example, simple words, and ${safety}.`

  return (
    <div>
      <h3>Prompt Builder</h3>
      <div className="sim-shell">
        <div className="controls">
          <label>Role<input value={role} onChange={(e) => setRole(e.target.value)} /></label>
          <label>Task<input value={task} onChange={(e) => setTask(e.target.value)} /></label>
          <label>Audience<input value={audience} onChange={(e) => setAudience(e.target.value)} /></label>
          <label>Format<input value={format} onChange={(e) => setFormat(e.target.value)} /></label>
          <label>Safety<input value={safety} onChange={(e) => setSafety(e.target.value)} /></label>
          <button className="btn primary">Build Prompt</button>
        </div>
        <div className="result">{output}</div>
      </div>
    </div>
  )
}
