import React from "react";
import axios from "axios";

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = () => {
    let data = this.state;
    console.log(data);
    let headers = {
      "Content-Type": "application/json",
    };

    axios.post("http://localhost:8081/login", data, headers).then((res) => {
      console.log(res);
    });
  };

  render() {
    return (
      <>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(e) => this.handleOnChangeUsername(e)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => this.handleOnChangePassword(e)}
          />
        </div>
        <div>
          <button type="button" onClick={() => this.handleLogin()}>
            Login
          </button>
        </div>
      </>
    );
  }
}

export default LoginPage;
