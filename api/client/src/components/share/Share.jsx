import "./share.css";
import { MdLabelImportant, MdRoom, MdPermMedia } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { publicRequest } from "../../config";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await publicRequest.post(
        "https://api.cloudinary.com/v1_1/dz47zx0rk/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
        img: url,
      };
      await publicRequest.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdPermMedia className="shareIcon" style={{ color: "#df7e8a" }} />
              <span className="shareOptionText">Photo or Video</span>
              <input style={{ display: "none" }} type="file" id="file" />
              <input
                id="file"
                className="shareOptionPic"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <MdLabelImportant
                style={{ color: "#2b6684" }}
                className="shareIcon"
              />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <MdRoom style={{ color: "#F8BC43" }} className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
