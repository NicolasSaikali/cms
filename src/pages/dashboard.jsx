import React, { useState, useEffect } from "react";
import Loader from "./../components/loader";
import CountUp from "react-countup";
import { Bar } from "react-chartjs-2";
export default function Dashboard(props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const firebase = props.firebase;
  const [totalProfit, setTotalProfit] = useState(null);
  const [potentialProfit, setPotentialProfit] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const [deviceVisit, setDeviceVisit] = useState(null);
  const [chartData, setChartData] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  useEffect(() => {
    //totalProfit
    firebase
      .firestore()
      .collection("orders")
      .where("status", "==", "delivered")
      .onSnapshot((snapshot) => {
        setTotalProfit(0);
        snapshot.docs.forEach((doc) => {
          setTotalProfit(totalProfit + doc.data().amount);
        });
      });
    //potential Profit
    firebase
      .firestore()
      .collection("orders")
      .where("status", "!=", "delivered")
      .onSnapshot((snapshot) => {
        setPotentialProfit(0);
        snapshot.docs.forEach((doc) => {
          setPotentialProfit(potentialProfit + doc.data().amount);
        });
      });
    //order chart
    firebase
      .firestore()
      .collection("orders")
      .onSnapshot((snapshot) => {
        setOrderData([]);
        setChartData([]);
        snapshot.docs.forEach((doc) => {
          if (doc.data().status === "delivered") {
            let month = new Date(doc.data().datePlaced * 1000).getMonth();
            let tmp = orderData;
            if (tmp[month] === undefined) tmp[month] = doc.data().amount;
            else tmp[month] += doc.data().amount;
            setOrderData(tmp);
          }
        });

        let tmp = chartData;
        for (let i in orderData) {
          tmp[i] = orderData[i];
        }
        setChartData(tmp);
        console.log(chartData);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Dashboard!</h1>
          <p className="lead">
            Here you can check out:
            <ul>
              <li>Your customers engagement</li>
              <li>Your website audience status</li>
              <li>Your mobile application downloads</li>
            </ul>
          </p>
        </div>
        <ul className="statistics d-grid">
          <li className="aspect-1-1">
            <div className="inner text-light">
              {totalProfit === null ? (
                <Loader white={true} />
              ) : (
                <div>
                  <CountUp end={totalProfit} />{" "}
                  <sub>
                    <small> L.L.</small>
                  </sub>
                </div>
              )}
            </div>
            <h6 className="text-light w-100 text-center">total profit</h6>
          </li>
          <li className="aspect-1-1">
            <div className="inner">
              <Bar
                data={{
                  labels: monthNames,
                  datasets: [
                    {
                      label: "Profits per month",
                      color: "rgba(255,255,255,1)",
                      labels: monthNames,
                      data: chartData,
                      backgroundColor: [
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                        "rgba(255,255,255,0.8)",
                      ],
                      pointBackgroundColor: ["rgba(255,255,255,0.8)"],
                    },
                  ],
                }}
                width={600}
                height={400}
                options={{
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </li>
          <li className="aspect-1-1">
            <div className="inner text-light">
              {potentialProfit === null ? (
                <Loader white={true} />
              ) : (
                <div>
                  <CountUp end={potentialProfit} />{" "}
                  <sub>
                    <small> L.L.</small>
                  </sub>
                </div>
              )}
            </div>
            <h6 className="text-light w-100 text-center">potential profit</h6>
          </li>
        </ul>
      </div>
    </div>
  );
}
