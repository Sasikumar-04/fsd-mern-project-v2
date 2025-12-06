
import React, { useContext, useEffect, useState } from 'react';
import '../styles/BookFlight.css';
import { GeneralContext } from '../context/GeneralContext';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const BookFlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [basePrice, setBasePrice] = useState(0);
  const [startCity, setStartCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [startTime, setStartTime] = useState('');

  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [coachType, setCoachType] = useState('');
  const { ticketBookingDate } = useContext(GeneralContext);
  const [journeyDate, setJourneyDate] = useState(ticketBookingDate);

  const [numberOfPassengers, setNumberOfPassengers] = useState(0);
  const [passengerDetails, setPassengerDetails] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);
  const priceMultiplier = {
    economy: 1,
    'premium-economy': 2,
    business: 3,
    'first-class': 4
  };

  useEffect(() => {
    fetchFlightData();
  }, []);

  const fetchFlightData = async () => {
    const response = await axios.get(
      `http://localhost:6001/fetch-flight/${id}`
    );
    const data = response.data;
    setFlightName(data.flightName);
    setFlightId(data.flightId);
    setBasePrice(data.basePrice);
    setStartCity(data.origin);
    setDestinationCity(data.destination);
    setStartTime(data.departureTime);
  };

  const handlePassengerChange = (event) => {
    const value = parseInt(event.target.value || 0, 10);
    setNumberOfPassengers(value);
  };

  const handlePassengerDetailsChange = (index, key, value) => {
    setPassengerDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  useEffect(() => {
    if (coachType && basePrice && numberOfPassengers) {
      const multiplier = priceMultiplier[coachType] || 1;
      setTotalPrice(multiplier * basePrice * numberOfPassengers);
    } else {
      setTotalPrice(0);
    }
  }, [numberOfPassengers, coachType, basePrice]);

  const bookFlight = async () => {
    const inputs = {
      user: localStorage.getItem('userId'),
      flight: id,
      flightName,
      flightId,
      departure: startCity,
      journeyTime: startTime,
      destination: destinationCity,
      email,
      mobile,
      passengers: passengerDetails,
      totalPrice,
      journeyDate,
      seatClass: coachType
    };

    await axios
      .post('http://localhost:6001/book-ticket', inputs)
      .then(() => {
        alert('Booking successful');
        navigate('/bookings');
      })
      .catch(() => {
        alert('Booking failed!!');
      });
  };

  return (
    <div className="BookFlightPage">
      <div className="BookingFlightPageContainer">
        <div className="page-header">
          <h1>Confirm your trip</h1>
          <p>Review flight details and add passenger information.</p>
        </div>

        
        <div className="booking-summary">
          <div className="summary-card">
            <h4>Flight overview</h4>
            <p>
              <b>{flightName}</b> ({flightId})
            </p>
            <p>
              {startCity} → {destinationCity}
            </p>
            <p>
              <b>Departure:</b> {startTime}
            </p>
            <p>
              <b>Base fare:</b> ₹{basePrice}
            </p>
          </div>

          <div className="summary-card">
            <h4>Contact details</h4>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="bookingEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="bookingEmail">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="bookingMobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <label htmlFor="bookingMobile">Mobile number</label>
            </div>
          </div>
        </div>

        
        <div className="booking-options">
          <div className="form-floating mb-3">
            <input
              type="number"
              min="0"
              className="form-control"
              id="passengerCount"
              value={numberOfPassengers}
              onChange={handlePassengerChange}
            />
            <label htmlFor="passengerCount">Number of passengers</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="date"
              className="form-control"
              id="journeyDateInput"
              value={journeyDate || ''}
              onChange={(e) => setJourneyDate(e.target.value)}
            />
            <label htmlFor="journeyDateInput">Journey date</label>
          </div>

          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="seatClassSelect"
              value={coachType}
              onChange={(e) => setCoachType(e.target.value)}
            >
              <option value="" disabled>
                Choose seat class
              </option>
              <option value="economy">Economy class</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business class</option>
              <option value="first-class">First class</option>
            </select>
            <label htmlFor="seatClassSelect">Seat class</label>
          </div>
        </div>

        
        <div className="new-passengers">
          {Array.from({ length: numberOfPassengers }).map((_, index) => (
            <div className="new-passenger" key={index}>
              <h4>Passenger {index + 1}</h4>
              <div className="new-passenger-inputs">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id={`passengerName-${index}`}
                    value={passengerDetails[index]?.name || ''}
                    onChange={(event) =>
                      handlePassengerDetailsChange(
                        index,
                        'name',
                        event.target.value
                      )
                    }
                  />
                  <label htmlFor={`passengerName-${index}`}>Full name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control"
                    id={`passengerAge-${index}`}
                    value={passengerDetails[index]?.age || ''}
                    onChange={(event) =>
                      handlePassengerDetailsChange(
                        index,
                        'age',
                        event.target.value
                      )
                    }
                  />
                  <label htmlFor={`passengerAge-${index}`}>Age</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="booking-footer">
          <h5>
            <b>Total price:</b> ₹{totalPrice}
          </h5>
          <button className="btn btn-primary" onClick={bookFlight}>
            Confirm booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookFlight;
