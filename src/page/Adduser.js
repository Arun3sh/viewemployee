import "./Adduser.css";
import {
  TextField,
  Button,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API } from "../global";
import { useHistory } from "react-router-dom";

toast.configure();

function Adduser() {
  const [loc, setLoc] = useState([]);
  const handleRadioChange = (event) => {
    values.gender = event.target.value;
  };
  const history = useHistory();
  const formValidationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email(),
    age: yup.number().min(18),
    gender: yup.string().required(),
    preferredLocation: yup.array().min(1, "Minimun 2").required(),
    profilepic: yup
      .mixed()
      .test("fileType", "unsupported Format", function (value) {
        const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
        return SUPPORTED_FORMATS.includes(value.type);
      })
      .test("fileSize", "File Size is too large", (value) => {
        const sizeInBytes = 500000;
        return value.size <= sizeInBytes;
      })
      .required("Profile Picture Required"),
  });

  const {
    values,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "Mr",
      name: "",
      email: "",
      age: "",
      gender: "other",
      preferredLocation: [],
      profilepic: null,
    },
    validationSchema: formValidationSchema,
    onSubmit: () => submituser(),
  });

  let pl = ["Coimbatore", "Chennai", "Madurai"];
  let genderValue = ["Female", "Male", "Other"];
  const [picture, setPicture] = useState(null);
  const fileInput = useRef(null);

  const handleLocationChange = (event) => {
    let index = loc.indexOf(event.target.value);
    values.preferredLocation = [];
    if (index === -1) {
      setLoc([...loc, event.target.value]);
    } else {
      setLoc(loc.filter((e) => e !== event.target.value));
    }

    values.preferredLocation.push(...loc);
  };

  const handleFileChange = (event) => {
    setFieldValue("profilepic", event.target.files[0]);
    setPicture(event.target.files[0]);
  };
  const submituser = async () => {
    values.preferredLocation = loc;
    const formData = new FormData();
    formData.append("file", picture);
    formData.append("title", values.title);
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("age", values.age);
    formData.append("gender", values.gender);
    formData.append("preferredLocation", values.preferredLocation);
    // formData.append("Name", values.name);
    console.log("submitting", formData);
    await axios({
      url: `${API}/add-employee`,
      method: "POST",
      data: formData,
    })
      .then(() => history.goBack())
      .catch((err) => toast.error(err));

    resetForm();
  };
  const [submitTried, setsubmitTried] = useState(false);
  return (
    <div className="container-sm adduser-container">
      <div className="adduser-wrapper">
        <form className="user-form" onSubmit={handleSubmit}>
          <Select
            className="title-select"
            labelId="Employee-Title"
            id="Employee-Title"
            value={values.title}
            label="title"
            name="title"
            onChange={handleChange}
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Ms">Ms</MenuItem>
          </Select>

          <TextField
            className="emp-name"
            name="name"
            id="name"
            aria-label="Name"
            label="Enter name"
            variant="outlined"
            value={values.name}
            style={{ width: "40vh" }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
            helperText={errors.name && touched.name ? errors.name : ""}
          />

          <TextField
            className="emp-email"
            name="email"
            id="email"
            aria-label="email"
            label="Enter email"
            variant="outlined"
            value={values.email}
            style={{ width: "40vh" }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email && touched.email}
            helperText={errors.email && touched.email ? errors.email : ""}
          />

          <TextField
            className="emp-age"
            name="age"
            id="age"
            aria-label="age"
            label="Enter age"
            variant="outlined"
            value={values.age}
            style={{ width: "40vh" }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.age && touched.age}
            helperText={errors.age && touched.age ? errors.age : ""}
          />

          <FormControl onChange={handleRadioChange}>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              className="radioGroup-userType"
              aria-label="type of user"
              defaultValue="Other"
              name="gender"
            >
              {genderValue.map((gen, index) => (
                <FormControlLabel
                  key={index}
                  value={gen}
                  control={<Radio />}
                  label={gen}
                />
              ))}
            </RadioGroup>
            <FormHelperText>
              {errors.gender && touched.gender ? errors.gender : ""}
            </FormHelperText>
          </FormControl>

          <FormControl
            component="fieldset"
            error={values.preferredLocation.length !== 2}
          >
            <FormLabel component="legend">Preferred Location *</FormLabel>
            <FormGroup className="emp-pl" aria-label="position" row>
              {pl.map((city, index) => (
                <FormControlLabel
                  key={index}
                  value={city}
                  control={
                    <Checkbox
                      checked={loc.includes(city)}
                      onChange={handleLocationChange}
                    />
                  }
                  label={city}
                />
              ))}
            </FormGroup>
            <FormHelperText>
              {errors.preferredLocation && touched.preferredLocation
                ? errors.preferredLocation
                : ""}
            </FormHelperText>
          </FormControl>

          <input
            style={{ display: "none" }}
            type="file"
            name="file"
            onChange={handleFileChange}
            ref={fileInput}
          />

          <p className={submitTried ? "error" : "helpertext"}>
            Please select a Image below 0.5 MB, File format jpg, jpeg, png
          </p>

          <Button
            onClick={() => fileInput.current.click() && setsubmitTried(true)}
            variant="outlined"
          >
            Add Profile Picture *
          </Button>

          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Adduser;
