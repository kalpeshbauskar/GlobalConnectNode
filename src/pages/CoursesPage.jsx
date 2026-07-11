import { sessions } from '../data/sessions'

export default function CoursesPage({ onNavigate }) {
  return (
    <section className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Learning Roadmap</p>
        <h2>Complete AI, coding, and technology path</h2>
        <p>
          Beyond traditional learning, every Global Connect session inspires curiosity through videos, global
          insights, interactive activities, and practical experiences — helping students learn by doing
        </p>
      </div>
      <div className="grid">
        {sessions.map((s) => (
          <article className="card" key={s.title}>
            {s.img ? (
              <img className="course-img" src={s.img} alt={s.title} />
            ) : (
              <div className="bubble">{s.icon}</div>
            )}
            <h3>{s.title}</h3>
            <p>{s.data}</p>
            <div className="tagrow">
              <span className="tag">Project: {s.project}</span>
              <span className="tag">Activity included</span>
            </div>
            <a className="btn secondary" href="#" onClick={(e) => { e.preventDefault(); onNavigate('videos') }}>
              Open videos
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
