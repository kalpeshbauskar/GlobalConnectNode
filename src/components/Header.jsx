import { useState } from 'react'
import { withBase } from '../assetPath'

const NAV_LINKS = [
  ['home', 'Home'],
  ['courses', 'Sessions'],
  ['videos', 'Videos'],
  ['simulations', 'Activities'],
  ['games', 'Games'],
  ['codelab', 'Code Lab'],
  ['dashboard', 'Dashboard'],
  ['about', 'About'],
]

export default function Header({ page, onNavigate, studentLabel }) {
  const [open, setOpen] = useState(false)

  function go(id) {
    onNavigate(id)
    setOpen(false)
  }

  return (
    <header className="top">
      <div className="nav">
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); go('home') }}>
          <span className="logo"><img src={withBase('GC.png')} alt="Global Connect" /></span>
        </a>
        <button className="menu" onClick={() => setOpen((o) => !o)}>Menu</button>
        <nav className={'links' + (open ? ' open' : '')}>
          {NAV_LINKS.map(([id, label]) => (
            <a
              key={id}
              href="#"
              className={page === id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); go(id) }}
            >
              {label}
            </a>
          ))}
        </nav>
        <span className="student-pill">{studentLabel}</span>
      </div>
    </header>
  )
}
