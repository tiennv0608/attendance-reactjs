import React, { useState, useEffect } from "react";
import axios from "axios";
import useCheckRole from "../hooks/useCheckRole";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const { isAdmin, isTeacher, isStudent } = useCheckRole(
    localStorage.getItem("authority")
  );

  useEffect(() => {
    if (!isAdmin) {
      alert("You don't have permission");
      navigate("/");
    } else {
      let authorization = "Bearer " + localStorage.getItem("token");
      axios
        .get("http://localhost:8081/users", {
          headers: { Authorization: authorization },
        })
        .then((res) => {
          setUsers(res.data.object);
        });
    }
  }, []);

  return (
    users &&
    users.length &&
    users.map((item, index) => {
      return (
        <div key={item.id}>
          {index + 1} - {item.username}
        </div>
      );
    })
  );
};

export default ListUser;
