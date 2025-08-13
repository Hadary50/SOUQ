import React, { useContext, useState } from "react";
import signImg from "../../assets/Side Image.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { UserContext } from "../../Context/CartContext/UserContext/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const { setUserToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const loginSubmit = async (values) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const response = await axios.post(`https://dummyjson.com/auth/login`, values);
      if (response?.status === 200) {
        const token = response.data.accessToken;
        localStorage.setItem("userToken", token);
        setUserToken(token);
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (err) {
      const message =
        err?.response?.data?.message || "Login failed. Check credentials.";
      setServerError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "emilys", // مثال جاهز
      password: "emilyspass", // مثال جاهز
    },
    validationSchema,
    onSubmit: loginSubmit,
  });

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="container p-4">
        <div className="row gy-4 align-items-center">
          <div className="col-12 col-md-6">
            <img src={signImg} className="w-100 rounded" alt="Login illustration" />
          </div>
          <div className="col-12 col-md-5 ms-md-3">
            <div className="card shadow-sm border-0 p-4">
              <h2 className="mb-1">Login to Exclusive</h2>
              <p className="text-muted mb-3">Enter your details below</p>

              {serverError && (
                <div className="alert alert-danger py-2" role="alert">
                  <i className="fa-solid fa-exclamation-circle me-2"></i>
                  {serverError}
                </div>
              )}

              <form onSubmit={formik.handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label fw-semibold">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="emilys"
                    className={`form-control ${formik.touched.username && formik.errors.username ? "is-invalid" : ""
                      }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    aria-describedby="usernameHelp"
                    aria-invalid={!!(formik.touched.username && formik.errors.username)}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback">{formik.errors.username}</div>
                  )}
                </div>

                <div className="mb-3 position-relative">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="emilyspass"
                      className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""
                        }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      aria-invalid={!!(formik.touched.password && formik.errors.password)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                    {formik.touched.password && formik.errors.password && (
                      <div className="invalid-feedback d-block">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <small className="text-muted">
                      Demo credentials: <br />
                      <strong>username:</strong> emilys <br />
                      <strong>password:</strong> emilyspass
                    </small>
                  </div>
                  <Link to="/Register" className="text-danger">
                    Don't have an account?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                  disabled={submitting}
                  aria-label="Login"
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
