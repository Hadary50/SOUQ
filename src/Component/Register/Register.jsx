import React from 'react';
import signImg from '../../assets/Side Image.png';
import { Link } from 'react-router-dom';
import googleImg from '../../assets/google_logo-google_icongoogle-512.webp';

export default function Register() {
  return (
    <div className="container py-4">
      <div className="row gy-4 align-items-center">
        {/* الصورة */}
        <div className="col-12 col-md-6">
          <img
            src={signImg}
            className="w-100 rounded"
            alt="Register illustration"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* الفورم */}
        <div className="col-12 col-md-5">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="text-center mb-1">Create an account</h2>
            <p className="text-center text-muted mb-4">
              Enter your details below
            </p>
            <form noValidate>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="form-control"
                  required
                  aria-label="Name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email or Phone
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="form-control"
                  required
                  aria-label="Email or Phone"
                />
              </div>

              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="form-control"
                  required
                  aria-label="Password"
                />
              </div>

              <div className="d-flex flex-column align-items-center">
                <button
                  type="submit"
                  className="btn btn-danger w-100 mb-2"
                  aria-label="Create Account"
                >
                  Create Account
                </button>
                <button
                  type="button"
                  className="btn w-100 d-flex align-items-center justify-content-center border"
                  style={{ background: '#fff' }}
                  aria-label="Sign up with Google"
                >
                  <img
                    src={googleImg}
                    alt="Google logo"
                    style={{ width: 20, height: 20, marginRight: 8 }}
                  />
                  Sign up with Google
                </button>
              </div>

              <p className="text-center text-muted mt-4 mb-0">
                Already have an account?{' '}
                <Link className="text-danger fw-semibold" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
