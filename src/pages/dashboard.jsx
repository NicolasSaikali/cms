import React, { useState, useEffect } from "react";

export default function Dashboard() {
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
            <div className="inner">1</div>
          </li>
          <li className="aspect-1-1">
            <div className="inner">2</div>
          </li>
          <li className="aspect-1-1">
            <div className="inner">3</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
