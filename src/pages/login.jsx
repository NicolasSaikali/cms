import React, { useState, useEffect } from "react";

export default function Login(props) {
  const [error, setError] = useState(null);

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
    setError(null);
    props.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((e) => {
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
        </div>
      </div>
    </div>
  );
}
