import { select } from "@syncfusion/ej2-schedule";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Loader from "./../../components/loader";
require("firebase/app");
export default function AddBlogPopup(props) {
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const storage = firebase.app().storage("gs://salocin.appspot.com");
  const ref = storage.ref();
  const [newPost, setNewPost] = useState({
    caption: "",
    media: [],
  });
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [newPostLoading, setNewPostLoading] = useState(false);
  const getCurrentTimeStamp = () => {
    return new Date();
  };
  const savenewPost = () => {
    for (let i in newPost) {
      if (newPost[i] === "") {
        setNewPostLoading(false);
        return;
      }
    }
    let cat = newPost.category;
    let current_timestamp = getCurrentTimeStamp();
    for (let i in selectedPictures) {
      var tmp = firebase
        .storage()
        .ref(`${current_timestamp}/${selectedPictures[i].name}`);
      newPost.media.push(`${current_timestamp}/${selectedPictures[i].name}`);
      tmp.put(selectedPictures[i]);
    }
    firestore
      .collection("blog_posts")
      .doc()
      .set({
        caption: newPost.caption,
        media: newPost.media,
      })
      .then((ss) => {
        setNewPostLoading(false);
        props.setActive(false);
      });
  };
  const renderSelectedPictures = () => {
    let posts = [];
    for (let i = 0; i < selectedPictures.length; i++)
      posts.push(
        <img
          src={URL.createObjectURL(selectedPictures[i])}
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
  return (
    <div className={`popup-background ${props.active && "active"}`}>
      <div className="bg-light popup-content">
        <div className="popup-header m-0 p-0 text-uppercase d-flex  justify-content-between align-items-center">
          <h6 className="text-secondary m-0">Add newPost</h6>
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
          <textarea
            type="text"
            className={`form-control mb-3 ${
              submitted && newPost.caption == "" && "required"
            }`}
            placeholder="caption"
            onKeyDown={() => {
              setSubmitted(false);
            }}
            onChange={(e) => {
              setNewPost({ ...newPost, caption: e.target.value });
            }}
          ></textarea>
          <div className="my-4">
            <input
              type="file"
              name="media"
              id="media"
              className="d-none"
              multiple
              onChange={(e) => {
                let tmp = [];
                for (let i = 0; i < e.target.files.length; i++)
                  tmp.push(e.target.files[i]);
                setSelectedPictures(tmp);
              }}
            />
            <div className="d-flex justify-content-between align-items-center">
              <label htmlFor="media">
                <i
                  className="i fa fa-picture-o color-dark"
                  style={{ fontSize: "50px" }}
                ></i>
              </label>
              <div className="selected_image d-flexbox justify-content-end text-right">
                {renderSelectedPictures().map((elt, i) => (
                  <div
                    key={`selected_pictures_${i}`}
                    className="d-inline-block m-1 position-relative
                    
                  "
                  >
                    <button
                      className="position-absolute delete-image bg-transparent"
                      onClick={() => {
                        let tmp = selectedPictures;
                        tmp.splice(i, 1);
                        setNewPost({
                          ...newPost,
                          media: tmp,
                        });
                      }}
                    >
                      x
                    </button>
                    {elt}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <button
              className="btn bg-green-dark"
              onClick={() => {
                setNewPostLoading(true);
                savenewPost();
                setSubmitted(true);
              }}
            >
              {newPostLoading ? <Loader white={true} /> : "SAVE"}
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
