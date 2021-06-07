import ReactReadLessMore from "react-read-less-more";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader";
export default function BlogGrid(props) {
  const [imageURL, setImageURL] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  const [captionExtended, setCaptionExtended] = useState(false);
  useEffect(() => {
    if (props.data.data().media.length === 0) return;
    props.storage
      .ref("/" + props.data.data().media[0].split("/")[0])
      .child(props.data.data().media[0].split("/")[1])
      .getDownloadURL()
      .then((url) => {
        setImageURL(url);
      });
  });
  return (
    <div className="blog-grid">
      <div className="blog-grid-inner">
        <div className="d-flex justify-content-between align-items-top">
          <div className="blog-caption">{props.data.data().caption}</div>
          <div
            className="fa fa-trash text-danger"
            onClick={() => {
              props.firestore
                .collection("blog_posts")
                .doc(props.data.id)
                .delete()
                .then((response) => {
                  toast("Post deleted");
                });
            }}
          ></div>
        </div>
        <div className="blog-image d-flex justify-content-center align-items-center">
          {imageURL === null ? (
            <div style={{ transform: "scale(2)" }} className="py-2">
              <Loader />
            </div>
          ) : (
            <img src={imageURL} />
          )}
        </div>
        <div className="blog-interactions d-flex justify-content-around">
          <div className="d-flex-align-items-baseline">
            <div
              onClick={() => {
                activeComponent !== "likes"
                  ? setActiveComponent("likes")
                  : setActiveComponent("");
              }}
              className="fa fa-heart text-danger"
              style={{ fontSize: "30px" }}
            ></div>
            {props.data.data().likes ? props.data.data().likes.length : "NaN"}
          </div>
          <div className="d-flex-align-items-top">
            <div
              onClick={() => {
                activeComponent !== "comments"
                  ? setActiveComponent("comments")
                  : setActiveComponent("");
              }}
              className="fa fa-comment-o text-secondary"
              style={{ fontSize: "30px" }}
            ></div>
            {props.data.data().comments
              ? props.data.data().comments.length
              : "NaN"}
          </div>
        </div>
        <div
          className={`blog-likes blog-interactions-body custom-scroll mb-1 ${
            activeComponent === "likes" && "active"
          }`}
        >
          <div className="p-2">
            <div className="d-block item">like</div>
            <div className="d-block item">like</div>
            <div className="d-block item">like</div>
            <div className="d-block item">like</div>
          </div>
        </div>
        <div
          className={`blog-comments blog-interactions-body custom-scroll ${
            activeComponent === "comments" && "active"
          }`}
        >
          <div className="p-2">
            <div className="d-block item">comment</div>
            <div className="d-block item">comment</div>
            <div className="d-block item">comment</div>
            <div className="d-block item">comment</div>
          </div>
        </div>
      </div>
    </div>
  );
}
