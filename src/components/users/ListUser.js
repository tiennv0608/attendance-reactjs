import React from "react";
import axios from "axios";

class ListUser extends React.Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    let authorization = "Bearer " + localStorage.getItem("token");
    await axios
      .get("http://localhost:8081/users", {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        this.setState({
          users: res.data.object,
        });
      });
  }

  render() {
    const { users } = this.state;
    console.log(users);

    return (
      users &&
      users.length &&
      users.map((item, index) => {
        return (
          <div key={item.id}>
            {index + 1} - {item.username}
          </div>
        );
      })
    );
  }
}

export default ListUser;
