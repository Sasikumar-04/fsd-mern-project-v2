
import React, { useEffect, useState } from 'react';
import '../styles/allUsers.css';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:6001/fetch-users');
    setUsers(response.data);
  };

  const customers = users.filter((user) => user.usertype === 'customer');
  const operators = users.filter(
    (user) => user.usertype === 'flight-operator'
  );

  return (
    <div className="all-users-page">
      <div className="page-header">
        <h1>User directory</h1>
        <p>Overview of all travellers and flight operators.</p>
      </div>

      <section className="users-section">
        <h2>Travellers</h2>
        <div className="all-users">
          {customers.length === 0 && <p>No travellers found.</p>}
          {customers.map((user) => (
            <div className="user" key={user._id}>
              <p>
                <b>User ID:</b> {user._id}
              </p>
              <p>
                <b>Name:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="users-section">
        <h2>Flight operators</h2>
        <div className="all-users">
          {operators.length === 0 && <p>No operator profiles yet.</p>}
          {operators.map((user) => (
            <div className="user" key={user._id}>
              <p>
                <b>Id:</b> {user._id}
              </p>
              <p>
                <b>Operator name:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <p>
                <b>Approval state:</b> {user.approval || 'pending'}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllUsers;
