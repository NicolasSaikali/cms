import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ChatPage from "./pages/chat/page";
import Blog from "./pages/blog/page";
import Dashboard from "./pages/dashboard";
import ProductPage from "./pages/products/page";
import AppointmentPage from "./pages/appointments/page";
import Login from "./pages/login";
import React, { useState, useEffect } from "react";
import { firestore } from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyB9ZE0l4S6AlG0N4u5kWBU7kq_Sa-RexgQ",
  authDomain: "salocin.firebaseapp.com",
  projectId: "salocin",
  storageBucket: "salocin.appspot.com",
  messagingSenderId: "2655309097",
  appId: "1:2655309097:web:5e1556371137495176bb38",
};

firebase.initializeApp(firebaseConfig);
const functions = require("firebase-functions");
const auth = firebase.auth();

function App() {
  const [user, setUser] = useState(null);
  const [sidebar_active, set_active] = useState(false);
  const [active_page, set_active_page] = useState("dashboard");
  localStorage.setItem("password", "123123123");
  return user ? (
    <React.Fragment>
      <Router>
        <div
          className={`sidebar ${sidebar_active && "active"}`}
          onMouseOver={() => {
            set_active(true);
          }}
          onMouseOut={() => {
            set_active(false);
          }}
        >
          <nav className="d-flex flex-column">
            <div className="brand"></div>
            <div className="h-100 d-flex flex-column justify-content-between">
              <ul className="d-flex flex-column">
                <li
                  className={`${active_page === "dashboard" ? "active" : ""}`}
                  onClick={() => {
                    set_active_page("dashboard");
                  }}
                >
                  <Link to="/dashboard">
                    <div className="d-flex">
                      Dashboard
                      <i className="fa fa-dashboard"></i>
                    </div>
                  </Link>
                </li>
                <li
                  onClick={() => {
                    set_active_page("products");
                  }}
                  className={`${active_page === "products" ? "active" : ""}`}
                >
                  <Link to="/products">
                    <div className="d-flex">
                      Products
                      <i className="fa fa-shopping-bag"></i>
                    </div>
                  </Link>
                </li>
                <li
                  onClick={() => {
                    set_active_page("appointments");
                  }}
                  className={`${
                    active_page === "appointments" ? "active" : ""
                  }`}
                >
                  <Link to="/appointments">
                    <div className="d-flex">
                      Appointments
                      <i className="fa fa-calendar"></i>
                    </div>
                  </Link>
                </li>
                <li
                  className={`${active_page === "blog" ? "active" : ""}`}
                  onClick={() => {
                    set_active_page("blog");
                  }}
                >
                  <Link to="/blog">
                    <div className="d-flex">
                      Blog
                      <i className="fa fa-film"></i>
                    </div>
                  </Link>
                </li>
                <li
                  className={`${active_page === "chat" ? "active" : ""}`}
                  onClick={() => {
                    set_active_page("chat");
                  }}
                >
                  <Link to="/chat">
                    <div className="d-flex">
                      Chat
                      <i className="fa fa-weixin"></i>
                    </div>
                  </Link>
                </li>
                <li
                  className={`${active_page === "login" ? "active" : ""}`}
                  onClick={() => {
                    set_active_page("login");
                  }}
                >
                  <Link to="/login">
                    <div className="d-flex">
                      Login
                      <i className="fa fa-weixin"></i>
                    </div>
                  </Link>
                </li>
              </ul>
              <div>
                <hr />
                <ul>
                  <li
                    onClick={() => {
                      set_active_page("settings");
                    }}
                    className={`${active_page === "settings" ? "active" : ""}`}
                  >
                    <Link to="/settings">
                      <div className="d-flex">
                        Settings
                        <i className="fa fa-cog"></i>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div className={`active-component ${sidebar_active && "active"}`}>
          <div className="inner">
            <Switch>
              <Route path="/dashboard" component={Dashboard}>
                <Dashboard funtions={functions} firebase={firebase} />
              </Route>
              <Route path="/products" component={ProductPage}>
                <ProductPage funtions={functions} firebase={firebase} />
              </Route>
              <Route path="/appointments" component={AppointmentPage}>
                <AppointmentPage funtions={functions} firebase={firebase} />
              </Route>
              <Route path="/blog" component={Blog}>
                <Blog funtions={functions} firebase={firebase} />
              </Route>
              <Route path="/chat" component={ChatPage}>
                <ChatPage funtions={functions} firebase={firebase} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  ) : (
    <Login
      auth={auth}
      user={user}
      setUser={setUser}
      firestore={firebase.firestore()}
    />
  );
}

export default App;
