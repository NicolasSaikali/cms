import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import SingleChat from "./single";

export default function ChatPage(props) {
  const firebase = props.firebase;

  const firestore = firebase.firestore();

  const [chats, setChats] = useState([]);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentChatIndex, setCurrentChatIndex] = useState(-1);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  let LOCATION = useLocation();
  let targetChat = "undefined";
  if (typeof LOCATION.state !== "undefined")
    if (typeof LOCATION.state.id !== "undefined")
      targetChat = LOCATION.state.id;
  useEffect(() => {
    firestore.collection("messages").onSnapshot((response) => {
      let tmp = [];
      response.forEach((elt) => {
        if (currentChat !== null)
          if (currentChat.id === elt.id) setCurrentChat(elt);
        tmp.push(elt);
      });
      setChats(tmp);
    });

    if (typeof targetChat !== "undefined") {
      console.log(targetChat);
      let chat = firestore
        .collection("messages")
        .where("uid", "==", `${targetChat}`)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            setCurrentChat(doc);
          });
        });
    }
  }, []);

  return (
    <div className="chatpage">
      <div className="container-fluid w-md-100">
        <div className="chatpage-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 bg-green-dark column">
                <div className="p-2">
                  {chats.map((chat, i) => (
                    <div
                      className={`chatnav ${
                        currentChat !== null &&
                        currentChat.data().fromEmail ===
                          chat.data().fromEmail &&
                        "active"
                      }`}
                      onClick={() => {
                        setCurrentChat(chat);
                      }}
                    >
                      <div className="d-flex flex-column justify-content-around align-items-start">
                        <div className="text-bold">{chat.data().fromEmail}</div>
                        <div className="text-secondary lastMessage">
                          {chat.data().length == 0
                            ? "No messages yet"
                            : chat.data().data[chat.data().data.length - 1]
                                .outstream === false
                            ? "You : "
                            : ""}
                          {chat.data().length == 0
                            ? ""
                            : chat.data().data[chat.data().data.length - 1]
                                .content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-8 bg-white">
                {currentChat !== null ? (
                  <SingleChat
                    firebase={firebase}
                    object={currentChat}
                    chatID={currentChat.id}
                    data={currentChat.data()}
                  />
                ) : (
                  <div>select chat</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
