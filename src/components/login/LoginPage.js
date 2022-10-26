import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/LoginPage.scss";
import { actions, useStore } from "../../store";

const LoginPage = () => {
  const [state, dispatch] = useStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    let data = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:8081/login", data)
      .then((res) => {
        let authority = res.data.object.roles[0].authority;
        localStorage.setItem("token", res.data.object.token);
        localStorage.setItem("authority", authority);
        let path = "";
        setTimeout(() => {
          dispatch(actions.setIsLogin(true));
          if (authority === "ADMIN") {
            path = "/accounts";
            dispatch(actions.setIsAdmin(true));
          } else if (authority === "TEACHER") {
            path = "/teachers";
            dispatch(actions.setIsTeacher(true));
          } else if (authority === "STUDENT") {
            path = "/students";
            dispatch(actions.setIsStudent(true));
          }
          navigate(path);
        }, 3000);
      })
      .catch((error) => {
        alert("Sai tài khoản hoặc mật khẩu rồi bạn êii!");
        navigate("/");
      });
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Login</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="form-login">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="form-control" htmlFor="username">
                    Username
                  </label>
                </td>
                <td>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className="form-control" htmlFor="password">
                    Password
                  </label>
                </td>
                <td>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button className="btn btn-outline-info" type="submit">
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
