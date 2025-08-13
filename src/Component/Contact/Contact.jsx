import React from 'react';

export default function Contact() {
  return (
    <div className="container mt-4">
      <div className="row gy-4">
        {/* معلومات التواصل الجانبية */}
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-phone fs-3 me-3"></i>
                <div>
                  <p className="mb-0 fs-5 fw-semibold">Call Us</p>
                  <small className="text-muted">Available 24/7, 7 days a week</small>
                </div>
              </div>
              <p className="mb-1">Phone: <strong>+880161112222</strong></p>
              <hr />
              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-envelope fs-3 me-3"></i>
                <div>
                  <p className="mb-0 fs-5 fw-semibold">Write to Us</p>
                  <small className="text-muted">Fill out the form and we will contact you within 24 hours</small>
                </div>
              </div>
              <p className="mb-1">Email: <strong>customer@exclusive.com</strong></p>
              <p className="mb-0">Email: <strong>support@exclusive.com</strong></p>
            </div>
          </div>
        </div>

        {/* نموذج التواصل */}
        <div className="col-12 col-md-8">
          <div className="card shadow border-0">
            <div className="card-body">
              <h4 className="mb-3">Send Us a Message</h4>
              <form /* onSubmit={handleSubmit} */>
                <div className="row gx-3 gy-3">
                  <div className="col-12 col-sm-6">
                    <label htmlFor="name" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter your name"
                      required
                      aria-label="Your Name"
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="email" className="form-label">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="you@example.com"
                      required
                      aria-label="Your Email"
                    />
                  </div>
                  <div className="col-12 col-sm-6">
                    <label htmlFor="phone" className="form-label">
                      Your Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      placeholder="+1 234 567 890"
                      aria-label="Your Phone"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      className="form-control"
                      rows={5}
                      placeholder="Type your message here..."
                      required
                      aria-label="Your Message"
                      style={{ resize: 'vertical' }}
                    ></textarea>
                  </div>
                  <div className="col-12 text-start">
                    <button type="submit" className="btn btn-danger">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
              {/* ممكن تضيف feedback (success / error) هنا بعد الإرسال */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
