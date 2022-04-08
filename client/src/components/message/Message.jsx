import "./message.css";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const Message = ({ message, own }) => {
  const [pic, setPic] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const senderId = message.sender;
    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + senderId);
        setPic(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? user?.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
              : pic?.profilePicture
              ? PF + pic.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
