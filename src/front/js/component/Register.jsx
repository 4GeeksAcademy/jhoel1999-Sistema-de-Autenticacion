import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

function Register() {
  const { actions } = useContext(Context);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendFormData = async (e) => {
    e.preventDefault();
    try {
      const data = await actions.register(formData);

      if (data?.ok) {
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });

        setShowAlert(true);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (e) {
      console.error("Error in registration", e);
    }
  };

  return (
    <div className="card shadow-sm" style={{ width: "500px" }}>
      <div className="card-body">
        {showAlert && (
          <div className="alert alert-success" role="alert">
            User successfully registered
          </div>
        )}

        <h3 className="card-title text-center fw-bold">Registration Form</h3>
        <form onSubmit={sendFormData}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              value={formData.first_name}
              name="first_name"
              className="form-control"
              id="firstName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              value={formData.last_name}
              name="last_name"
              className="form-control"
              id="lastName"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailAddress" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              name="email"
              className="form-control"
              id="emailAddress"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordForm" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              name="password"
              className="form-control"
              id="passwordForm"
              onChange={handleChange}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary text-uppercase rounded-pill"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;