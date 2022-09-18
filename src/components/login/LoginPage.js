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

  handleLogin = async () => {
    let data = this.state;

    await axios
      .post("http://localhost:8081/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.object.token);
      })
      .catch((error) => {
        console.log(error);
      });
    // await axios
    //   .get("http://localhost:8081/users", {
    //     headers: { Authorization: `Bearer ${this.state.token}` },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  render() {
    return (
      <>
        <div>
          <h2>Login</h2>
        </div>
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
                    onChange={(e) => this.handleOnChangeUsername(e)}
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
                    onChange={(e) => this.handleOnChangePassword(e)}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <button type="button" onClick={() => this.handleLogin()}>
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default LoginPage;
