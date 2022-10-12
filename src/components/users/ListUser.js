import React, { useState, useEffect } from "react";
import axios from "axios";
import useCheckRole from "../hooks/useCheckRole";
import { useNavigate } from "react-router-dom";
import "../../styles/ListUser.scss";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { isAdmin, isTeacher, isStudent } = useCheckRole(
    localStorage.getItem("authority")
  );

  useEffect(() => {
    let authorization = "Bearer " + localStorage.getItem("token");
    axios
      .get("http://localhost:8081/users", {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        setUsers(res.data.object);
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/login");
      });
    return;
  }, [isLoading]);

  return (
    <>
      {!isLoading && (
        <>
          <h3 className="title">List Account</h3>
          <table id="accounts">
            <thead>
              <tr>
                <th>No.</th>
                <th>Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {isAdmin ? (
                users && users.length ? (
                  users.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.username}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.age}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="none-account" colSpan="5">
                      There is no account in the list
                    </td>
                  </tr>
                )
              ) : null}
              {!isAdmin ? (
                <tr>
                  <td className="not-permission" colSpan="5">
                    You don't have permission to view this page
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ListUser;
