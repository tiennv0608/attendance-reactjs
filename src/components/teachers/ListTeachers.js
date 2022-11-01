import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const url = "http://localhost:8081/teachers";

const ListTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    address: "",
  });

  const [modal, setModal] = useState({
    title: "New Teacher",
    id: "",
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    address: "",
    showFooter: true,
    isActive: true,
    isNew: true,
  });

  const [pageNo, setPageNo] = useState(0);

  const navigate = useNavigate();
  const authorization = "Bearer " + localStorage.getItem("token");

  const loadListTeacher = async () => {
    await axios
      .get(`${url}/paging?pageNo=${pageNo}&pageSize=5`, {
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
  };
  useEffect(() => {
    axios
      .get(url, { headers: { Authorization: authorization } })
      .then((res) => {
        setList(res.data.object);
      });
    loadListTeacher();
  }, [isLoading, pageNo]);

  const handleOnChange = (e, field) => {
    let values = e.target.value;
    setModal({ ...modal, [field]: values });
    setTeacher({ ...teacher, [field]: values });
  };

  const handleAddTeacher = () => {
    setModal({
      title: "New Teacher",
      id: "",
      firstName: "",
      lastName: "",
      birthday: "",
      phone: "",
      address: "",
      showFooter: true,
      isActive: true,
      isNew: true,
    });
  };

  const addNewTeacher = () => {
    axios
      .post(url, teacher, {
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
      .then(() => {
        loadListTeacher();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewDetail = (id) => {
    axios
      .get(`${url}/${id}`, {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        const { id, firstName, lastName, birthday, phone, address } =
          res.data.object;
        setModal({
          title: "Detail",
          id: id,
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          phone: phone,
          address: address,
          showFooter: false,
          isActive: false,
          isNew: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {};

  const handleEdit = (id) => {
    axios
      .get(`${url}/${id}`, {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        const { id, firstName, lastName, birthday, phone, address } =
          res.data.object;
        setModal({
          title: "Edit",
          id: id,
          firstName: firstName,
          lastName: lastName,
          birthday: birthday,
          phone: phone,
          address: address,
          showFooter: true,
          isActive: true,
          isNew: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTeacher = (id) => {
    console.log(">>>check teacher update: ", teacher);
    axios
      .put(`${url}/${id}`, teacher, {
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
      .then(() => {
        loadListTeacher();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (param) => {
    if (param === "next") {
      if (pageNo + 1 > list.length / 5) {
        setPageNo(0);
      } else {
        setPageNo(pageNo + 1);
      }
    } else if (param === "prev") {
      if (pageNo - 1 < 0) {
        setPageNo(Math.floor(list.length / 5));
      } else {
        setPageNo(pageNo - 1);
      }
    }
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
            onClick={() => handleAddTeacher()}
          >
            New
          </button>
          <table id="accounts" className="mt-2">
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
                  const id = item.id;
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.birthday}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn btn-warning m-1"
                          data-bs-target="#exampleModal"
                          data-bs-toggle="modal"
                          onClick={() => handleEdit(id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger m-1"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-success m-1"
                          data-bs-target="#exampleModal"
                          data-bs-toggle="modal"
                          onClick={() => handleViewDetail(id)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="m-2">
            <button className="m-2" onClick={() => handleChangePage("prev")}>
              Prev
            </button>
            <button className="m-2" onClick={() => handleChangePage("next")}>
              Next
            </button>
          </div>
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
                    {modal.title}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <input value={modal.id} type="hidden" />
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
                      value={modal.firstName}
                      onChange={(e) =>
                        modal.isActive ? handleOnChange(e, "firstName") : null
                      }
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
                      value={modal.lastName}
                      onChange={(e) =>
                        modal.isActive ? handleOnChange(e, "lastName") : null
                      }
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
                      value={modal.birthday}
                      onChange={(e) =>
                        modal.isActive ? handleOnChange(e, "birthday") : null
                      }
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
                      value={modal.phone}
                      onChange={(e) =>
                        modal.isActive ? handleOnChange(e, "phone") : null
                      }
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
                      value={modal.address}
                      onChange={(e) =>
                        modal.isActive ? handleOnChange(e, "address") : null
                      }
                    />
                  </div>
                </div>
                {modal.showFooter ? (
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
                      onClick={() => {
                        modal.isNew ? addNewTeacher() : updateTeacher(modal.id);
                      }}
                    >
                      Save changes
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ListTeachers;
