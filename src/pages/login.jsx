import React, { useState, useEffect, createFactory } from "react";
import { Redirect, Router } from "react-router-dom";
export default function Login(props) {
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const firestore = props.firestore;

  const getUserDocument = () => {
    const result = firestore
      .collection("users")
      .where("email", "==", credentials.email)
      .get()
      .then((response) => {
        console.log(response);
        if (response.empty) return false;
        localStorage.setItem("user", response.data());
        return response.data();
      });
  };

  const loginSubadmin = () => {
    firestore
      .collection("SubAdmins")
      .where("email", "==", credentials.email)
      .where("password", "==", credentials.password)
      .get()
      .then((response) => {
        if (response.empty) setError("Wrong Credentials");
        else {
          localStorage.setItem("user", JSON.stringify(response.docs[0].data()));
          props.setUser(response.docs[0].data());
        }
      });
  };
  // useEffect(async () => {
  //   props.auth.onAuthStateChanged(async (userAuth) => {
  //     const res = await getUserDocument(credentials);
  //     if (res === false) alert("wrong credentials");
  //     else props.setUser(res);
  //   });
  // }, []);

  const Login = () => {
    setError(null);
    props.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((e) => {
        // var provider = new props.firebase.auth.GoogleAuthProvider();
        localStorage.setItem("user", JSON.stringify(credentials));
        props.setUser(credentials);
      })
      .catch((error) => {
        setError("Wrong credentials");
        console.error("Error signing in with password and email", error);
      });
  };

  return (
    <div className="login-page">
      <img src="./assets/login_bg.jpg" alt="" className="login-bg" />
      <div className="overlay"></div>
      <div className="login-form">
        <div className="p-4">
          <div
            className="w-100 py-2 text-center text-bold text-uppercase title"
            style={{ fontWeight: "600" }}
          >
            admin login
          </div>
          <div
            className={`text-danger text-center py-1 ${
              error !== null ? "opacity-1" : "opacity-0"
            }`}
          >
            {error}
          </div>
          <input
            type="email"
            name=""
            id=""
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
          <input
            type="password"
            name=""
            id=""
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
          <div className="w-100 py-2"></div>
          <button
            className="btn bg-green-dark w-100 text-uppercase text-light"
            onClick={() => {
              Login();
            }}
          >
            login
          </button>
          <button
            className="btn bg-light color-dark w-100 text-uppercase  mt-3"
            onClick={() => {
              loginSubadmin();
            }}
          >
            login as subadmin
          </button>
        </div>
      </div>
    </div>
  );
}
