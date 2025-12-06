
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FlightAdmin.css';
import { useNavigate } from 'react-router-dom';

const FlightAdmin = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState();
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchUserData();
    fetchData();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get(
        `http://localhost:6001/fetch-user/${id}`
      );
      setUserDetails(response.data);
    } catch (err) {
      // ignore
    }
  };

  const fetchData = async () => {
    const bookingsRes = await axios.get(
      'http://localhost:6001/fetch-bookings'
    );
    setBookingCount(
      bookingsRes.data.filter(
        (booking) => booking.flightName === localStorage.getItem('username')
      ).length
    );

    const flightsRes = await axios.get(
      'http://localhost:6001/fetch-flights'
    );
    setFlightsCount(
      flightsRes.data.filter(
        (flight) => flight.flightName === localStorage.getItem('username')
      ).length
    );
  };

  return (
    <div className="flightAdmin-page">
      {userDetails ? (
        userDetails.approval === 'not-approved' ? (
          <div className="notApproved-box">
            <h3>Approval in progress</h3>
            <p>
              Your operator account is under review. You’ll get full access once
              an admin approves your profile.
            </p>
          </div>
        ) : userDetails.approval === 'rejected' ? (
          <div className="notApproved-box">
            <h3>Operator application rejected</h3>
            <p>
              This operator profile was not approved. Reach out to an admin if
              you need clarification.
            </p>
          </div>
        ) : userDetails.approval === 'approved' ? (
          <div className="admin-page-cards">
            <div className="card admin-card transactions-card">
              <h4>Your bookings</h4>
              <p>{bookingCount}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/flight-bookings')}
              >
                View bookings
              </button>
            </div>

            <div className="card admin-card deposits-card">
              <h4>Your routes</h4>
              <p>{flightsCount}</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/flights')}
              >
                Manage routes
              </button>
            </div>

            <div className="card admin-card loans-card">
              <h4>Create route</h4>
              <p>Publish a new flight path</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/new-flight')}
              >
                Add new route
              </button>
            </div>
          </div>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default FlightAdmin;
