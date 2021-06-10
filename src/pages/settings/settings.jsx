import { user } from "firebase-functions/lib/providers/auth";
import React, { useState, useEffect } from "react";

export default function Settings(props) {
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [subAdmins, setSubAdmins] = useState([]);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    privileges: [],
  });

  useEffect(() => {
    setSubAdmins([]);
    getSubAdmins();
  }, []);

  const getSubAdmins = () => {
    firestore.collection("SubAdmins").onSnapshot((response) => {
      let tmp = [];
      response.forEach((subadmin) => {
        setSubAdmins([]);
        tmp.push(subadmin);
      });
      setSubAdmins(tmp);
    });
  };

  const handlePrivileges = (e) => {
    if (newUser.privileges.indexOf(e.target.id) === -1 && e.target.checked)
      setNewUser({
        ...newUser,
        privileges: [...newUser.privileges, e.target.id],
      });
    else if (
      newUser.privileges.indexOf(e.target.id) !== -1 &&
      !e.target.checked
    ) {
      let tmp = newUser.privileges;
      tmp.splice(tmp.indexOf(e.target.id), 1);

      setNewUser({
        ...newUser,
        privileges: tmp,
      });
    }
  };

  const addSubAdmin = () => {
    firestore
      .collection("SubAdmins")
      .doc()
      .set({
        email: newUser.email,
        password: newUser.password,
        privileges: newUser.privileges,
      })
      .then((response) => {
        setNewUser({
          email: "",
          password: "",
          privileges: [],
        });
      })
      .catch((error) => {
        alert("unable to add new user");
      });
  };

  return (
    <div className="settings-page">
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Settings!</h1>
          <p className="lead">
            Here you can:
            <ul>
              <li>Manage SubAdmins</li>
              <li>Manage Web Application Settings</li>
            </ul>
          </p>
        </div>
        <div className="container  py-3">
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button w-100 border-0 bg-lightgrey"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Sub Admins
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <div className="pb-3">
                    {subAdmins.map((subadmin) => (
                      <div className="py-2">
                        <div className="card bg-lightgrey p-2">
                          <h5 className="text-secondary">
                            {subadmin.data().email}
                          </h5>
                          <h6 className="color-dark mb-2">Privileges:</h6>
                          {subadmin.data().privileges.map((privilege) => (
                            <div className="text-dark">{privilege}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-100 py-3">
                    <div className="row">
                      <div className="col-md-6">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          className="form-control mb-3"
                          placeholder="Email"
                          onChange={(e) => {
                            setNewUser({ ...newUser, email: e.target.value });
                          }}
                        />
                        <input
                          type="password"
                          name="password"
                          id="password"
                          className="form-control mb-3"
                          placeholder="Password"
                          onChange={(e) => {
                            setNewUser({
                              ...newUser,
                              password: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="col-md-6">
                        <h5 className="color-dark">Privileges</h5>
                        <ul
                          className="list-unstyled"
                          style={{
                            display: "grid",
                            gridTemplateColumns: "auto auto",
                          }}
                        >
                          <li
                            className="d-flex justify-content-start align-items-center"
                            style={{ width: 100 }}
                          >
                            <input
                              className="m-0 p-0 position-relative float-left"
                              type="checkbox"
                              onChange={(e) => {
                                handlePrivileges(e);
                              }}
                              name="dashboard"
                              id="dashboard"
                            />
                            <label
                              htmlFor="dashboard"
                              className="m-0 pl-3 position-relative float-right d-inline-block"
                            >
                              Dashboard
                            </label>
                          </li>
                          <li
                            className="d-flex justify-content-start align-items-center"
                            style={{ width: 100 }}
                          >
                            <input
                              className="m-0 p-0 position-relative float-left"
                              type="checkbox"
                              onChange={(e) => {
                                handlePrivileges(e);
                              }}
                              name="products"
                              id="products"
                            />
                            <label
                              htmlFor="products"
                              className="m-0 pl-3 position-relative float-right d-inline-block"
                            >
                              Products
                            </label>
                          </li>
                          <li
                            className="d-flex justify-content-start align-items-center"
                            style={{ width: 100 }}
                          >
                            <input
                              className="m-0 p-0 position-relative float-left"
                              type="checkbox"
                              onChange={(e) => {
                                handlePrivileges(e);
                              }}
                              name="blog"
                              id="blog"
                            />
                            <label
                              htmlFor="blog"
                              className="m-0 pl-3 position-relative float-right d-inline-block"
                            >
                              Blog
                            </label>
                          </li>{" "}
                          <li
                            className="d-flex justify-content-start align-items-center"
                            style={{ width: 100 }}
                          >
                            <input
                              className="m-0 p-0 position-relative float-left"
                              type="checkbox"
                              onChange={(e) => {
                                handlePrivileges(e);
                              }}
                              name="appointments"
                              id="appointments"
                            />
                            <label
                              htmlFor="appointments"
                              className="m-0 pl-3 position-relative float-right d-inline-block"
                            >
                              Appointments
                            </label>
                          </li>{" "}
                          <li
                            className="d-flex justify-content-start align-items-center"
                            style={{ width: 100 }}
                          >
                            <input
                              className="m-0 p-0 position-relative float-left"
                              type="checkbox"
                              onChange={(e) => {
                                handlePrivileges(e);
                              }}
                              name="chat"
                              id="chat"
                            />
                            <label
                              htmlFor="chat"
                              className="m-0 pl-3 position-relative float-right d-inline-block"
                            >
                              Chat
                            </label>
                          </li>{" "}
                          <li
                            className="d-flex justify-content-start align-items-center"
                            style={{ width: 100 }}
                          >
                            <input
                              className="m-0 p-0 position-relative float-left"
                              type="checkbox"
                              onChange={(e) => {
                                handlePrivileges(e);
                              }}
                              name="orders"
                              id="orders"
                            />
                            <label
                              htmlFor="orders"
                              className="m-0 pl-3 position-relative float-right d-inline-block"
                            >
                              Orders
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button
                    className="btn bg-green-dark text-light float-right"
                    onClick={() => {
                      addSubAdmin();
                    }}
                  >
                    Add SubAdmin
                  </button>
                  <div className="w-100 py-3"></div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingTwo">
                <button
                  class="accordion-button w-100 border-0 bg-lightgrey collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Email Recipient
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <h2 class="accordion-header" id="headingThree">
                <button
                  class="accordion-button w-100 border-0 bg-lightgrey collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Bank Account
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
