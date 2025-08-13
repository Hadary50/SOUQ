import React from "react";
import aboyImg from "../../assets/two-beautiful-trendy-young-african-ladies-posing-and-showing-off-their-shopping-bags-2BN90KA.jpg";

export default function About() {
  return (
    <div className="container mt-5">
      {/* القصة */}
      <div className="row align-items-center gy-4">
        <div className="col-12 col-md-5">
          <h2 className="display-6 fw-bold">Our Story</h2>
          <p className="mt-3 text-black fs-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            dolores ratione architecto. Reprehenderit blanditiis sapiente
            perferendis dicta alias aliquid deleniti incidunt, quibusdam quam
            animi doloremque! Numquam officiis reprehenderit nihil nisi enim
            temporibus.
          </p>
        </div>
        <div className="col-12 col-md-6 offset-md-1">
          <img
            src={aboyImg}
            className="w-100 rounded"
            alt="Two trendy young ladies with shopping bags"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* الإحصائيات */}
      <div className="row mt-5 g-3">
        {[
          {
            icon: "fa-igloo",
            value: "10.5k",
            label: "Active Sellers on Site",
          },
          {
            icon: "fa-dollar-sign",
            value: "33k",
            label: "Monthly Product Sales",
          },
          {
            icon: "fa-shop",
            value: "45.5k",
            label: "Active Customers",
          },
          {
            icon: "fa-chart-line",
            value: "25k",
            label: "Annual Gross Sales",
          },
        ].map((stat, idx) => (
          <div key={idx} className="col-12 col-sm-6 col-md-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body text-center py-4 d-flex flex-column justify-content-center">
                <div className="mb-2">
                  <i
                    className={`fa-solid ${stat.icon} fs-1 text-danger`}
                    aria-hidden="true"
                  ></i>
                </div>
                <h2 className="fw-bolder mb-1">{stat.value}</h2>
                <p className="mb-0 small text-muted">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
