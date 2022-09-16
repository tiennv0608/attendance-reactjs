import React from "react";

class LoginPage extends React.Component {
  render() {
    return (
      <>
        <div>
          <h2>Login</h2>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <div>
          <button type="button">Login</button>
        </div>
      </>
    );
  }
}

export default LoginPage;
