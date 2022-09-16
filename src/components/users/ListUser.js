import React from "react";
import axios from "axios";

class ListUser extends React.Component {
  async componentDidMount() {
    await axios.get("http://localhost:8081/users").then((res) => {
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
