import React from "react";
import react, { useEffect, useState } from "react";

export default function SingleChat(props) {
  const firebase = props.firebase;
  const firestore = firebase.firestore();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [bottomScroll, setBottomScroll] = useState(false);
  useEffect(() => {
    firestore
      .collection("messages")
      .doc(props.chatID)
      .onSnapshot((r) => {
        setMessages(r.data().data);
      });
  }, [props]);

  const sendMessage = () => {
    if (currentMessage === null || currentMessage === "") return;
    else {
      let tmp = firestore.collection("messages").doc(props.chatID);
      let t = props.data.data;
      t.push({
        outstream: false,
        content: props.object,
      });
      tmp.set(
        {
          data: [
            ...messages,
            { outstream: false, content: currentMessage, time: new Date() },
          ],
        },
        { merge: true }
      );
      setCurrentMessage("");
      let div = document.getElementById("messages-wrapper");
      var scrollHeight = Math.max(div.scrollHeight, div.clientHeight);
      div.scrollTop = scrollHeight - div.clientHeight;
    }
  };
  return (
    <React.Fragment>
      <div className="currentChat position-relative">
        <div className="email">{props.data.fromEmail}</div>
        <div
          className="column"
          style={{ paddingTop: "100px" }}
          id="messages-wrapper"
        >
          {messages.map((message, i) => (
            <div
              className={`d-flex  ${
                message.outstream
                  ? "justify-content-start"
                  : "justify-content-end"
              } `}
            >
              <div className="">
                <div
                  key={`messages_${message.fromEmail}_${i}`}
                  className={`chat-messages  message ${
                    message.outstream ? "from-customer" : "from-admin"
                  } `}
                >
                  <div></div>
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">
                    <small>
                      {new Date(message.time.seconds).getHours()}:
                      {new Date(message.time.seconds).getMinutes()}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="messagebox d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex"></div>
          <input
            type="text"
            name=""
            placeholder="Enter your message..."
            id=""
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
            value={currentMessage}
            className="form-control"
          />
          <button
            className="button btn bg-green-dark"
            onClick={() => {
              sendMessage();
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
