import React from "react";
import "../../styles/home.css";
import Register from "../component/Register";

export const RegisterForm = () => {
  return (
    <div className="d-flex justify-content-center align-items-center bg-custom py-5 gap-5">
      <Register />
    </div>
  );
};