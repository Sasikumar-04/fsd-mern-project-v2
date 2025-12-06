
import React, { useEffect, useState } from 'react';
import '../styles/NewFlight.css';
import axios from 'axios';

const NewFlight = () => {
  const [userDetails, setUserDetails] = useState();
  const [flightName, setFlightName] = useState(
    localStorage.getItem('username') || ''
  );
  const [flightId, setFlightId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [startTime, setStartTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [totalSeats, setTotalSeats] = useState(0);
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    fetchUserData();
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

  const handleSubmit = async () => {
    const inputs = {
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
      .post('http://localhost:6001/add-Flight', inputs)
      .then(() => {
        alert('Flight added successfully!!');
        setFlightId('');
        setOrigin('');
        setStartTime('');
        setArrivalTime('');
        setDestination('');
        setBasePrice(0);
        setTotalSeats(0);
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
      {userDetails ? (
        userDetails.approval === 'not-approved' ? (
          <div className="notApproved-box">
            <h3>Approval required</h3>
            <p>
              Your operator profile is under review by the admin team. You’ll
              be able to add routes once it’s approved.
            </p>
          </div>
        ) : userDetails.approval === 'approved' ? (
          <div className="NewFlightPageContainer">
            <div className="page-header">
              <h1>Add new flight route</h1>
              <p>Create a new route that travellers can book.</p>
            </div>

            <span className="newFlightSpan1">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="newFlightName"
                  value={flightName}
                  disabled
                  onChange={(e) => setFlightName(e.target.value)}
                />
                <label htmlFor="newFlightName">Operator / Airline name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="newFlightId"
                  value={flightId}
                  onChange={(e) => setFlightId(e.target.value)}
                />
                <label htmlFor="newFlightId">Route ID (code)</label>
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
                <label htmlFor="newOrigin">Departure city</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="time"
                  className="form-control"
                  id="newDepartureTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                <label htmlFor="newDepartureTime">Departure time</label>
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
                <label htmlFor="newDestination">Destination city</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="time"
                  className="form-control"
                  id="newArrivalTime"
                  value={arrivalTime}
                  onChange={(e) => setArrivalTime(e.target.value)}
                />
                <label htmlFor="newArrivalTime">Arrival time</label>
              </div>
            </span>

            <span className="newFlightSpan2">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="newSeats"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(e.target.value)}
                />
                <label htmlFor="newSeats">Total seats</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="newBasePrice"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
                <label htmlFor="newBasePrice">Base price</label>
              </div>
            </span>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Add route
            </button>
          </div>
        ) : (
          <div className="notApproved-box">
            <h3>Application rejected</h3>
            <p>
              This operator account was not approved. Please contact admin if
              this is unexpected.
            </p>
          </div>
        )
      ) : (
        ''
      )}
    </div>
  );
};

export default NewFlight;
