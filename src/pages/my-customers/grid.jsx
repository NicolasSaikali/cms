import React, { useState, useEffect } from "react";
import Loader from "./../../components/loader";
import { Route, Redirect, Link } from "react-router-dom";

export default function CustomerGrid(props) {
  const [animalsExtended, setAnimalsExtended] = useState(false);
  const [animalsLoaded, setAnimalsLoaded] = useState(false);
  return (
    <div className="customer-grid">
      <div className="customer-section">
        <div
          className="d-flex flex-row align-items-center"
          style={{ flexWrap: 1 }}
        >
          <div className="customer-image-wrapper pr-3">
            <img
              src={props.data.profilePicture}
              alt=""
              className="customer-image"
            />
          </div>
          <div className="customer-info">
            <ul>
              <li className="mb-1">
                <b>Name : </b>
                {props.data.name}
              </li>
              <li className="mb-1">
                <b>Email : </b>
                {props.data.email}{" "}
                <span className="ml-1">
                  <a href={`mailto:${props.data.email}`}>
                    <div className="fa fa-share color-dark"></div>
                  </a>
                </span>
              </li>
              <li className="mb-1">
                <b>Age : </b>
                {props.data.age}
              </li>
              <li className="mb-1">
                <b>Phone : </b>
                {props.data.phone}
                <span className="ml-1">
                  <a href={`tel:${props.data.phone}`}>
                    <div className="fa fa-share color-dark"></div>
                  </a>
                </span>
              </li>
              <li className="mb-1">
                <b>Total Orders : </b>
                {props.data.totalOrders}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`animals-wrapper custom-scroll ${
          animalsExtended && "extended"
        }`}
      >
        <div className="p-2">
          {props.data.animals.map((animal) => (
            <div
              className="d-flex flex-row  justify-content-start align-items-center animal-grid"
              style={{ flexWrap: 1 }}
            >
              <div className="animal-image pr-3">
                <img src={animal.image} alt="" />
              </div>
              <div className="animal-info">
                <ul>
                  <li className="mb-1">
                    <b>Name :</b> {animal.name}
                  </li>
                  <li className="mb-1">
                    <b>Category :</b> {animal.category}
                  </li>
                  <li className="mb-1">
                    <b>Breed :</b> {animal.breed}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="text-underline toggle-animals color-dark d-inline-block"
        onClick={() => {
          setAnimalsExtended(!animalsExtended);
        }}
      >
        {animalsExtended ? "Hide Animals" : "Show Animals"}
      </div>
      <div className="d-inline-block float-right ml-1">
        <Link
          to={{
            pathname: `/chat`,
            state: {
              id: props.id,
            },
          }}
          className="color-dark"
        >
          Message Customer
        </Link>
      </div>
    </div>
  );
}
