import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-danger" to={"/"}>
         Exsclusive
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          {/* Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-2">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link fw-semibold ${isActive('/') ? 'text-danger' : 'text-dark'}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link fw-semibold ${isActive('/contact') ? 'text-danger' : 'text-dark'}`}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className={`nav-link fw-semibold ${isActive('/about') ? 'text-danger' : 'text-dark'}`}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className={`nav-link fw-semibold ${isActive('/login') ? 'text-danger' : 'text-dark'}`}
              >
                Sign Up / Login
              </Link>
            </li>
          </ul>

          {/* Search */}
     <div className="flex-grow-1 mx-3">
  <SearchBar/>
</div>
          {/* Icons */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/wishList" className="position-relative text-decoration-none">
              <i className="fs-5 fa-regular fa-heart text-dark"></i>
              {/* badge example */}
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: 10 }}
              >
                3
                <span className="visually-hidden">unread wishlist items</span>
              </span>
            </Link>
            <Link to="/cart" className="position-relative text-decoration-none">
              <i className="fs-5 fa-solid fa-cart-shopping text-dark"></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: 10 }}
              >
                2
                <span className="visually-hidden">items in cart</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
