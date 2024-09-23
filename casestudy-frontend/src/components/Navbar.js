import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Import the custom CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle } from 'react-icons/fa'; // Importing an icon

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div className="navbar-brand">Telstar</div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Align all navigation items to the right */}
          <ul className="navbar-nav ms-auto"> {/* Added 'ms-auto' to push links to the right */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/prepaid">Prepaid</Link> {/* Prepaid section */}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/postpaid">Postpaid</Link> {/* Postpaid section */}
            </li>
          </ul>

          {/* Admin Icon Dropdown, stays on the far right */}
          <div className="dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="adminDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUserCircle style={{ fontSize: '2.2rem', color: 'white' }} className="admin-icon" /> {/* Icon color set to white */}
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
              <li><Link className="dropdown-item" to="/login">Login</Link></li>
              <li><Link className="dropdown-item" to="/register">Register</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
