import React, { useState, useEffect } from "react";

const Login = props => {
  const [login, setLogin] = useState({ email: "", password: "" });
  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    validate();
    return () => {
      console.log("LOGIN componet Unmounting.....");
    };
  }, [login]);
  //validation

  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  const [msg, setMsg] = useState("");

  const validate = () => {
    const errorsData = [];

    //email
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    errorsData.email = [];
    if (!login.email) {
      errorsData.email.push("Email is required");
    }
    if (login.email && !emailRegex.test(login.email)) {
      errorsData.email.push("Email is not in a valid format");
    }

    //password
    errorsData.password = [];
    if (!login.password) {
      errorsData.password.push("Password is required");
    }

    setErrors(errorsData);
  };

  const isValid = () => {
    let valid = true;

    Object.values(errors).forEach(errValues => {
      if (errValues.length > 0) valid = false;
    });
    return valid;
  };

  //validation ends

  //events
  const handleBlur = e => {
    setDirty({ ...dirty, [e.target.name]: true });
  };
  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async event => {
    //make files dirty

    const dirtyData = dirty;
    Object.keys(dirty).forEach(dirtyProperty => {
      dirtyData[dirtyProperty] = true;
    });
    setDirty(dirtyData);

    validate();

    if (isValid()) {
      let response = await fetch(
        `http://localhost:5000/users?email=${login.email}&password=${login.password}`,
        { method: "GET" }
      );
      if (response.ok) {
        let resBody = await response.json();
        console.log(resBody);
        if (resBody.length > 0) {
          props.history.replace("/dashboard");
        } else {
          setMsg(
            <span className="text-danger">Invaid Credentials failure</span>
          );
        }
      } else {
        setMsg(<span className="text-danger">Unable to connect</span>);
      }
    } else {
      setMsg(<span className="text-danger">Login failure</span>);
    }
  };
  //events ends
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-5 col-md-7 mx-auto">
          <div className="card border-success shadow-lg my-2">
            <div className="card-header border-bottom border-success">
              <h4
                style={{ fontSize: "34px" }}
                className="text-success text-center"
              >
                Login
              </h4>
              <ul className="text-danger">
                {Object.keys(errors).map(errEl => {
                  if (dirty[errEl]) {
                    return errors[errEl].map(errMsg => (
                      <li key={errMsg}>{errMsg}</li>
                    ));
                  } else {
                    return "";
                  }
                })}
              </ul>
            </div>
            <div className="card-body border-top border-bottom border-success">
              {/* email starts */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="abc@abc.com"
                  id="email"
                  className="form-control"
                  value={login.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {dirty["email"] && errors["email"][0] ? errors["email"] : ""}
                </div>
              </div>
              {/* email ends */}

              {/* password starts */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="**********"
                  id="password"
                  className="form-control"
                  value={login.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-danger">
                  {dirty["password"] && errors["password"][0]
                    ? errors["password"]
                    : ""}
                </div>
              </div>
              {/* password ends */}
            </div>
            <div className="card-footer border-bottom border-success text-center">
              <label className="small float-left" htmlFor="">
                {msg}
              </label>
              <button
                onClick={handleSubmit}
                className="btn btn-success float-right"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
