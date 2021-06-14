import React, { useState, useEffect } from "react";
import Loader from "./../../components/loader";
import AddBlogPopup from "./add_blog_popup";
import { ToastContainer, toast } from "react-toastify";
import BlogGrid from "./grid";
export default function Blog(props) {
  // const storage = props.firebase.storage();
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const storage = firebase.storage();
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const storage_link = "gs://salocin.appspot.com";
  useEffect(() => {
    firestore.collection("blog_posts").onSnapshot((response) => {
      let tmp = new Array();
      response.forEach((post) => {
        tmp.push(post);
      });
      setPosts(tmp);
      console.log(posts);
    });
  }, []);

  const getImageURL = (ref) => {
    let result = "";
    if (ref === undefined) return;
    storage
      .ref("/" + ref.split("/")[0])
      .child(ref.split("/")[1])
      .getDownloadURL()
      .then((url) => {
        result = url;
      });
    return result;
  };

  return (
    <div className="blog">
      <ToastContainer />
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
        <div className="">
          <div className="d-flex justify-content-between">
            <h3>Blog</h3>

            <button
              className="btn bg-green-dark"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Post
            </button>
          </div>
          <div className="py-2">
            <div className="container">
              <div className="row justify-content-center">
                {posts.map((post) => (
                  <div className="col-lg-4">
                    <BlogGrid
                      data={post}
                      storage={storage}
                      firestore={firestore}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddBlogPopup
        firebase={firebase}
        active={modalOpen}
        setActive={setModalOpen}
      />
    </div>
  );
}
