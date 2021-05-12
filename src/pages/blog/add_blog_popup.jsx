import { select } from "@syncfusion/ej2-schedule";
import React, { useState, useEffect } from "react";

export default function AddBlogPopup(props) {
  const [newPost, setNewPost] = useState({
    caption: "",
    media: [],
  });
  const [selectedPictures, setSelectedPictures] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const savenewPost = () => {
    for (let i in newPost) {
      if (newPost[i] === "") return;
    }
    let cat = newPost.category;
    props.firestore
      .collection("newPosts")
      .doc()
      .set({
        ...newPost,
        category: props.firestore.doc("categories/" + cat),
      });
    props.setActive(false);
  };
  const renderSelectedPictures = () => {
    // for (let i = 0; i < newPost.media.length; i++) {
    //   <img
    //     src={URL.createObjectURL(newPost.media[i])}
    //     width={100}
    //     style={{ flexGrow: "1", objectFit: "cover", borderRadius: "10px" }}
    //     className="mx-1 h-100"
    //   />;
    // }
    let posts = [];
    for (let i = 0; i < newPost.media.length; i++)
      posts.push(
        <img
          src={URL.createObjectURL(newPost.media[i])}
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
                setNewPost({ ...newPost, media: tmp });
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
                        console.log(newPost.media);
                        let tmp = newPost.media;
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
              className="btn bg-green-light"
              onClick={() => {
                savenewPost();
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
