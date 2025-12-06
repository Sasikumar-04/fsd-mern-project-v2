
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Flights = () => {
  const [userDetails, setUserDetails] = useState();
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchFlights();
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

  const fetchFlights = async () => {
    const response = await axios.get(
      'http://localhost:6001/fetch-flights'
    );
    setFlights(response.data);
  };

  const operatorName = localStorage.getItem('username');

  return (
    <div className="allFlightsPage">
      {userDetails ? (
        userDetails.approval === 'not-approved' ? (
          <div className="notApproved-box">
            <h3>Approval required</h3>
            <p>
              Once your profile is approved, you’ll be able to manage your
              routes here.
            </p>
          </div>
        ) : userDetails.approval === 'approved' ? (
          <>
            <div className="page-header">
              <h1>Your routes</h1>
              <p>All flights operated under {operatorName}.</p>
            </div>

            <div className="Flights">
              {flights
                .filter(
                  (flight) => flight.flightName === operatorName
                )
                .map((flight) => (
                  <div className="Flight-card" key={flight._id}>
                    <div className="Flight-main">
                      <div>
                        <p className="Flight-name">{flight.flightName}</p>
                        <p className="Flight-sub">
                          Route ID: {flight.flightId}
                        </p>
                        <p className="Flight-sub">DB Id: {flight._id}</p>
                      </div>
                      <div>
                        <p className="Flight-label">From</p>
                        <p className="Flight-value">
                          {flight.origin} • {flight.departureTime}
                        </p>
                      </div>
                      <div>
                        <p className="Flight-label">To</p>
                        <p className="Flight-value">
                          {flight.destination} • {flight.arrivalTime}
                        </p>
                      </div>
                      <div>
                        <p className="Flight-label">Pricing / Seats</p>
                        <p className="Flight-price">
                          ₹{flight.basePrice}
                        </p>
                        <p className="Flight-seats">
                          {flight.totalSeats} seats
                        </p>
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-primary Flight-book-btn"
                      onClick={() =>
                        navigate(`/edit-flight/${flight._id}`)
                      }
                    >
                      Edit route
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          ''
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default Flights;
