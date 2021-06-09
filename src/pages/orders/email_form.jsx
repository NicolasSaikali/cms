import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_zM3jzJZ5HlTtx3za2B9My");
const apiKey = {
  USER_ID: `user_zM3jzJZ5HlTtx3za2B9My`, //userID
  TEMPLATE_ID: `template_0319llp`, //templateID
};
export default function EmailForm(props) {
  let LOCATION = useLocation();
  const [form, setForm] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_em2mvfc", apiKey.TEMPLATE_ID, e.target, apiKey.USER_ID)
      .then(
        (result) => {
          alert("Message Sent, We will get back to you shortly", result.text);
        },
        (error) => {
          alert("An error occurred, Please try again", error.text);
        }
      );
  };
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
          <form
            onChange={() => {
              setForm(form);
            }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input type="hidden" name="brand" value="animal hospital" />
            <input
              type="text"
              type="hidden"
              name="subject"
              value={LOCATION.state.subject}
            />
            <input
              type="text"
              disabled
              name="email"
              value={LOCATION.state.email}
              className="form-control"
            />
            <div className="w-100 py-3"></div>
            <small>message:</small>
            <textarea
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
              }}
              name="message"
              cols="30"
              rows="10"
              className="form-control"
            ></textarea>
            <div className="py-2 w-100"></div>
            <button
              type="submit"
              className="btn bg-green-dark float-right position-relative text-light"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
