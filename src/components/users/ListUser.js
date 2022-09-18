import React from "react";
import axios from "axios";

class ListUser extends React.Component {
  async componentDidMount() {
    let authorization = "Bearer " + localStorage.getItem("token");
    console.log(">>Check bearer token: ", authorization);
    await axios
      .get("http://localhost:8081/users", {
        headers: {
          Authorization: authorization.replace,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <>
        <div>List user</div>
        <div>List user</div>
      </>
    );
  }
}

export default ListUser;
