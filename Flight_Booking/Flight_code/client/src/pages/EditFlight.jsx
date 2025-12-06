
import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFlight = () => {
  const [flightName, setFlightName] = useState('');
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  const { id } = useParams();

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
    setOrigin(data.origin);
    setDestination(data.destination);
    setTotalSeats(data.totalSeats);
    setBasePrice(data.basePrice);

    const [depH, depM] = data.departureTime.split(':');
    const [arrH, arrM] = data.arrivalTime.split(':');

    const dep = new Date();
    dep.setHours(parseInt(depH, 10));
    dep.setMinutes(parseInt(depM, 10));

    const arr = new Date();
    arr.setHours(parseInt(arrH, 10));
    arr.setMinutes(parseInt(arrM, 10));

    const formatTime = (d) =>
      `${String(d.getHours()).padStart(2, '0')}:${String(
        d.getMinutes()
      ).padStart(2, '0')}`;

    setStartTime(formatTime(dep));
    setArrivalTime(formatTime(arr));
  };

  const handleSubmit = async () => {
    const inputs = {
      _id: id,
      flightName,
      flightId,
      origin,
      destination,
      departureTime: startTime,
      arrivalTime,
      basePrice,
      totalSeats
    };

    await axios
      .put('http://localhost:6001/update-flight', inputs)
      .then(() => {
        alert('Flight updated successfully!');
      });
  };

  const cities = [
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
    <div className="NewFlightPage">
      <div className="NewFlightPageContainer">
        <div className="page-header">
          <h1>Edit route details</h1>
          <p>Update timing, origin/destination or pricing for this flight.</p>
        </div>

        <span className="newFlightSpan1">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="editFlightName"
              value={flightName}
              disabled
              onChange={(e) => setFlightName(e.target.value)}
            />
            <label htmlFor="editFlightName">Flight name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="editFlightId"
              value={flightId}
              onChange={(e) => setFlightId(e.target.value)}
            />
            <label htmlFor="editFlightId">Route ID</label>
          </div>
        </span>

        <span>
          <div className="form-floating">
            <select
              className="form-select mb-3"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            >
              <option value="" disabled>
                Choose city
              </option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label htmlFor="editOrigin">Departure city</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              id="editDepartureTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <label htmlFor="editDepartureTime">Departure time</label>
          </div>
        </span>

        <span>
          <div className="form-floating">
            <select
              className="form-select mb-3"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            >
              <option value="" disabled>
                Choose city
              </option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label htmlFor="editDestination">Destination city</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="time"
              className="form-control"
              id="editArrivalTime"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(e.target.value)}
            />
            <label htmlFor="editArrivalTime">Arrival time</label>
          </div>
        </span>

        <span className="newFlightSpan2">
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="editSeats"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
            />
            <label htmlFor="editSeats">Total seats</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="editBasePrice"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <label htmlFor="editBasePrice">Base price</label>
          </div>
        </span>

        <button className="btn btn-primary" onClick={handleSubmit}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditFlight;
