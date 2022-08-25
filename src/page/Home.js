import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API } from "../global";
import "./Home.css";

function Home() {
  const history = useHistory();
  const [employee, setEmployee] = useState([]);
  const getAllEmp = () => {
    axios.get(`${API}/`).then(({ data }) => setEmployee(data));
  };
  useEffect(getAllEmp, []);
  const deleteUser = (id) => {
    axios.delete(`${API}/delete-employee/${id}`).then(() => getAllEmp());
  };
  return (
    <div className="home-container container-sm">
      <div className="home-wrapper">
        <Button
          variant="outlined"
          onClick={() => history.push("/add-employee")}
        >
          Add Employee
        </Button>
        <div className="disp-emp">
          <GetTable employee={employee} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
}

function GetTable({ employee, deleteUser }) {
  const thvalues = ["Name", "Email", "Action"];
  const history = useHistory();
  return (
    <table className="table">
      <thead>
        <tr>
          {thvalues.map((data, index) => (
            <th key={index}>{data}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {employee.map(({ name, email, _id }) => (
          <tr key={_id}>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <Button onClick={() => history.push(`/view-employee/${_id}`)}>
                View
              </Button>
              <Button onClick={() => history.push(`/edit-employee/${_id}`)}>
                Edit
              </Button>
              <Button onClick={() => deleteUser(_id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default Home;
