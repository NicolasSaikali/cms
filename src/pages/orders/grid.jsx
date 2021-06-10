import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "./../../components/loader";
import { init } from "emailjs-com";
import emailjs from "emailjs-com";
init("user_zM3jzJZ5HlTtx3za2B9My");
const apiKey = {
  USER_ID: `user_zM3jzJZ5HlTtx3za2B9My`, //userID
  TEMPLATE_ID: `template_0319llp`, //templateID
};
export default function OrderGrid(props) {
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [total, setTotal] = useState(props.object.data().amount);
  const [detailsExpended, setDetailsExpended] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const LoadProducts = () => {
    console.log("fetching");
    let tmp = [];
    setProductsLoaded(false);
    props.object.data().items.forEach((item) => {
      firestore
        .collection("products")
        .doc(item.id)
        .get()
        .then((response) => {
          tmp.push({
            obj: response,
            count: item.count,
          });
          if (tmp.length === props.object.data().items.length)
            setProductsLoaded(true);
        });
    });
    setOrderProducts(tmp);
  };
  const markDelivered = (id) => {
    firestore.collection("orders").doc(props.object.id).set(
      {
        status: "delivered",
      },
      { merge: true }
    );
    emailjs
      .sendForm(
        "service_em2mvfc",
        apiKey.TEMPLATE_ID,
        document.getElementById(id),
        apiKey.USER_ID
      )
      .then(
        (result) => {
          alert("Message Sent, We will get back to you shortly", result.text);
          setAcceptLoading(false);
        },
        (error) => {
          alert("An error occurred, Please try again", error.text);
          setAcceptLoading(false);
        }
      );
  };
  const acceptOrder = (id) => {
    setAcceptLoading(true);
    firestore.collection("orders").doc(props.object.id).set(
      {
        status: "ongoing",
      },
      { merge: true }
    );
    emailjs
      .sendForm(
        "service_em2mvfc",
        apiKey.TEMPLATE_ID,
        document.getElementById(id),
        apiKey.USER_ID
      )
      .then(
        (result) => {
          alert("Message Sent, We will get back to you shortly", result.text);
          setAcceptLoading(false);
        },
        (error) => {
          alert("An error occurred, Please try again", error.text);
          setAcceptLoading(false);
        }
      );
  };
  return (
    <div className="customer-grid">
      <div className="customer-section container">
        <div
          className="d-flex flex-row align-items-center"
          style={{ flexWrap: 1 }}
        >
          <div className="customer-info">
            <ul>
              <li className="mb-1">
                <b>Name : </b>
                {props.object.data().firstname} {props.object.data().lastname}
              </li>
              <li className="mb-1">
                <b>Email : </b>
                {props.object.data().email}{" "}
                <span className="ml-1">
                  <a href={`mailto:${props.object.data().email}`}>
                    <div className="fa fa-share color-dark"></div>
                  </a>
                </span>
              </li>
              <li className="mb-1">
                <b>Phone : </b>
                {props.object.data().phone}
                <span className="ml-1">
                  <a href={`tel:${props.object.data().phone}`}>
                    <div className="fa fa-share color-dark"></div>
                  </a>
                </span>
              </li>

              <div
                className={`order-details my-1 bg-light ${
                  detailsExpended && "expanded"
                }`}
              >
                <div className="p-2">
                  <li>
                    <b>Order : {props.object.id}</b>
                    {productsLoaded ? (
                      <table cellPadding={5} border="1">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderProducts.map((elt) => (
                            <tr>
                              <td>{elt.obj.data().name}</td>
                              <td>{elt.count}</td>
                              <td>{elt.obj.data().price}</td>
                              <td></td>
                            </tr>
                          ))}
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{total}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <Loader />
                    )}
                  </li>
                </div>
              </div>
              <li>
                <div className="text-underline toggle-animals color-dark d-inline-block">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      if (orderProducts.length == 0) LoadProducts();
                      setDetailsExpended(!detailsExpended);
                    }}
                    className="color-dark"
                  >
                    {detailsExpended ? "Hide details" : "Show details"}
                  </a>
                </div>
                <div className="pl-3 text-underline toggle-animals color-dark d-inline-block">
                  <Link
                    to={{
                      pathname: `/email-form`,
                      state: {
                        email: props.object.data().email,
                        subject: `order #${props.object.id}`,
                      },
                    }}
                    className="color-dark"
                  >
                    Email Customer
                  </Link>
                </div>
                {props.object.data().status === "pending" && (
                  <div className="pl-0 pl-md-3 text-underline toggle-animals color-dark d-inline-block">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        acceptOrder(`form_${props.object.id}`);
                      }}
                      className="color-dark"
                    >
                      {acceptLoading ? <Loader /> : "Accept Order"}
                    </a>
                    <form
                      action=""
                      className="d-none"
                      id={`form_${props.object.id}`}
                    >
                      <input
                        type="hidden"
                        name="subject"
                        value={`order #${props.object.id}`}
                      />
                      <input
                        type="hidden"
                        name="message"
                        value="your order has been accepted"
                      />
                      <input
                        type="hidden"
                        name="email"
                        value={props.object.data().email}
                      />
                    </form>
                  </div>
                )}
                {props.object.data().status === "ongoing" && (
                  <div className="pl-0 pl-md-3 text-underline toggle-animals color-dark d-inline-block">
                    <a
                      className="color-dark"
                      onClick={(e) => {
                        e.preventDefault();
                        markDelivered(`form_deliver_${props.object.id}`);
                      }}
                    >
                      Mark as delivered
                    </a>
                    <form
                      action=""
                      className="d-none"
                      id={`form_deliver_${props.object.id}`}
                    >
                      <input
                        type="hidden"
                        name="subject"
                        value={`order #${props.object.id}`}
                      />
                      <input
                        type="hidden"
                        name="message"
                        value="your order has been marked as delivered, if not please contact the store admin."
                      />
                      <input
                        type="hidden"
                        name="email"
                        value={props.object.data().email}
                      />
                    </form>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
