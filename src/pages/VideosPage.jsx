import { useState } from 'react'
import { allVideos } from '../data/sessions'

export default function VideosPage({ progress, addProgress, saveNote }) {
  const [index, setIndex] = useState(0)
  const [noteDraft, setNoteDraft] = useState(progress.notes[allVideos[0].id] || '')
  const [noteStatus, setNoteStatus] = useState('')

  const current = allVideos[index]
  const isComplete = progress.videos.includes(current.id)

  function selectVideo(i) {
    setIndex(i)
    setNoteDraft(progress.notes[allVideos[i].id] || '')
    setNoteStatus('')
  }

  function handleMarkComplete() {
    addProgress('videos', current.id)
  }

  function handleSaveNote() {
    saveNote(current.id, noteDraft)
    setNoteStatus('Note saved for this video.')
  }

  return (
    <section className="page wrap">
      <div className="section-head">
        <p className="eyebrow">AI & Technology Video Theater</p>
        <h2>Videos with notes, data, and activity</h2>
        <p>Select any session video. Students can watch, save notes, read key data, and complete one activity for that video.</p>
      </div>
      <div className="video-layout">
        <div>
          <div className="player">
            <iframe
              title="Lesson video"
              src={`https://www.youtube.com/embed/${current.id}`}
              allowFullScreen
              loading="lazy"
            />
          </div>
          <div className="stage">
            <h3>{current.title}</h3>
            <p>{current.task}</p>
            <div className="video-tools">
              <div className="mini-panel">
                <h4>Important data</h4>
                <p>{current.data}</p>
              </div>
              <div className="mini-panel">
                <h4>Student activity</h4>
                <p>{current.activity}</p>
              </div>
              <div className="mini-panel">
                <h4>Your notes</h4>
                <textarea
                  className="note-box"
                  placeholder="Write your own notes for this video..."
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                />
                <button className="btn secondary" onClick={handleSaveNote}>Save note</button>
              </div>
              <div className="mini-panel">
                <h4>Completion</h4>
                <button className="btn good" onClick={handleMarkComplete}>
                  {isComplete ? 'Completed ✓' : 'Mark video complete'}
                </button>
                <p className="hint">{noteStatus}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="playlist">
          {allVideos.map((v, i) => (
            <button
              key={v.id + i}
              className={'lesson' + (i === index ? ' active' : '')}
              onClick={() => selectVideo(i)}
            >
              <strong>{v.num} {v.title}</strong>
              <small>{v.icon} {v.session}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
