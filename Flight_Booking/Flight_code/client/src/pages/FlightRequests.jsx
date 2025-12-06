
import React from 'react';

const FlightRequests = () => {
  return (
    <div className="allFlightsPage">
      <div className="page-header">
        <h1>Flight requests</h1>
        <p>
          This section can be used later for special requests or manual route
          approvals.
        </p>
      </div>

      <div className="notApproved-box">
        <h3>No request workflow configured</h3>
        <p>
          For now, operators are approved directly by the admin. You can extend
          this page to show additional request flows if needed.
        </p>
      </div>
    </div>
  );
};

export default FlightRequests;
