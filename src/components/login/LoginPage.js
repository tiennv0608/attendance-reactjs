import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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
        localStorage.setItem("token", res.data.object.token);
        localStorage.setItem("authority", res.data.object.roles[0].authority);
        console.log(">>>check login: ", res.data.object);
        let path = "";
        if (res.data.object.roles[0].authority === "ADMIN") {
          path = "/accounts";
        } else if (res.data.object.roles[0].authority === "TEACHER") {
          path = "/teachers";
        } else if (res.data.object.roles[0].authority === "STUDENT") {
          path = "/students";
        }
        setTimeout(() => {
          navigate(path);
        }, 3000);
      })
      .catch((error) => {
        alert("Sai tài khoản hoặc mật khẩu rồi bạn êii!");
        navigate("/");
      });
  };

  return (
    <>
      <div>
        <h2>Login</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="username">Username</label>
                </td>
                <td>
                  <span>:</span>
                  <input
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
                  <label htmlFor="password">Password</label>
                </td>
                <td>
                  <span>:</span>
                  <input
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
                  <button type="submit">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
