
import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';

const Login = ({ setIsLogin }) => {
  const { setEmail, setPassword, login } = useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login();
  };

  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <h2>Welcome back</h2>
        <p>Sign in to manage your trips and tickets.</p>
      </div>

      <form className="auth-card-body" onSubmit={handleLogin}>
        <div className="form-floating mb-3 auth-input">
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="loginEmail">Email</label>
        </div>

        <div className="form-floating mb-3 auth-input">
          <input
            type="password"
            className="form-control"
            id="loginPassword"
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="loginPassword">Password</label>
        </div>

        <button type="submit" className="btn btn-primary auth-btn">
          Log in
        </button>

        <p className="auth-switch-text">
          Don’t have an account?{' '}
          <button
            type="button"
            className="link-button"
            onClick={() => setIsLogin(false)}
          >
            Create one
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
