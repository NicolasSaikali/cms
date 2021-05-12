import React, { useState, useEffect } from "react";
import Loader from "./../../components/loader";
import AddBlogPopup from "./add_blog_popup";
export default function Blog(props) {
  // const storage = props.firebase.storage();
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    firestore.collection("blog").onSnapshot((response) => {
      let tmp = new Array();
      response.forEach((post) => {
        tmp.push(post);
      });
      setPosts(tmp);
      console.log(posts);
    });
  }, []);

  return (
    <div className="blog">
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Blog!</h1>
          <p className="lead">
            Here you can:
            <ul>
              <li>Share your professional life moments</li>
              <li>
                Get your customers to know the way you work and meet your
                animals
              </li>
            </ul>
          </p>
        </div>
        <div className="blog-wrapper">
          <div className="d-flex justify-content-between">
            <h3>Blog</h3>
            <button
              className="btn bg-green-light"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Post
            </button>
          </div>
        </div>
      </div>
      <AddBlogPopup active={modalOpen} setActive={setModalOpen} />
    </div>
  );
}
