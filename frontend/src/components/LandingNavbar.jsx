import { Link } from 'react-router-dom';
import './LandingNavbar.css';

function LandingNavbar() {
  return (
    <nav className="landing-navbar">
      <Link to="/" className="landing-navbar-brand">job tracker</Link>
      <div className="landing-navbar-right">
        <Link to="/login" className="landing-navbar-login">Log in</Link>
        <Link to="/signup" className="landing-navbar-cta">Get started</Link>
      </div>
    </nav>
  );
}

export default LandingNavbar;