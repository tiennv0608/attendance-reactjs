import "../../styles/Navigation.scss";
import React from "react";
import { NavLink } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <div className="topnav">
        <NavLink end to="/">
          Home
        </NavLink>
        <NavLink to="/todo">Todos</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/users">Users</NavLink>
      </div>
    );
  }
}

export default Navigation;
