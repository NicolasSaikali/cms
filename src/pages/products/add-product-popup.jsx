import React, { useState, useEffect } from "react";
export default function AppProductPopup(props) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    console.log(product);
  }, [product]);

  const saveProduct = () => {
    for (let i in product) {
      if (product[i] === "") return;
    }
    let cat = product.category;
    props.firestore
      .collection("products")
      .doc()
      .set({
        ...product,
        category: props.firestore.doc("categories/" + cat),
      });
    props.setActive(false);
  };
  return (
    <div className={`popup-background ${props.active && "active"}`}>
      <div className="bg-light popup-content">
        <div className="popup-header m-0 p-0 text-uppercase d-flex  justify-content-between align-items-center">
          <h6 className="text-secondary m-0">Add Product</h6>
          <button
            className="bg-transparent outline-none border-0"
            onClick={() => {
              props.setActive(false);
            }}
          >
            x
          </button>
        </div>
        <hr className="m-y1 p-0" />
        <div className="popup-body">
          <input
            type="text"
            className={`form-control mb-3 ${
              submitted && product.name == "" && "required"
            }`}
            placeholder="Name"
            onKeyDown={() => {
              setSubmitted(false);
            }}
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value });
            }}
          />
          <select
            className={`form-control mb-3 ${
              submitted && product.category == "" && "required"
            }`}
            onKeyDown={() => {
              setSubmitted(false);
            }}
            onChange={(e) => {
              setProduct({ ...product, category: e.target.value });
            }}
          >
            <option defaultValue="" selected disabled>
              Category
            </option>
            {props.categories.map((category) => (
              <option value={category.id}>{category.data().name}</option>
            ))}
          </select>
          <input
            type="number"
            className={`form-control mb-3 ${
              submitted && product.price == "" && "required"
            }`}
            placeholder="Price"
            onKeyDown={() => {
              setSubmitted(false);
            }}
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
          />
          <textarea
            type="text"
            className={`form-control mb-3 ${
              submitted && product.description == "" && "required"
            }`}
            placeholder="Description"
            rows="4"
            onKeyDown={() => {
              setSubmitted(false);
            }}
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
          ></textarea>
          <div className="d-flex justify-content-around">
            <button
              className="btn bg-green-dark"
              onClick={() => {
                saveProduct();
                setSubmitted(true);
              }}
            >
              SAVE
            </button>
            <button
              className="btn bg-secondary text-light"
              onClick={() => {
                props.setActive(false);
              }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
