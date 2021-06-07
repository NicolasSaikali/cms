import React, { useEffect, useState } from "react";
import Loader from "../../components/loader";
import CustomerGrid from "./grid";
export default function MyCustomers(props) {
  const [customersLoaded, setCustomersLoaded] = useState(false);

  const [customers, setCustomers] = useState([]);

  const customers_dummy = [
    {
      name: "Nicolas Saikali",
      email: "nicolassaikali99@gmail.com",
      age: 25,
      phone: "+96176756987",
      profilePicture: "https://picsum.photos/300/301",
      totalOrders: 5,
      joined: new Date(),
      animals: [
        {
          name: "Rex",
          image: "https://picsum.photos/299/300",
          category: "Dogs",
          breed: "Berger",
          upcomingAppointments: [],
        },
        {
          name: "Rex",
          image: "https://picsum.photos/299/300",
          category: "Dogs",
          breed: "Berger",
          upcomingAppointments: [],
        },
      ],
    },
    {
      name: "Sophie Saad",
      email: "sophiesaad@gmail.com",
      age: 25,
      phone: "+96181637379",
      profilePicture: "https://picsum.photos/300/301",
      totalOrders: 5,
      joined: new Date(),
      animals: [
        {
          name: "Rex",
          image: "https://picsum.photos/299/300",
          category: "Dogs",
          breed: "Berger",
          upcomingAppointments: [],
        },
      ],
    },
  ];
  useEffect(() => {
    setCustomers(customers_dummy);
  }, []);

  return (
    <div className="my-customers">
      <div className="container-fluid">
        <div className="jumbotron bg-green-dark">
          <h1 className="display-4">My Customers</h1>
          <p className="lead"></p>
        </div>
        <div className="blog-wrapper">
          <div className="d-flex justify-content-between">
            <h3> Customers</h3>
          </div>
          <div className="w-100 py-2"></div>
          {customers.map((customer, i) => (
            <CustomerGrid id={i} data={customer} />
          ))}
        </div>
      </div>
    </div>
  );
}
