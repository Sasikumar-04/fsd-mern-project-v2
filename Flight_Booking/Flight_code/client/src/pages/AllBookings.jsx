
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Bookings.css';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get('http://localhost:6001/fetch-bookings');
    setBookings(res.data.reverse());
  };

  const cancelTicket = async (id) => {
    await axios.put(`http://localhost:6001/cancel-ticket/${id}`);
    alert('Booking cancelled by admin.');
    fetchBookings();
  };

  return (
    <div className="bookings-page">
      <div className="page-header">
        <h1>All bookings</h1>
        <p>Admin overview of every booking created in the system.</p>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            <div className="booking-card-header">
              <div>
                <p className="booking-id">Booking #{booking._id}</p>
                <p className="booking-status">
                  Status:{' '}
                  <span
                    className={
                      booking.bookingStatus === 'cancelled'
                        ? 'status-pill cancelled'
                        : booking.bookingStatus === 'confirmed'
                        ? 'status-pill confirmed'
                        : 'status-pill pending'
                    }
                  >
                    {booking.bookingStatus}
                  </span>
                </p>
              </div>
              <div className="booking-price">
                <span>Total</span>
                <strong>₹{booking.totalPrice}</strong>
              </div>
            </div>

            <div className="booking-card-body">
              <div className="booking-route">
                <div>
                  <p className="label">From</p>
                  <p className="value">{booking.departure}</p>
                </div>
                <div>
                  <p className="label">To</p>
                  <p className="value">{booking.destination}</p>
                </div>
                <div>
                  <p className="label">Flight</p>
                  <p className="value">
                    {booking.flightName} ({booking.flightId})
                  </p>
                </div>
              </div>

              <div className="booking-meta">
                <div>
                  <p className="label">Journey date</p>
                  <p className="value">
                    {booking.journeyDate.slice(0, 10)} •{' '}
                    {booking.journeyTime}
                  </p>
                </div>
                <div>
                  <p className="label">Booked on</p>
                  <p className="value">
                    {booking.bookingDate.slice(0, 10)}
                  </p>
                </div>
                <div>
                  <p className="label">Contact</p>
                  <p className="value">
                    {booking.email} • {booking.mobile}
                  </p>
                </div>
              </div>

              <div className="booking-passengers">
                <p className="label">Passengers</p>
                <ol>
                  {booking.passengers.map((passenger, i) => (
                    <li key={i}>
                      {passenger.name}, {passenger.age}
                    </li>
                  ))}
                </ol>
                {booking.bookingStatus === 'confirmed' && (
                  <p className="label seats">
                    Seats: {booking.seats || booking.passengers.length}
                  </p>
                )}
              </div>
            </div>

            {booking.bookingStatus === 'confirmed' && (
              <div className="booking-actions">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => cancelTicket(booking._id)}
                >
                  Cancel booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
