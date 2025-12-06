
import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Register = ({ setIsLogin }) => {
  const {
    setUsername,
    setEmail,
    setPassword,
    usertype,
    setUsertype,
    register
  } = useContext(GeneralContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    await register();
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2>Create your OrbitJet account</h2>
        <p>Sign up and start managing flights in one place.</p>
      </div>

      <form className="auth-card-body" onSubmit={handleRegister}>
        <div className="form-floating mb-3 auth-input">
          <input
            type="text"
            className="form-control"
            id="registerUsername"
            placeholder="Your name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="registerUsername">Full name</label>
        </div>

        <div className="form-floating mb-3 auth-input">
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="registerEmail">Email</label>
        </div>

        <div className="form-floating mb-3 auth-input">
          <input
            type="password"
            className="form-control"
            id="registerPassword"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="registerPassword">Password</label>
        </div>

        <div className="form-floating mb-3 auth-input">
          <select
            className="form-select"
            id="registerUsertype"
            value={usertype}
            onChange={(e) => setUsertype(e.target.value)}
          >
            <option value="">Select role</option>
            <option value="admin">Platform Admin</option>
            <option value="customer">Traveller</option>
            <option value="flight-operator">Flight Partner</option>
          </select>
          <label htmlFor="registerUsertype">Account type</label>
        </div>

        <button type="submit" className="btn btn-primary auth-btn">
          Sign up
        </button>

        <p className="auth-switch-text">
          Already have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => setIsLogin(true)}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
