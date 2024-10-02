import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logout from "./Logout.jsx";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = localStorage.getItem("token");

  const handleLoginClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated && location.pathname === "/my_profile") {
      navigate("/login");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return (
    <nav className="navbar navbar-light bg-light py-3">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 fw-bold">Home</span>
        </Link>
        <div className="ml-auto">
          {isAuthenticated ? (
            <Logout />
          ) : (
            location.pathname !== "/login" && (
              <button onClick={handleLoginClick} className="btn btn-primary">
                Login
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};