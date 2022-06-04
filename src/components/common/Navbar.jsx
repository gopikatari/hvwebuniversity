import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark myNavColor">
        <a href="/#" className="navbar-brand">
          ECommerce
        </a>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#myNavBar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse" id="myNavBar">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
                className="nav-link"
                activeClassName="active"
              >
                <i className="fa fa-dashboard mr-1"></i>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/"
                exact
                className="nav-link mx-2"
                activeClassName="active"
              >
                <i className="fa fa-lock mr-1"></i>
                Login
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/register"
                className="nav-link"
                activeClassName="active"
              >
                <div className="d-flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 svgIconNav"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span> Register</span>
                </div>
              </NavLink>
            </li>
          </ul>

          <ul className="ml-auto navbar-nav">
            <div style={{ marginRight: "100px" }}>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-user-o mr-1"></i>
                  User
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Logout
                  </a>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
