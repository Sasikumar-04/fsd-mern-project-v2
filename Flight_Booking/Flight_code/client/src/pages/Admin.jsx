
import React, { useEffect, useState } from 'react';
import '../styles/Admin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const usersRes = await axios.get('http://localhost:6001/fetch-users');
    setUserCount(usersRes.data.length - 1);
    setUsers(
      usersRes.data.filter((user) => user.approval === 'not-approved')
    );

    const bookingsRes = await axios.get(
      'http://localhost:6001/fetch-bookings'
    );
    setBookingCount(bookingsRes.data.length);

    const flightsRes = await axios.get(
      'http://localhost:6001/fetch-flights'
    );
    setFlightsCount(flightsRes.data.length);
  };

  const approveRequest = async (id) => {
    await axios.post('http://localhost:6001/approve-operator', { id });
    alert('Operator profile approved.');
    fetchData();
  };

  const rejectRequest = async (id) => {
    await axios.post('http://localhost:6001/reject-operator', { id });
    alert('Operator request rejected.');
    fetchData();
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin overview</h1>
        <p>Quick glance at users, bookings and flights.</p>
      </div>

      <div className="admin-summary-grid">
        <div className="summary-card users-card">
          <h4>Travellers</h4>
          <p className="summary-value">{userCount}</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/all-users')}
          >
            View users
          </button>
        </div>
        <div className="summary-card bookings-card">
          <h4>Total bookings</h4>
          <p className="summary-value">{bookingCount}</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/all-bookings')}
          >
            View bookings
          </button>
        </div>
        <div className="summary-card flights-card">
          <h4>Active flights</h4>
          <p className="summary-value">{flightsCount}</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate('/all-flights')}
          >
            View flights
          </button>
        </div>
      </div>

      <div className="admin-requests-container">
        <div className="section-header">
          <h3>Flight operator applications</h3>
          <p>Approve or reject new operator sign-ups.</p>
        </div>

        <div className="admin-requests">
          {users.length === 0 ? (
            <p className="empty-text">No pending operator requests.</p>
          ) : (
            users.map((user) => (
              <div className="admin-request" key={user._id}>
                <div>
                  <p>
                    <strong>Operator name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
                <div className="admin-request-actions">
                  <button
                    className="btn btn-outline-success"
                    onClick={() => approveRequest(user._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => rejectRequest(user._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
