import React from "react";
import "../../styles/home.css";
import UsersList from "../component/List.jsx";

export const MyProfile = () => {
  const firstName = localStorage.getItem("first_name");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-custom py-5 gap-5">
      <h1 className="text-white">Bienvenid@ {firstName} </h1>
      <UsersList />
    </div>
  );
};