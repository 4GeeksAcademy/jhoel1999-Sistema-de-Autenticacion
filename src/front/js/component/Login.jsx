import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const { actions } = useContext(Context);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const sendLoginForm = async (e) => {
    e.preventDefault();
    try {
      const response = await actions.login(loginForm);

      if (response?.ok) {
        setLoginForm({
          email: "",
          password: "",
        });

        navigate("/profile");
      } else {
        console.warn("Login failed");
      }
    } catch (e) {
      console.error("Error during login:", e);
    }
  };

  return (
    <div
      className="rounded-3 bg-white text-black p-5"
      style={{ width: "500px" }}
    >
      <h3 className="mb-3 text-center fw-bold">Login</h3>
      <form onSubmit={sendLoginForm}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            value={loginForm.email}
            name="email"
            className="form-control"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={loginForm.password}
            name="password"
            className="form-control"
            id="password"
            onChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="custom-btn w-100 text-uppercase rounded-pill"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;