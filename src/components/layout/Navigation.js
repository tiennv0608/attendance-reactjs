import "../../styles/Navigation.scss";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useCheckRole from "../hooks/useCheckRole";

const Navigation = () => {
  const roles = useCheckRole(localStorage.getItem("authority"));

  const [isAdmin, setIsAdmin] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(">>>check roles ", roles);
    if (roles.isAdmin) setIsAdmin(true);
    if (roles.isTeacher) setIsTeacher(true);
    if (roles.isStudent) setIsStudent(true);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authority");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="topnav">
      <NavLink end to="/">
        Home
      </NavLink>
      <NavLink to="/todo">Todos</NavLink>
      <NavLink to="/about">About</NavLink>
      {isAdmin ? <NavLink to="/accounts">Account</NavLink> : null}
      {isTeacher ? <NavLink to="/teachers">Teacher</NavLink> : null}
      {isStudent ? <NavLink to="/students">Student</NavLink> : null}
      {isAdmin || isTeacher || isStudent ? (
        <button className="btn btn-logout" onClick={() => handleLogout()}>
          Logout
        </button>
      ) : (
        <button className="btn btn-login" onClick={() => handleLogin()}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navigation;
