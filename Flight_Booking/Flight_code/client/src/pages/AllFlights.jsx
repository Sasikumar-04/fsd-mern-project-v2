
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AllFlights.css';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    const response = await axios.get('http://localhost:6001/fetch-flights');
    setFlights(response.data);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="allFlightsPage">
      <div className="page-header">
        <h1>All registered flights</h1>
        <p>Admin view of every route configured in the system.</p>
      </div>

      <div className="Flights">
        {flights.map((flight) => (
          <div className="Flight-card" key={flight._id}>
            <div className="Flight-main">
              <div>
                <p className="Flight-name">{flight.flightName}</p>
                <p className="Flight-sub">Route ID: {flight.flightId}</p>
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
                <p className="Flight-price">₹{flight.basePrice}</p>
                <p className="Flight-seats">{flight.totalSeats} seats</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFlights;
