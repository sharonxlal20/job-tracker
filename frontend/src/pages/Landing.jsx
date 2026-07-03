import { Link } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';
import Reveal from '../components/Reveal';
import './Landing.css';

function BoardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="6" height="16" rx="1" />
      <rect x="10.5" y="4" width="6" height="10" rx="1" />
      <rect x="18" y="4" width="3" height="7" rx="1" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function StampIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="12" rx="1.5" strokeDasharray="3 2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.73 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.73.8 1.17 1.82 1.17 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  );
}

const FEATURES = [
  { icon: BoardIcon, title: 'Kanban pipeline', text: 'See every application at every stage — Applied, Interview, Offer, Rejected — laid out in one board.' },
  { icon: SearchIcon, title: 'Search, filter & sort', text: 'Find any application by company or role, filter by status, sort however makes sense to you.' },
  { icon: StampIcon, title: 'Stamped status badges', text: "Every card gets a hand-stamped badge for its status — a small visual signature, not a generic pill." },
  { icon: MoonIcon, title: 'Dark mode', text: 'Switch instantly — it remembers your preference the next time you\'re back.' },
];

const STATS = [
  { value: '32+', label: 'Avg. applications before an offer', color: 'var(--applied)' },
  { value: '44 days', label: 'Avg. time-to-hire', color: 'var(--interview)' },
  { value: '2-3%', label: 'Applications that reach interview', color: 'var(--offer)' },
  { value: '18×', label: 'More likely to get hired via referral', color: 'var(--rejected)' },
];

const QUOTES = [
  { text: 'It always seems impossible until it is done.', author: 'Nelson Mandela' },
  { text: 'You are braver than you believe, stronger than you seem, and smarter than you think.', author: 'A.A. Milne' },
  { text: 'Fall seven times, stand up eight.', author: 'Japanese Proverb' },
];

function Landing() {
  return (
    <div className="landing">
      <LandingNavbar />

      <section className="landing-hero">
        <div className="landing-hero-text">
          <h1>Every application,<br />stamped and sorted.</h1>
          <p>A colorful Kanban board for tracking job applications — from first apply to final offer, one stamp at a time.</p>
          <div className="landing-hero-actions">
            <Link to="/signup" className="landing-cta-primary">Get started</Link>
            <Link to="/login" className="landing-cta-secondary">Log in</Link>
          </div>
        </div>

        <div className="landing-hero-visual">
          <div className="mini-board-frame">
            <div className="mini-board-dots">
              <span></span><span></span><span></span>
            </div>
            <div className="mini-board">
              <div className="mini-column">
                <div className="mini-column-label"><span className="mini-dot" style={{ background: 'var(--applied)' }}></span>Applied</div>
                <div className="mini-card">
                  <div className="mini-card-title">Google</div>
                  <div className="mini-card-role">SDE Intern</div>
                  <div className="mini-card-stamp" style={{ borderColor: 'var(--applied)', color: 'var(--applied-text)' }}>applied</div>
                </div>
                <div className="mini-card">
                  <div className="mini-card-title">Amazon</div>
                  <div className="mini-card-role">Backend Dev</div>
                  <div className="mini-card-stamp" style={{ borderColor: 'var(--applied)', color: 'var(--applied-text)' }}>applied</div>
                </div>
              </div>
              <div className="mini-column">
                <div className="mini-column-label"><span className="mini-dot" style={{ background: 'var(--interview)' }}></span>Interview</div>
                <div className="mini-card">
                  <div className="mini-card-title">Microsoft</div>
                  <div className="mini-card-role">Backend Dev</div>
                  <div className="mini-card-stamp" style={{ borderColor: 'var(--interview)', color: 'var(--interview-text)' }}>interview</div>
                </div>
              </div>
              <div className="mini-column">
                <div className="mini-column-label"><span className="mini-dot" style={{ background: 'var(--offer)' }}></span>Offer</div>
                <div className="mini-card">
                  <div className="mini-card-title">Flipkart</div>
                  <div className="mini-card-role">Frontend Dev</div>
                  <div className="mini-card-stamp" style={{ borderColor: 'var(--offer)', color: 'var(--offer-text)' }}>offer</div>
                </div>
              </div>
              <div className="mini-column">
                <div className="mini-column-label"><span className="mini-dot" style={{ background: 'var(--rejected)' }}></span>Rejected</div>
                <div className="mini-card mini-card-faded">
                  <div className="mini-card-title">Uber</div>
                  <div className="mini-card-role">HR</div>
                  <div className="mini-card-stamp" style={{ borderColor: 'var(--rejected)', color: 'var(--rejected-text)' }}>rejected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="landing-stats-section">
            <h2 className="landing-stats-heading">The job hunt is a numbers game</h2>
            <div className="landing-stats">
                {STATS.map((stat) => (
                    <div className="stat-item" key={stat.label}>
                        <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                    </div>
                ))}
            </div>
            <p className="landing-stats-note">All the more reason every application deserves a proper place on your board.</p>
        </section>
      </Reveal>

      <section className="landing-features">
        <Reveal>
          <h2>Everything your job hunt actually needs</h2>
        </Reveal>
        <div className="feature-grid">
          {FEATURES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="feature-card">
                <div className="feature-icon"><Icon /></div>
                <div className="feature-title">{title}</div>
                <div className="feature-text">{text}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="landing-quotes">
        <Reveal>
          <h2>For the days that feel discouraging</h2>
        </Reveal>
        <div className="quotes-grid">
          {QUOTES.map((q, i) => (
            <Reveal key={q.author} delay={i * 80}>
              <div className="quote-card">
                <div className="quote-mark">"</div>
                <p className="quote-text">{q.text}</p>
                <div className="quote-author">— {q.author}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-top">
          <div>
            <div className="landing-footer-brand">job tracker</div>
            <div className="landing-footer-copy">Built by Sharon — a MERN stack project for placement season.</div>
          </div>
          <div className="landing-footer-links">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
          <div className="landing-footer-social">
            <a href="https://github.com/sharonxlal20" target="_blank" rel="noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href="https://linkedin.com/in/sharonabhisheklal" target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;