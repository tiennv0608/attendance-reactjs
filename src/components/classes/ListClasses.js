import { useEffect, useState } from "react";
import axios from "axios";

const ListClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let authorization = "Bearer " + localStorage.getItem("token");
    axios
      .get("http://localhost:8081/classes", {
        headers: { Authorization: authorization },
      })
      .then((res) => {
        setClasses(res.data.object);
        setIsLoading(false);
      })
      .catch((err) => {
        return <div>You don't have permission</div>;
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <>
          <h3 className="title">List Classes</h3>
          <table id="accounts">
            <thead>
              <tr>
                <th>No.</th>
                <th>Classes Name</th>
              </tr>
            </thead>
            <tbody>
              {classes &&
                classes.length > 0 &&
                classes.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ListClasses;
