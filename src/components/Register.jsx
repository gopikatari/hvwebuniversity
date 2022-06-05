import React, { useEffect, useState } from "react";

function Register() {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    fullName: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    receiveNewsLetters: false,
  });

  const [countries, setCountries] = useState([
    { id: 0, country: "--select--" },
    { id: 1, country: "China" },
    { id: 2, country: "Nepal" },
    { id: 3, country: "India" },
    { id: 4, country: "Germany" },
    { id: 5, country: "United States" },
    { id: 6, country: "Brazil" },
    { id: 7, country: "France" },
    { id: 8, country: "UK" },
    { id: 9, country: "SwitherLand" },
  ]);

  //*******************************************Valdiation**************************************** */

  ///validation fields declaration
  let [errors, setErrors] = useState([
    {
      email: [],
      password: [],
      fullName: [],
      gender: [],
      dateOfBirth: [],
      receiveNewsLetters: [],
      countries: [],
    },
  ]);

  //making fields as not dirty initially(not touched)
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
    fullName: false,
    gender: false,
    dateOfBirth: false,
    receiveNewsLetters: false,
    country: false,
  });
  let [message, setMessage] = useState("");

  ///validation logic

  let validate = () => {
    let errorsData = [];
    setErrors(errorsData);

    // email start
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errorsData.email = [];

    if (!register.email) {
      errorsData.email.push("Email is required");
    }

    if (register.email && !emailRegex.test(register.email)) {
      errorsData.email.push("Please enter valid email address");
    }
    //email field end

    // password field start
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    errorsData.password = [];
    if (!register.password) {
      errorsData.password.push("password is required");
    }
    if (register.password && !passwordRegex.test(register.password)) {
      errorsData.password.push(
        "Password should have alteast one upper/lowercase letters and a number in it"
      );
    }
    //password field end

    //fullname start
    errorsData.fullName = [];
    if (!register.fullName) {
      errorsData.fullName.push("FullName is required");
    }
    //fullName ends

    //Gender start
    errorsData.gender = [];
    if (!register.gender) {
      errorsData.gender.push("Gender is required");
    }
    //gender ends

    //dateOfBirth start
    errorsData.dateOfBirth = [];
    if (!register.dateOfBirth) {
      errorsData.dateOfBirth.push("Date of Birth is required");
    }
    //dateOfBirth ends

    //country start
    errorsData.country = [];

    if (!register.country) {
      errorsData.country.push("Country is required");
    }
    //gender ends

    setErrors(errorsData);
  };
  let isValid = () => {
    let valid = true;

    Object.values(errors).map(property => {
      if (property.length > 0) {
        valid = false;
      }
    });

    return valid;
  };
  //*******************************************Validation ends**************************************** */

  useEffect(() => {
    document.title = "Register";
  }, []);

  useEffect(() => {
    validate();
  }, [register]);

  //events
  const handleChange = event => {
    if (event.target.name === "receiveNewsLetters") {
      setRegister({
        ...register,
        [event.target.name]: event.target.checked,
      });
    } else {
      setRegister({
        ...register,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onRegisterClick = () => {
    let dirtyData = dirty;
    Object.keys(dirty).forEach(dirtyElement => {
      dirtyData[dirtyElement] = true;
    });
    setDirty(dirtyData);
    validate();

    if (isValid()) {
      setMessage(<span className="text-success">Success</span>);
    } else {
      setMessage(<span className="text-danger">Form Validation Failed</span>);
    }

    console.log("register click");
  };
  //events

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6 mx-auto">
          <div className="card border-primary my-3 shadow">
            <div className="card-header border-bottom border-primary">
              <h4
                style={{
                  fontSize: "35px",
                }}
                className="text-center text-primary"
              >
                Register
              </h4>
              <ul className="text-danger">
                {Object.keys(errors).map(property => {
                  if (dirty[property]) {
                    return errors[property].map(propError => (
                      <li key={propError}>{propError}</li>
                    ));
                  } else {
                    return "";
                  }
                })}
              </ul>
            </div>
            <div className="card-body">
              <div className="form-group form-row">
                <label htmlFor="email" className="col-lg-4">
                  Email
                </label>
                <div className="col-lg-8">
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="abc@abc.com"
                    value={register.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Email ends */}

              <div className="form-group form-row">
                <label htmlFor="password" className="col-lg-4">
                  Password
                </label>
                <div className="col-lg-8">
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="**********"
                    value={register.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* password ends */}

              <div className="form-group form-row">
                <label htmlFor="fullName" className="col-lg-4">
                  Full Name
                </label>
                <div className="col-lg-8">
                  <input
                    id="fullName"
                    type="text"
                    className="form-control"
                    name="fullName"
                    placeholder="enter name"
                    value={register.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* dateOfBirth */}

              <div className="form-group form-row">
                <label htmlFor="dateOfBirth" className="col-lg-4">
                  Date of Birth
                </label>
                <div className="col-lg-8">
                  <input
                    id="dateOfBirth"
                    type="date"
                    className="form-control"
                    name="dateOfBirth"
                    placeholder="date of birth"
                    value={register.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="form-group form-row">
                <label htmlFor="gender" className="col-lg-4">
                  Gender
                </label>

                <div className="col-lg-8">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                      className="form-check-input"
                      checked={register.gender === "male" ? true : false}
                      onChange={handleChange}
                    />
                    <label htmlFor="male" className="form-check-inline">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                      className="form-check-input"
                      checked={register.gender === "female" ? true : false}
                      onChange={handleChange}
                    />
                    <label htmlFor="female" className="form-check-inline">
                      Female
                    </label>
                  </div>
                </div>
              </div>

              {/* Country */}
              <div className="form-group form-row">
                <label htmlFor="country" className="col-lg-4">
                  Country
                </label>
                <div className="col-lg-8">
                  <select
                    name="country"
                    id="country"
                    value={register.country}
                    className="form-control"
                    onChange={handleChange}
                  >
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Receive receiveNewsLetters */}
              <div className="form-group form-row">
                <label
                  htmlFor="receiveNewsLetters"
                  className="col-lg-4"
                ></label>
                <div className="col-lg-8">
                  <div className="form-check">
                    <input
                      id="receiveNewsLetters"
                      type="checkbox"
                      name="receiveNewsLetters"
                      className="form-check-input"
                      value={register.receiveNewsLetters}
                      checked={
                        register.receiveNewsLetters === true ? true : false
                      }
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="receiveNewsLetters"
                      className="form-check-inline"
                    >
                      Receive news letters ?
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* submit button */}
            <div className="card-footer text-center">
              <div className="m-1">{message}</div>
              <div>
                <button
                  className="btn btn-primary m-2"
                  onClick={onRegisterClick}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Register;
