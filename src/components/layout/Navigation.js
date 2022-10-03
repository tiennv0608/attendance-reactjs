import "../../styles/Navigation.scss";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useCheckRole from "../hooks/useCheckRole";

const Navigation = () => {
  const { isAdmin, isTeacher, isStudent } = useCheckRole(
    localStorage.getItem("authority")
  );

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin || isTeacher || isStudent) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authority");
    navigate("/");
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
      {isLogin ? (
        <button className="btn-logout" onClick={() => handleLogout()}>
          Logout
        </button>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};

export default Navigation;
