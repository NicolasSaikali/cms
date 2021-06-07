import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function OrderGrid(props) {
  return (
    <div className="customer-grid">
      <div className="customer-section">
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
              <li>
                <div className="text-underline toggle-animals color-dark d-inline-block">
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
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
