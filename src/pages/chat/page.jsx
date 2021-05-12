import React, { useState, useEffect } from "react";

export default function ChatPage(props) {
  const firebase = props.firebase;

  const firestore = firebase.firestore();

  const [chats, setChats] = useState([]);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  useEffect(() => {
    firestore.collection("messages").onSnapshot((response) => {
      let tmp = [];
      response.forEach((elt) => {
        tmp.push(elt);
      });
      setChats(tmp);
      console.log(chats);
    });
  }, []);
  return (
    <div className="chatpage">
      <div className="container-fluid">
        <div className="jumbotron">
          <h1 className="display-4">Chat!</h1>
        </div>
        <div className="chatpage-wrapper"></div>
      </div>
    </div>
  );
}
