
import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userType') === 'admin') {
      navigate('/admin');
    } else if (localStorage.getItem('userType') === 'flight-operator') {
      navigate('/flight-admin');
    }
  }, [navigate]);

  const [Flights, setFlights] = useState([]);

  const fetchFlights = async () => {
    const now = new Date();

    if (isReturnTrip) {
      if (departure && destination && departureDate && returnDate) {
        const d1 = new Date(departureDate);
        const d2 = new Date(returnDate);

        if (d1 >= now && d2 > d1) {
          setError('');
          const res = await axios.get('http://localhost:6001/fetch-flights');
          setFlights(res.data);
        } else {
          setError('Please choose valid journey and return dates.');
        }
      } else {
        setError('Please complete all journey details.');
      }
    } else {
      if (departure && destination && departureDate) {
        const d1 = new Date(departureDate);
        if (d1 >= now) {
          setError('');
          const res = await axios.get('http://localhost:6001/fetch-flights');
          setFlights(res.data);
        } else {
          setError('Journey date cannot be in the past.');
        }
      } else {
        setError('Please complete all journey details.');
      }
    }
  };

  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  const handleTicketBooking = async (id, origin, dest) => {
    if (!userId) {
      navigate('/auth');
      return;
    }

    if (origin === departure) {
      setTicketBookingDate(departureDate);
      navigate(`/book-flight/${id}`);
    } else if (dest === departure) {
      setTicketBookingDate(returnDate);
      navigate(`/book-flight/${id}`);
    }
  };

  const cityOptions = [
    'Chennai',
    'Banglore',
    'Hyderabad',
    'Mumbai',
    'Indore',
    'Delhi',
    'Pune',
    'Trivendrum',
    'Bhopal',
    'Kolkata',
    'varanasi',
    'Jaipur'
  ];

  return (
    <div className="landing-root">
      
      <div className="landing-hero">
        <div className="hero-overlay">
          <div className="hero-text-block">
            <h1>Smart flight booking for everyday journeys.</h1>
            <p>
              Discover routes, compare timings, and book seats instantly with
              OrbitJet – built for travellers, admins and operators.
            </p>
            <ul className="hero-points">
              <li>✓ One-way and return journeys</li>
              <li>✓ Real-time availability</li>
              <li>✓ Unified admin & operator panels</li>
            </ul>
          </div>

          <div className="hero-search-card">
            <div className="hero-search-header">
              <h3>Search flights</h3>
              <div className="trip-toggle">
                <button
                  type="button"
                  className={!isReturnTrip ? 'trip-toggle-btn active' : 'trip-toggle-btn'}
                  onClick={() => setIsReturnTrip(false)}
                >
                  One way
                </button>
                <button
                  type="button"
                  className={isReturnTrip ? 'trip-toggle-btn active' : 'trip-toggle-btn'}
                  onClick={() => setIsReturnTrip(true)}
                >
                  Round trip
                </button>
              </div>
            </div>

            <div className="hero-search-grid">
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="departureCity"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                >
                  <option value="">Select city</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <label htmlFor="departureCity">From</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="destinationCity"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select city</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <label htmlFor="destinationCity">To</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="journeyDate"
                  value={departureDate || ''}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                <label htmlFor="journeyDate">Departure</label>
              </div>

              {isReturnTrip && (
                <div className="form-floating mb-3">
                  <input
                    type="date"
                    className="form-control"
                    id="returnDate"
                    value={returnDate || ''}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                  <label htmlFor="returnDate">Return</label>
                </div>
              )}
            </div>

            {error && <p className="search-error">{error}</p>}

            <button
              type="button"
              className="btn btn-primary search-btn"
              onClick={fetchFlights}
            >
              Find flights
            </button>
          </div>
        </div>
      </div>

      
      {Flights.length > 0 && (
        <section className="results-section">
          {Flights.filter(
            (Flight) =>
              Flight.origin === departure &&
              Flight.destination === destination
          ).length > 0 ? (
            <div className="availableFlightsContainer">
              <div className="results-header">
                <h2>Available routes</h2>
                <p>
                  Showing flights between <strong>{departure}</strong> and{' '}
                  <strong>{destination}</strong>.
                </p>
              </div>

              <div className="Flights">
                {isReturnTrip ? (
                  <>
                    {Flights.filter(
                      (Flight) =>
                        (Flight.origin === departure &&
                          Flight.destination === destination) ||
                        (Flight.origin === destination &&
                          Flight.destination === departure)
                    ).map((Flight) => (
                      <div className="Flight-card" key={Flight._id}>
                        <div className="Flight-main">
                          <div>
                            <p className="Flight-name">{Flight.flightName}</p>
                            <p className="Flight-sub">
                              Flight No: {Flight.flightId}
                            </p>
                          </div>
                          <div>
                            <p className="Flight-label">From</p>
                            <p className="Flight-value">
                              {Flight.origin} • {Flight.departureTime}
                            </p>
                          </div>
                          <div>
                            <p className="Flight-label">To</p>
                            <p className="Flight-value">
                              {Flight.destination} • {Flight.arrivalTime}
                            </p>
                          </div>
                          <div>
                            <p className="Flight-label">Starting at</p>
                            <p className="Flight-price">
                              ₹{Flight.basePrice}
                            </p>
                            <p className="Flight-seats">
                              {Flight.totalSeats} seats
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary Flight-book-btn"
                          onClick={() =>
                            handleTicketBooking(
                              Flight._id,
                              Flight.origin,
                              Flight.destination
                            )
                          }
                        >
                          Book this flight
                        </button>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {Flights.filter(
                      (Flight) =>
                        Flight.origin === departure &&
                        Flight.destination === destination
                    ).map((Flight) => (
                      <div className="Flight-card" key={Flight._id}>
                        <div className="Flight-main">
                          <div>
                            <p className="Flight-name">{Flight.flightName}</p>
                            <p className="Flight-sub">
                              Flight No: {Flight.flightId}
                            </p>
                          </div>
                          <div>
                            <p className="Flight-label">From</p>
                            <p className="Flight-value">
                              {Flight.origin} • {Flight.departureTime}
                            </p>
                          </div>
                          <div>
                            <p className="Flight-label">To</p>
                            <p className="Flight-value">
                              {Flight.destination} • {Flight.arrivalTime}
                            </p>
                          </div>
                          <div>
                            <p className="Flight-label">Starting at</p>
                            <p className="Flight-price">
                              ₹{Flight.basePrice}
                            </p>
                            <p className="Flight-seats">
                              {Flight.totalSeats} seats
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn btn-outline-primary Flight-book-btn"
                          onClick={() =>
                            handleTicketBooking(
                              Flight._id,
                              Flight.origin,
                              Flight.destination
                            )
                          }
                        >
                          Book this flight
                        </button>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="availableFlightsContainer">
              <h2>No routes found</h2>
              <p>Try changing the city or date filters.</p>
            </div>
          )}
        </section>
      )}

      
      <section id="about" className="section-about">
        <div className="about-inner">
          <h2>About OrbitJet</h2>
          <p>
            OrbitJet is a sample flight management platform designed to
            simulate real-world booking workflows. Customers can search and
            book flights, while admins and operators manage users, routes,
            and reservations.
          </p>
          <p>
            The interface is built to be lightweight, responsive, and easy to
            extend for academic demos or prototype projects.
          </p>
          <span className="about-footer">
            © 2024 OrbitJet Demo Platform. For training and demo purposes only.
          </span>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
