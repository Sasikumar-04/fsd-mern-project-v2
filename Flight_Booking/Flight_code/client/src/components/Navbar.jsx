
import React, { useContext } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const { logout } = useContext(GeneralContext);

  return (
    <header className="topbar">
      <div
        className="topbar-logo"
        onClick={() =>
          usertype === 'admin'
            ? navigate('/admin')
            : usertype === 'flight-operator'
            ? navigate('/flight-admin')
            : navigate('/')
        }
      >
        <span className="logo-mark">✈</span>
        <span className="logo-text">OrbitJet</span>
      </div>

      {!usertype ? (
        <nav className="topbar-links">
          <button
            className="nav-link-button"
            onClick={() => navigate('/')}
          >
            Explore
          </button>
          <button
            className="nav-link-button primary-nav-btn"
            onClick={() => navigate('/auth')}
          >
            Sign in
          </button>
        </nav>
      ) : usertype === 'customer' ? (
        <nav className="topbar-links">
          <button
            className="nav-link-button"
            onClick={() => navigate('/')}
          >
            Find flights
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/bookings')}
          >
            My trips
          </button>
          <button
            className="nav-link-button danger-nav-btn"
            onClick={logout}
          >
            Log out
          </button>
        </nav>
      ) : usertype === 'admin' ? (
        <nav className="topbar-links">
          <span className="role-pill">Admin Console</span>
          <button
            className="nav-link-button"
            onClick={() => navigate('/admin')}
          >
            Overview
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/all-users')}
          >
            Users
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/all-bookings')}
          >
            Bookings
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/all-flights')}
          >
            Flights
          </button>
          <button
            className="nav-link-button danger-nav-btn"
            onClick={logout}
          >
            Log out
          </button>
        </nav>
      ) : usertype === 'flight-operator' ? (
        <nav className="topbar-links">
          <span className="role-pill">Operator Panel</span>
          <button
            className="nav-link-button"
            onClick={() => navigate('/flight-admin')}
          >
            Dashboard
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/flight-bookings')}
          >
            Bookings
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/flights')}
          >
            Routes
          </button>
          <button
            className="nav-link-button"
            onClick={() => navigate('/new-flight')}
          >
            Add route
          </button>
          <button
            className="nav-link-button danger-nav-btn"
            onClick={logout}
          >
            Log out
          </button>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
