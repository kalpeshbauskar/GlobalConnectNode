import { withBase } from '../assetPath'

export default function AboutPage() {
  return (
    <section className="page wrap">
      <div className="about-hero">
        <div className="about-copy">
          <p className="eyebrow long">Knowledge Has No Borders.</p>
          <h2>About Global Connect</h2>
          <p><strong>Global Connect</strong> is an educational initiative focused on bringing global exposure, advanced technology, and future-ready skills to students at the grassroots level.</p>
          <p style={{ marginTop: 14 }}>
            We believe that <strong>talent is distributed equally, but opportunities are not</strong>. Global Connect
            works to bridge the exposure gap by connecting students with Artificial Intelligence, digital literacy,
            coding, innovation, and global mentorship opportunities.
          </p>
          <p style={{ marginTop: 14 }}>
            Through interactive sessions, practical activities, expert mentorship, and technology-driven learning, we
            aim to transform students from technology users into creators and innovators.
          </p>
        </div>
        <div className="about-badge-card">
          <span className="glyph">🌐</span>
          <h3>Global Connect</h3>
          <p>Connecting rural classrooms to global knowledge, one session at a time.</p>
        </div>
      </div>

      <div className="vm-grid">
        <div className="card vm-card">
          <span className="glyph">🧭</span>
          <h3>Our Vision</h3>
          <p className="vm-quote">"Democratizing Global Exposure for the Grassroots"</p>
          <p>
            Our vision is to create a world where every student gets access to global knowledge, regardless of their
            geographical location or background. We aim to bring international mentorship, advanced technology, and
            innovative learning experiences into classrooms — ensuring that every student gets the opportunity to
            explore, create, and lead the future.
          </p>
        </div>
        <div className="card vm-card">
          <span className="glyph">🎯</span>
          <h3>Our Mission</h3>
          <p>
            To empower students with future-ready skills by creating a bridge between rural classrooms and global
            innovation. Our mission is not only to teach technology but to build confidence, creativity, and global
            thinking among students.
          </p>
          <div className="focus-pills">
            <span className="focus-pill">🤖 AI &amp; Digital Literacy</span>
            <span className="focus-pill">💻 Coding &amp; Tech Skills</span>
            <span className="focus-pill">🌍 Global Expert Connections</span>
            <span className="focus-pill">🎯 Project-Based Learning</span>
            <span className="focus-pill">🚀 Innovation Mindset</span>
          </div>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 46 }}>
        <p className="eyebrow">Our Objectives</p>
        <h2>What we're working to achieve</h2>
        <p>Five clear goals guide every Global Connect session, partnership, and project.</p>
      </div>
      <div className="obj-grid">
        <div className="card obj-card">
          <div className="obj-num">01</div>
          <h4>Reduce the Opportunity Gap</h4>
          <p>Provide equal access to modern education and global exposure for students from different communities.</p>
        </div>
        <div className="card obj-card">
          <div className="obj-num">02</div>
          <h4>Build Future Skills</h4>
          <p>Introduce students to AI, coding, digital tools, and emerging technologies.</p>
        </div>
        <div className="card obj-card">
          <div className="obj-num">03</div>
          <h4>Create Global Connections</h4>
          <p>Connect learners with international professionals, educators, and mentors.</p>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 46 }}>
        <p className="eyebrow">Our Team</p>
        <h2>Meet the people behind Global Connect</h2>
        <p>A small team with a big goal — bringing global knowledge to every classroom.</p>
      </div>
      <div className="team-lead-grid">
        <div className="card team-card">
          <img className="team-avatar-photo" src={withBase('team/nachiket-bhadrapur.png')} alt="Mr. Nachiket Bhadrapur" />
          <h4>Mr. Nachiket Bhadrapur</h4>
          <p className="team-role">Founder &amp; Strategic Leader</p>
          <p className="team-org">Hope Foundation · Social Entrepreneur</p>
          <p className="team-bio">Leading the vision of creating social impact through education and innovation.</p>
        </div>
        <div className="card team-card">
          <img className="team-avatar-photo" src={withBase('team/omkar-shinde.png')} alt="Mr. Omkar Shinde" />
          <h4>Mr. Omkar Shinde</h4>
          <p className="team-role">CEO – Global Connect</p>
          <p className="team-org">AI Educator · Innovation Leader</p>
          <p className="team-bio">Working towards making AI education accessible and creating future-ready learning experiences for students.</p>
        </div>
      </div>
      <div className="team-groups">
        <div className="card team-group">
          <h4>Teaching Team</h4>
          <p className="group-tag">Bringing every session to life in the classroom</p>
          <div className="namepill-row">
            <span className="namepill">Rani Hasurkar</span>
            <span className="namepill">Prajakta Patade</span>
            <span className="namepill">Snehal Kamble</span>
            <span className="namepill">Jayashri Kamble</span>
          </div>
        </div>
        <div className="card team-group">
          <h4>Project Coordinators</h4>
          <p className="group-tag">Keeping every initiative on track</p>
          <div className="namepill-row">
            <span className="namepill">Ramkrishna Sawant</span>
            <span className="namepill">Vaibhav Powar</span>
            <span className="namepill">Sujay Desai</span>
            <span className="namepill">Sakib Jamadar</span>
            <span className="namepill">Priyanka Sawant</span>
            <span className="namepill">Pradnyant Shelar</span>
          </div>
        </div>
      </div>

      <div className="section-head" style={{ marginTop: 46 }}>
        <p className="eyebrow">Testimonials</p>
        <h2>Voices of Global Connect</h2>
        <p>What students, mentors, and partners say about learning and teaching with us.</p>
      </div>
      <div className="testi-grid">
        <div className="card testi-card">
          <p className="testi-tag">Student Experience</p>
          <p className="testi-quote">"Before Global Connect, Artificial Intelligence and coding felt like something only big city students could learn. Now I understand that even from a rural classroom, I can dream globally and create technology."</p>
          <p className="testi-who">Sanika Chavan</p>
          <p className="testi-org">Student Representative, Princess Padmaraje Girls High School</p>
        </div>
        <div className="card testi-card">
          <p className="testi-tag">Educator Experience</p>
          <p className="testi-quote">"Global Connect has transformed the learning environment by bringing AI, coding, and global exposure directly into classrooms."</p>
          <p className="testi-who">Rani Hasurkar</p>
          <p className="testi-org">Senior Educator</p>
        </div>
        <div className="card testi-card">
          <p className="testi-tag">Academic Partner Experience</p>
          <p className="testi-quote">"Global Connect bridges academic learning with real-world industry skills and prepares students for the future economy."</p>
          <p className="testi-who">Sonia Rajput</p>
          <p className="testi-org">CSIBER Institute</p>
        </div>
      </div>

      <div className="about-cta">
        <h2>Join the Global Connect Movement</h2>
        <p><strong>One connection can change a student's future.</strong></p>
        <p>Together, we can bring global knowledge to every classroom.</p>
        <p className="tagline">GLOBAL CONNECT · Empowering Students. Shaping Futures.</p>
      </div>
    </section>
  )
}
