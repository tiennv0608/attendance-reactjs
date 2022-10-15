import "../../styles/Navigation.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useStore, actions } from "../../store";

const Navigation = () => {
  const [state, dispatch] = useStore();

  const { isLogin, isAdmin, isTeacher, isStudent } = state;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authority");
    navigate("/");
    dispatch(actions.setIsLogin(false));
    dispatch(actions.setIsAdmin(false));
    dispatch(actions.setIsTeacher(false));
    dispatch(actions.setIsStudent(false));
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="topnav">
      <NavLink end to="/">
        Home
      </NavLink>
      <NavLink to="/classes">Classes</NavLink>
      {isAdmin ? <NavLink to="/accounts">Account</NavLink> : null}
      {isTeacher || isAdmin ? <NavLink to="/teachers">Teacher</NavLink> : null}
      {isStudent || isTeacher || isAdmin ? (
        <NavLink to="/students">Student</NavLink>
      ) : null}
      <NavLink to="/about">About</NavLink>
      {isLogin ? (
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
