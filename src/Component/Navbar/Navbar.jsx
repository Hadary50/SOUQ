import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
      <div className="container d-flex align-items-center justify-content-between gap-3">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-danger" to={"/"}>
          Exsclusive
        </Link>

        {/* ✅ SearchBar دايمًا في النص وعلى نفس السطر */}
        <div className="d-flex flex-grow-1 justify-content-center align-items-center">
          <div className="w-100" style={{ maxWidth: '500px' }}>
            <SearchBar />
          </div>
        </div>

        {/* Navbar Toggle Button */}
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

        {/* Links + Icons */}
        <div className="collapse navbar-collapse justify-content-end" id="mainNav">
          <ul className="navbar-nav mb-2 mb-lg-0 gap-3 align-items-center">
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

          {/* Icons */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/wishList" className="position-relative text-decoration-none">
              <i className="fs-5 fa-regular fa-heart text-dark"></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: 10 }}
              >
                3
              </span>
            </Link>
            <Link to="/cart" className="position-relative text-decoration-none">
              <i className="fs-5 fa-solid fa-cart-shopping text-dark"></i>
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: 10 }}
              >
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
