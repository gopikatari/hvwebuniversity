import React, { useState, useEffect } from "react";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    return () => {
      console.log("LOGIN componet Unmounting.....");
    };
  });

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

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
                />
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
                />
              </div>
              {/* password ends */}
            </div>
            <div className="card-footer border-bottom border-success text-center">
              <label className="small float-left" htmlFor="">
                Register
              </label>
              <button className="btn btn-success float-right">Login</button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
