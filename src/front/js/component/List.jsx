import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext.js";

function UsersList() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const getUserList = async () => {
      await actions.getList();
    };
    getUserList();
  }, []);

  return (
    <div className="card shadow-sm" style={{ width: "500px" }}>
      <div className="card-body">
        <h3 className="card-title text-center fw-bold">Users List</h3>
        <ul className="list-group list-group-flush">
          {store.userList.map((user) => (
            <li
              key={user.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span className="fw-bold">
                {user.first_name} {user.last_name}
              </span>
              <span className="badge bg-primary rounded-pill">{user.id}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UsersList;