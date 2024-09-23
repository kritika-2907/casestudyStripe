// src/pages/AddCustomer.js
import React, { useState } from 'react';
import '../App.css'; // Import your CSS file

function AddCustomer() {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Customer added:', customer);
  };

  return (
    <div className="container">

      <main>
        <h1>Add Customer</h1>
        <form onSubmit={handleSubmit} className="form-container-vertical">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={customer.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={customer.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={customer.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="admin-button">Add Customer</button>
        </form>
      </main>
    </div>
  );
}

export default AddCustomer;
