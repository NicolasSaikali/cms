import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function EmailForm(props) {
  let LOCATION = useLocation();
  const [form, setForm] = useState({
    subject: LOCATION.state.subject,
    email: LOCATION.state.email,
    message: "",
  });
  return (
    <div className="email-form">
      <div className="container-fluid">
        <div className="jumbotron bg-green-dark">
          <h1 className="display-4">Email Sender</h1>
          <p className="lead"></p>
        </div>
        <div className="container">
          <div className="d-flex justify-content-between"></div>
          <div className="w-100 py-2"></div>
          <small>to</small>
          <input
            type="text"
            disabled
            value={LOCATION.state.email}
            className="form-control"
          />
          <div className="w-100 py-3"></div>
          <small>message:</small>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="form-control"
          ></textarea>
          <div className="py-2 w-100"></div>
          <button className="btn bg-green-dark float-right position-relative text-light">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
