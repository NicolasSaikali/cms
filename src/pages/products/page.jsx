import React, { useEffect, useState } from "react";
import Loader from "./../../components/loader";
import ProductGrid from "./grid";
import AddProductPopup from "./add-product-popup";
export default function ProductPage(props) {
  const firebase = props.firebase;

  const firestore = firebase.firestore();

  /* CATEGORY RELATED */
  const [categories_loaded, set_categories_loaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [new_category_name, set_new_category_name] = useState("");
  const [new_category_loading, set_new_category_loading] = useState(false);
  const [new_category_added, set_new_category_added] = useState(false);

  /* PRODUCT RELATED */
  const [selected_set, set_selected_set] = useState("All");
  const [products_loaded, set_products_loaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [new_product_name, set_new_product_name] = useState("");
  const [new_product_loading, set_new_product_loading] = useState(false);
  const [new_product_added, set_new_product_added] = useState(false);
  const [product_edit, set_product_edit] = useState(null);
  const [product_popup_active, set_product_popup_active] = useState(false);

  useEffect(() => {
    firestore.collection("categories").onSnapshot((result) => {
      set_categories_loaded(true);
      let tmp = new Array();
      result.forEach((elt) => {
        tmp.push(elt);
      });
      setCategories(tmp);
    });

    firestore.collection("products").onSnapshot((result) => {
      set_products_loaded(true);
      let tmp = new Array();
      result.forEach((elt) => {
        tmp.push(elt);
      });
      setProducts(tmp);
    });
  }, []);
  const addCategory = () => {
    set_new_category_loading(true);
    firestore
      .collection("categories")
      .doc()
      .set({
        name: new_category_name,
      })
      .then((response) => {
        set_new_category_loading(false);
      });
  };
  const deleteCategory = (id) => {
    let products = firestore
      .collection("products")
      .where("category", "==", id)
      .get()
      .then((response) => {
        if (response.empty) firestore.collection("categories").doc(id).delete();
        else console.log(response.data());
      });
  };

  const product_is_valid = (elt) => {
    let cat = "";
    elt
      .data()
      .category.get()
      .then((response) => {
        if (response.data().name === selected_set) return "d-block";
        else return "d-none";
      });
  };

  return (
    <div className="product-page">
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Products!</h1>
          <p className="lead">
            Here you can:
            <ul>
              <li>Add, Edit, or Delete a product</li>
              <li>Hide a product</li>
              <li>Add offer on product</li>
            </ul>
          </p>
        </div>
        <div className="w-100 py-1"></div>
        <div className="section">
          <h4 className="color-dark">Add a Category</h4>
          <div className="pt-1 d-flex">
            <input
              placeholder="Category Name"
              type="text"
              name=""
              id="new_category_name"
              className="form-control mr-2"
              onChange={(e) => {
                set_new_category_name(e.target.value);
                set_new_category_added(false);
              }}
              value={new_category_added ? "" : new_category_name}
            />
            <button
              className={`btn bg-green-dark`}
              disabled={new_category_name === ""}
              onClick={() => {
                addCategory();
                set_new_category_added(true);
              }}
            >
              {new_category_loading ? <Loader white={true} /> : "Add"}
            </button>
          </div>
        </div>
        <div className="w-100 py-4"></div>
        <div className="section">
          <h4 className="color-dark">Your Categories:</h4>
          <div className={`w-100 text-center ${categories_loaded && "d-none"}`}>
            <Loader />
          </div>
          <div className="pt-1 d-flexbox">
            <div
              className={`${
                categories.length != 0 && categories_loaded && "d-none"
              }`}
            >
              You have no categories yet, uploaded products will be &nbsp;
              <b>*UNCATEGORISED*</b>
            </div>
            {categories.map((elt, i) => (
              <div
                className="mr-1 my-1 d-inline-block"
                key={`categories_top_${i}`}
              >
                <button className="btn bg-green-dark category-tag">
                  {elt.data().name}
                </button>
                <button
                  className="btn btn-danger category-tag-delete describable"
                  onClick={() => {
                    deleteCategory(elt.id);
                  }}
                >
                  <div className="area">
                    <div className="fa fa-trash-o"></div>
                  </div>
                  <div className="description">Delete Category</div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-100 py-4"></div>
        <div className="section">
          <div className="d-block d-sm-flex justify-content-between align-items-center">
            <h4 className="color-dark">Your Products</h4>
            <div className="d-flex">
              <button
                className="btn bg-green-dark mr-1 text-light"
                onClick={() => {
                  set_product_popup_active(true);
                }}
              >
                Add Product
              </button>
              <input
                type="text"
                name=""
                className="form-control"
                style={{ maxWidth: 300 }}
                placeholder="Search products..."
                id="product_search"
              />
            </div>
          </div>
          <div className="w-100 py-1"></div>
          <div
            className="overflow-auto d-flex custom-scroll py-2"
            style={{ maxWidth: "100%", overflowX: "auto" }}
          >
            <button
              className={`btn bg-green-dark mr-1 ${
                selected_set === "All" && `bg-green-dark text-light`
              }`}
              onClick={() => {
                set_selected_set("All");
              }}
            >
              All
            </button>
            {categories.map((elt, i) => (
              <button
                key={`categories_buttons_${i}`}
                className={`btn bg-green-dark mr-1 ${
                  selected_set === elt.data().name && "bg-green-dark text-light"
                }`}
                onClick={() => {
                  set_selected_set(elt.data().name);
                }}
              >
                {elt.data().name}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <div className="product-grid-wrapper">
              {products.length === 0 && !products_loaded && <Loader />}
              {products.map((elt, i) => (
                <ProductGrid
                  key={`product_grid_${i}`}
                  no={i}
                  id={elt.id}
                  object={elt.data()}
                  selected_set={selected_set}
                  is_being_edited={product_edit === elt.id}
                  set_product_edit={() => {
                    set_product_edit(elt.id);
                  }}
                  cancel_edit={() => {
                    set_product_edit(null);
                  }}
                  categories={categories}
                  firestore={firestore}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddProductPopup
        firestore={firestore}
        active={product_popup_active}
        setActive={set_product_popup_active}
        categories={categories}
      />
    </div>
  );
}
