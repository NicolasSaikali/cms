import React, { useState, useEffect } from "react";
import firebase from "firebase";
require("firebase/app");

export default function AppProductPopup(props) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_no: 50,
    images: [],
    category: "",
  });
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    console.log(product);
  }, [product]);

  const handleSelectedImages = (e) => {};

  const getCurrentTimeStamp = () => {
    return new Date();
  };

  const renderselectedImages = () => {
    let posts = [];
    for (let i = 0; i < selectedImages.length; i++)
      posts.push(
        <img
          src={URL.createObjectURL(selectedImages[i])}
          width={100}
          style={{
            flexGrow: "1",
            objectFit: "cover",
            borderRadius: "10px",
            minHeight: "50px",
          }}
          className="mx-1 h-100"
        />
      );
    return posts;
  };

  const saveProduct = () => {
    if (selectedImages.length === 0) {
      return;
    }
    for (let i in product) {
      if (product[i] === "") return;
    }
    let cat = product.category;
    let current_timestamp = "test";
    for (let i in selectedImages) {
      var tmp = firebase
        .storage()
        .ref(`${current_timestamp}/${selectedImages[i].name}`);
      tmp.put(selectedImages[i]);
      let tmpimagebuffer = product.images;
      tmpimagebuffer.push(`${current_timestamp}/${selectedImages[i].name}`);
      setProduct({ ...product, images: tmpimagebuffer });
    }
    firebase.firestore().collection("products").doc().set({
      name: product.name,
      price: product.price,
      images: product.images,
      description: product.description,
      category: product.category,
      stock_no: product.stock_no,
    });
    setProduct({
      name: "",
      description: "",
      price: "",
      images: [],
      category: "",
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
          <input
            type="number"
            className={`form-control mb-3 ${
              submitted && product.stock_no == "" && "required"
            }`}
            placeholder="Stock no"
            onKeyDown={() => {
              setSubmitted(false);
            }}
            onChange={(e) => {
              setProduct({ ...product, stock_no: e.target.value });
            }}
          />
          <label htmlFor="images" className="mb-3 btn bg-green-dark text-light">
            Browse Images
          </label>
          <div className="d-flex justify-content-between mb-3">
            <input
              type="file"
              name="images"
              id="images"
              className="d-none"
              accept="image/*"
              multiple
              onChange={(e) => {
                let tmp = [];
                for (let i = 0; i < e.target.files.length; i++)
                  tmp.push(e.target.files[i]);
                setSelectedImages(tmp);
              }}
            />
            <div className="d-flex flex-wrap">
              {renderselectedImages().map((elt, i) => (
                <div
                  key={`selected_pictures_${i}`}
                  className="d-inline-block m-1 position-relative
                    
                  "
                >
                  <button
                    className="position-absolute delete-image bg-transparent"
                    onClick={() => {
                      let tmp = selectedImages;
                      tmp.splice(i, 1);
                      setSelectedImages(tmp);
                    }}
                  >
                    x
                  </button>
                  {elt}
                </div>
              ))}
            </div>
          </div>
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
      {errors.map((error) => {
        <div className="errorPopup">{error.text}</div>;
      })}
    </div>
  );
}
