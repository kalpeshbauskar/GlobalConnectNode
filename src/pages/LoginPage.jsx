import { useMemo, useRef, useState } from 'react'
import { colleges, schoolPasswords } from '../data/sessions'

const PROFILE_KEY = 'gc-ai4all-profile-v3'

function loadProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY) || '') || null
  } catch {
    return null
  }
}

function makeCollegeId(name, code) {
  const seed = ((name || 'STUDENT') + code).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return 'GC-' + code + '-' + String(1000 + (seed * 37) % 9000)
}

const SOCIALS = [
  ['f', 'Facebook', 'https://www.facebook.com/profile.php?id=61591536847369'],
  ['▶', 'YouTube', 'https://www.youtube.com/@GlobalConnect4All'],
  ['◎', 'Instagram', 'https://www.instagram.com/globalconnect.india/'],
  ['in', 'LinkedIn', 'https://www.linkedin.com/company/project-global-connect/?viewAsMember=true'],
]

export default function LoginPage({ onEnter }) {
  const [mode, setMode] = useState('in')
  const savedProfile = useMemo(loadProfile, [])
  const authRef = useRef(null)

  const [loginId, setLoginId] = useState(savedProfile ? savedProfile.collegeId : '')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState(
    savedProfile ? 'Saved profile found. Enter your password to continue.' : ''
  )

  const [studentName, setStudentName] = useState('')
  const [studentClass, setStudentClass] = useState('Class 7')
  const [collegeCode, setCollegeCode] = useState(colleges[0].code)
  const [newPassword, setNewPassword] = useState('')
  const [signUpMessage, setSignUpMessage] = useState('')

  const collegeIdPreview = makeCollegeId(studentName, collegeCode)

  function goToAuth(targetMode) {
    setMode(targetMode)
    authRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleSignIn(e) {
    e.preventDefault()
    const profile = loadProfile()
    if (profile && loginId.trim().toUpperCase() === profile.collegeId && loginPassword === profile.password) {
      onEnter(profile)
    } else {
      setLoginMessage('Please check your college ID/password, or create a new sign up profile first.')
    }
  }

  function handleSignUp(e) {
    e.preventDefault()
    const entered = newPassword.trim()
    if (entered.toUpperCase() !== schoolPasswords[collegeCode]) {
      setSignUpMessage('Incorrect school password. Please check with your teacher and try again.')
      return
    }
    const collegeName = colleges.find((c) => c.code === collegeCode)?.name || ''
    const profile = {
      name: studentName.trim(),
      className: studentClass,
      college: collegeName,
      collegeId: makeCollegeId(studentName, collegeCode),
      password: entered,
    }
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
    onEnter(profile)
  }

  return (
    <div className="landing">
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <span className="landing-logo-mark">🌐</span>
            <span className="landing-logo-text"><strong>GLOBAL</strong><small>CONNECT</small></span>
          </div>
          <div className="landing-search">
            <span>🔍</span>
            <input placeholder="Search" disabled />
          </div>
          <div className="landing-social">
            {SOCIALS.map(([glyph, name, url]) => (
              <a key={name} className="landing-social-icon" title={name} href={url} target="_blank" rel="noopener noreferrer">{glyph}</a>
            ))}
          </div>
          <div className="landing-auth-btns">
            <button className="btn secondary" onClick={() => goToAuth('in')}>Sign in</button>
            <button className="btn primary" onClick={() => goToAuth('up')}>Sign up</button>
          </div>
        </div>
      </nav>

      <section className="story-hero">
        <div className="story-badge">MADE <span>IN</span> INDIA<small>Connecting the World</small></div>
        <div className="story-hero-inner">
          <p className="story-tagline">Vasudhaiva Kutumbakam</p>
          <h1 className="story-heading">
            The Story of Global Connect:<br />
            <span className="story-heading-accent">Where Geography No Longer Dictates Destiny</span>
          </h1>
          <div className="story-columns">
            <div className="story-col">
              <p>Imagine a classroom where the chalkboard is the only window to the world.</p>
              <p>For generations, brilliance in rural schools has been quietly sidelined — not because these students lacked intelligence, but simply because they lacked a bridge to the future.</p>
              <p>While the rest of the world sprinted toward artificial intelligence and boundless digital frontiers, these young minds were left navigating yesterday's syllabus. Talent, as we know, is distributed equally across the globe — but opportunity is fiercely unequal.</p>
              <p><strong>At Global Connect, we decided it was time to shatter that glass ceiling.</strong></p>
            </div>
            <div className="story-col">
              <h4>✨ The Spark of a Borderless Classroom</h4>
              <p>We launched Project Global Connect with a radical, unshakeable belief:</p>
              <blockquote>A child in a village with a laptop and a global mentor is no longer just a village student — they are a global student.</blockquote>
              <p>We didn't want to just pass around a collection plate. We knew the most valuable currency in the modern world is insight, experience, and time.</p>
              <p><strong>"We never demand your money; we want just your knowledge."</strong></p>
            </div>
            <div className="story-col">
              <h4>🎻 Your Invitation to the Symphony</h4>
              <p>Education is a global symphony, not a solo.</p>
              <p>Whether you are a degree student, financial analyst in New York, a developer in Tokyo, or a social entrepreneur in the future — your professional journey can become a rural student's roadmap to the future.</p>
              <p>By donating just one hour of your time, you show these brilliant young minds that they belong in the global conversation.</p>
              <p className="story-cta-line">We are building a truly borderless world.<br />Are you ready to connect?</p>
              <button className="btn primary story-join-btn" onClick={() => goToAuth('up')}>Join Us</button>
            </div>
          </div>
        </div>
        <button className="scroll-hint" onClick={() => authRef.current?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to sign in">⌄</button>
      </section>

      <section className="login-page" id="loginPage" ref={authRef}>
        <div className="login-card auth-only">
          <div className="auth">
            <div className="auth-tabs">
              <button className={'auth-tab' + (mode === 'in' ? ' active' : '')} onClick={() => setMode('in')}>Sign in</button>
              <button className={'auth-tab' + (mode === 'up' ? ' active' : '')} onClick={() => setMode('up')}>Sign up</button>
            </div>

            <form className={mode !== 'in' ? 'hide' : ''} onSubmit={handleSignIn}>
              <h2>Welcome back</h2>
              <p className="hint">Use the college ID generated during sign up and your password.</p>
              <div className="field">
                <label>College ID</label>
                <input placeholder="Example: GC-DEL-4821" required value={loginId} onChange={(e) => setLoginId(e.target.value)} />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </div>
              <button className="btn primary" style={{ width: '100%' }}>Enter Learning Platform</button>
              <p className="hint">{loginMessage}</p>
            </form>

            <form className={mode !== 'up' ? 'hide' : ''} onSubmit={handleSignUp}>
              <h2>Create student profile</h2>
              <div className="field">
                <label>Name</label>
                <input placeholder="Student name" required value={studentName} onChange={(e) => setStudentName(e.target.value)} />
              </div>
              <div className="field">
                <label>Class</label>
                <select value={studentClass} onChange={(e) => setStudentClass(e.target.value)}>
                  <option>Class 7</option>
                  <option>Class 8</option>
                  <option>Class 9</option>
                  <option>Class 10</option>
                </select>
              </div>
              <div className="field">
                <label>College / School</label>
                <select value={collegeCode} onChange={(e) => setCollegeCode(e.target.value)}>
                  {colleges.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>School Password</label>
                <input
                  type="password"
                  placeholder="Ask your teacher for your school's password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="id-preview">Your college ID: <span>{collegeIdPreview}</span></div>
              <button className="btn primary" style={{ width: '100%', marginTop: 14 }}>Create Account & Start</button>
              <p className="hint">{signUpMessage}</p>
              <p className="hint">No server, no money, no database. This profile is saved in browser storage only.</p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
