
import React, { useState } from 'react';
import '../styles/Authenticate.css';
import Login from '../components/Login';
import Register from '../components/Register';

const Authenticate = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <div className="auth-illustration-overlay">
          <h1>Plan, book, and manage your flights in one place.</h1>
          <p>
            OrbitJet helps travellers, admins and operators stay in sync
            with live bookings and routes.
          </p>
        </div>
      </div>

      <div className="auth-panel">
        {isLogin ? (
          <Login setIsLogin={setIsLogin} />
        ) : (
          <Register setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};

export default Authenticate;
