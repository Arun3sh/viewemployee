import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../global";
import axios from "axios";
import { Button } from "@mui/material";

function Viewemployee() {
  const { id } = useParams();
  const [emp, setEmp] = useState([]);
  const history = useHistory();
  const getEmp = () => {
    axios
      .get(`${API}/${id}`)
      .then(({ data }) => setEmp(data))
      .catch((err) => alert(err));
  };
  useEffect(getEmp, []);
  return (
    <div className="conatiner-sm viewemp-container">
      <Button variant="text" onClick={() => history.push("/")}>
        Home
      </Button>
      <div className="viewemp-wrapper">
        <li>
          <ul>
            {emp.title}. {emp.name}
          </ul>
          <ul>{emp.email}</ul>
          <ul>{emp.age}</ul>
          <ul>{emp.gender}</ul>
          <ul>{emp.preferredLocation}</ul>
          <ul>{emp.profilepicname}</ul>
          <ul>{emp.profilepicpath}</ul>
          <img src={emp.profilepicpath} alt="noimg" />
        </li>
      </div>
    </div>
  );
}
export default Viewemployee;
