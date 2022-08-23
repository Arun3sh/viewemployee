import { TextField, Button, FormGroup, Checkbox } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Adduser() {
  const submituser = () => {
    console.log("submitting", values);
  };

  const handleRadioChange = (event) => {
    values.gender = event.target.value;
  };

  const formValidationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email(),
    age: yup.number().min(18),
    gender: yup.string(),
    // preferredLocation: yup.string().required(),
  });

  const { values, handleSubmit, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        title: "Mr",
        name: "",
        email: "",
        age: "",
        gender: "female",
        preferredLocation: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: () => submituser(),
    });

  //     multiselect - preferred location
  // image - upload

  let pl = [{ Coimbatore: false }, { Chennai: false }, { Madurai: false }];

  const handleSelectChange = (event) => {
    pl.map((e) => {
      e = event.target.value;
    });
    console.log(event.target.value, pl);
  };

  return (
    <div className="container-sm adduser-container">
      <div className="adduser-wrapper">
        <form className="user-form" onSubmit={handleSubmit}>
          <Select
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
              defaultValue="female"
              name="gender"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" onChange={handleSelectChange}>
            <FormLabel component="legend">Preferred Location</FormLabel>
            <FormGroup aria-label="position" row>
              {pl.map((e, index) => (
                <FormControlLabel
                  key={index}
                  value={e}
                  control={<Checkbox />}
                  label={e}
                />
              ))}
            </FormGroup>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Preferred Location</FormLabel>
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="Coimbatore"
                control={<Checkbox />}
                label="Coimbatore"
              />
              <FormControlLabel
                value="Chennai"
                control={<Checkbox />}
                label="Chennai"
              />
              <FormControlLabel
                value="Madurai"
                control={<Checkbox />}
                label="Madurai"
              />
            </FormGroup>
          </FormControl>

          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Adduser;
