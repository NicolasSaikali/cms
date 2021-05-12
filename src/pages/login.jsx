import React, { useState, useEffect } from "react";

export default function Login(props) {
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
        return response.data();
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
    props.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.error("Error signing in with password and email", error);
      });
  };

  return (
    <div className="login-page">
      <img src="./assets/login_bg.jpg" alt="" class="login-bg" />
      <div className="overlay"></div>
      <div className="login-form">
        <div className="p-4">
          <div
            className="w-100 py-4 text-center text-bold text-uppercase title"
            style={{ fontWeight: "600" }}
          >
            admin login
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
            className="btn bg-green-light w-100 text-uppercase text-light"
            onClick={() => {
              Login();
            }}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
}
