import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const authorization = "Bearer " + localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:8081/teachers", {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        setTeachers(res.data.object);
        setIsLoading(false);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        localStorage.removeItem("authority");
        navigate("/login");
      });
  }, [isLoading]);

  const handleOnChange = (e, field) => {
    let values = e.target.value;
    setTeacher({ ...teacher, [field]: values });
  };

  const addNewTeacher = () => {
    axios
      .post("http://localhost:8081/teachers", teacher, {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        setTeacher({
          firstName: "",
          lastName: "",
          birthday: "",
          phone: "",
          address: "",
        });
        document.querySelector(".btn-close").click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {!isLoading && (
        <>
          <h3 className="title">List Teachers</h3>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            New
          </button>
          <table id="accounts">
            <thead>
              <tr>
                <th>No.</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Birthday</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers &&
                teachers.length > 0 &&
                teachers.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.birthday}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>Edit | Delete | View</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    New teacher
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="first-name" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="first-name"
                      onChange={(e) => handleOnChange(e, "firstName")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="last-name" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="last-name"
                      onChange={(e) => handleOnChange(e, "lastName")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">
                      Birthday
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthday"
                      onChange={(e) => handleOnChange(e, "birthday")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      onChange={(e) => handleOnChange(e, "phone")}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      onChange={(e) => handleOnChange(e, "address")}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => addNewTeacher()}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListTeachers;
