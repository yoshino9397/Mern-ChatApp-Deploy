import "../topbar/topbar.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SearchIcon from "@mui/icons-material/Search";
import { VscSignOut } from "react-icons/vsc";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { logoutCall } from "../../apiCalls";

const Topbar = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { dispatch } = useContext(AuthContext);

  const handleClick = () => {
    logoutCall({ userCredential: null }, dispatch);
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={linkStyle}>
          <span className="logo">BFsocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link
            to={"/messenger"}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Chat Page</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">4</span>
          </div>
          <div className="topbarIconItem">
            <ChatIcon />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <VscSignOut style={{ fontSize: "25px" }} onClick={handleClick} />
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
