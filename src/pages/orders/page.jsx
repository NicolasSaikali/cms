import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./../../components/loader";
import OrderGrid from "./grid";
export default function OrderPage(props) {
  const [condition, setCondition] = useState("all");
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [orders, setOrders] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const fetch = () => {
    setOrdersLoading(true);
    let tmp = [];
    if (condition === "all")
      firestore.collection("orders").onSnapshot((response) => {
        setOrders([]);

        response.forEach((order) => {
          tmp.push(order);
        });
        setOrders(tmp);
        setOrdersLoading(false);
      });
    else
      firestore
        .collection("orders")
        .where("status", "==", condition)
        .onSnapshot((response) => {
          response.forEach((order) => {
            tmp.push(order);
          });
          setOrders(tmp);
          setOrdersLoading(false);
        });
  };
  useEffect(() => {
    setOrders([]);
    fetch();
  }, [condition]);
  return (
    <div className="orders">
      <ToastContainer />
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Orders!</h1>
        </div>
        <div className="orders-wrapper">
          <div className="d-flex flex-wrap">
            <button
              class="btn mb-1 bg-green-dark text-light mr-3"
              onClick={() => {
                setCondition("all");
              }}
            >
              All
            </button>
            <button
              class="btn mb-1 bg-green-dark text-light mr-3"
              onClick={() => {
                setCondition("pending");
              }}
            >
              Pending
            </button>
            <button
              class="btn mb-1 bg-green-dark text-light mr-3"
              onClick={() => {
                setCondition("ongoing");
              }}
            >
              Ongoing
            </button>
            <button
              class="btn mb-1 bg-green-dark text-light mr-3"
              onClick={() => {
                setCondition("delivered");
              }}
            >
              Delivered
            </button>
          </div>
          <div className="py-3 w-100"></div>
          <b>
            Showing :
            <div className="text-uppercase d-inline-block mx-1">
              {condition}
            </div>
          </b>
          <div className="py-3 w-100"></div>
          {ordersLoading ? (
            <Loader />
          ) : (
            <div>
              {orders.map((order) => (
                <OrderGrid object={order} firebase={firebase} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
