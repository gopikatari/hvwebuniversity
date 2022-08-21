import React from "react";

import ReactDOM from "react-dom/client";

import "jquery";
import "popper.js/dist/umd/popper";

import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

//working on index.html
