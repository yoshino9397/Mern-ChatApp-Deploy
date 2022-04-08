import "./register.css";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo" style={{ color: "#0b8eab" }}>BFsocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on BFsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              required
              type="email"
            />
            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              required
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              ref={passwordAgain}
              className="loginInput"
              required
              type="password"
            />
            <button
              className="loginButton"
              type="submit"
              style={{ backgroundColor: "#0b8eab" }}
            >
              Sign Up
            </button>
            <Link
              to={"/login"}
              style={{
                display: "flex",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <button
                className="loginRegisterButton"
                style={{ backgroundColor: "#9db33e" }}
              >
                Log in Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
