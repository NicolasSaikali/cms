import React, { useState, useEffect } from "react";
require("firebase/app");
export default function ProductGrid(props) {
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [category, setCategory] = useState("UNCATEGORISED");
  const [currentObject, setCurrentObject] = useState(props.object);
  const [imageURL, setImageURL] = useState("");
  useEffect(() => {
    if (props.data.data().images.length !== 0) {
      firebase
        .storage()
        .ref("/" + props.data.data().images[0].split("/")[0])
        .child(props.data.data().images[0].split("/")[1])
        .getDownloadURL()
        .then((url) => {
          setImageURL(url);
        });
    }

    let catID = props.object.category;
    firestore
      .collection("categories")
      .doc(props.object.category)
      .get()
      .then((response) => {
        if (response.empty) setCategory("UNCATEGORISED");
        else setCategory(response.data().name);
      });
  }, []);
  const edit = (id) => {
    firestore.collection("products").doc(id).set({
      name: currentObject.name,
      description: currentObject.description,
      price: currentObject.price,
      category: currentObject.category,
      images: currentObject.images,
    });
  };
  const delete_product = (id) => {
    firestore.collection("products").doc(id).delete();
  };
  const render_product = () => {
    if (!props.is_being_edited)
      return (
        <div
          className={`product-grid card ${
            category !== props.selected_set && props.selected_set !== "All"
              ? "d-none"
              : "d-block"
          }`}
        >
          <div
            className="position-absolute product-content"
            onMouseOut={() => props.cancel_edit()}
          >
            <img src={imageURL} alt="" className="product-image" />
            <div className="product-info">
              <div className="product-name">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column justify-content-center">
                    <div>{props.object.name}</div>
                    <small className="color-dark">{category}</small>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn-control describable"
                      onClick={() => {
                        props.set_product_edit();
                      }}
                    >
                      <div className="area">
                        <i className="fa fa-pencil color-dark"></i>
                      </div>
                      <div className="description">Edit Product</div>
                    </button>
                    <button
                      className="btn-control describable"
                      onClick={() => {
                        delete_product(props.id);
                      }}
                    >
                      <div className="area">
                        <i className="fa fa-trash text-danger"></i>
                      </div>
                      <div className="description bg-danger text-light">
                        Delete Product
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-details">
                <div className="description custom-scroll">
                  {props.object.description}
                </div>
                <div className="price pt-1">{props.object.price} L.L.</div>
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div
          className={`product-grid card edit ${
            category !== props.selected_set && props.selected_set !== "All"
              ? "d-none"
              : "d-block"
          }`}
        >
          <div className="position-absolute product-content">
            <img
              src="https://picsum.photos/300/300"
              alt=""
              className="product-image"
            />
            <div className="product-info">
              <div className="product-name">
                <div className="d-flex justify-content-between align-items-top">
                  <div className="d-flex flex-column justify-content-center pr-1">
                    <input
                      type="text"
                      value={currentObject.name}
                      className="form-control"
                      onChange={(e) => {
                        setCurrentObject({
                          ...currentObject,
                          name: e.target.value,
                        });
                      }}
                    />
                    <small className="color-dark">
                      <select
                        name=""
                        id=""
                        className="form-control p-1 my-1"
                        onChange={(e) => {
                          setCurrentObject({
                            ...currentObject,
                            category: e.target.value,
                          });
                        }}
                      >
                        {props.categories.map((cat) => (
                          <option
                            value={cat.id}
                            onChange={(e) => {
                              setCurrentObject({
                                ...currentObject,
                                category: e.target.value,
                              });
                            }}
                          >
                            {cat.data().name}
                          </option>
                        ))}
                      </select>
                    </small>
                  </div>
                  <div className="d-flex justify-content-center align-items-top">
                    <button
                      type="button"
                      className="btn-control"
                      onClick={() => {
                        setCurrentObject(props.object);
                        props.cancel_edit();
                      }}
                    >
                      <i className="fa fa-close text-danger"></i>
                    </button>
                    <button
                      className="btn-control"
                      onClick={() => {
                        edit(props.id);
                        props.cancel_edit();
                      }}
                    >
                      <i className="fa fa-check text-success"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="product-details">
                <textarea
                  className="description custom-scroll form-control"
                  onChange={(e) => {
                    setCurrentObject({
                      ...currentObject,
                      description: e.target.value,
                    });
                  }}
                  defaultValue={currentObject.description}
                ></textarea>
                <div className="d-flex justify-content-between align-items-center">
                  <input
                    type="number"
                    className="price pt-1 form-control my-1 d-inline-block position-relative float-left w-75"
                    value={currentObject.price}
                    onChange={(e) => {
                      setCurrentObject({
                        ...currentObject,
                        price: e.target.value,
                      });
                    }}
                  />
                  <span className="d-inline-block">L.L.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  };
  return render_product();
}
