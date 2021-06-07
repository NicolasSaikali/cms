import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./../../components/loader";
import OrderGrid from "./grid";
export default function OrderPage(props) {
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [orders, setOrders] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  useEffect(() => {
    let tmp = [];
    firestore.collection("orders").onSnapshot((response) => {
      response.forEach((order) => {
        tmp.push(order);
      });
      setOrders(tmp);
      setOrdersLoading(false);
    });
  }, []);
  return (
    <div className="orders">
      <ToastContainer />
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Orders!</h1>
        </div>
        <div className="orders-wrapper">
          {ordersLoading ? (
            <Loader />
          ) : (
            <div>
              {orders.map((order) => (
                <OrderGrid object={order} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
