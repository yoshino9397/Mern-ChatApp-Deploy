import "./login.css";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch, error } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo" style={{ color: "#0b8eab" }}>
            BFsocial
          </h3>
          <span className="loginDesc">
            Connect with friends and the world around you on BFsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick} style={{ height: "330px" }}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="5"
              className="loginInput"
              ref={password}
            />
            {error && <p style={{ color: "red" }}>{error.response.data}</p>}
            <button
              className="loginButton"
              disabled={isFetching}
              style={{ backgroundColor: "#0b8eab" }}
            >
              {isFetching ? (
                <CircularProgress color="action" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot" style={{ color: "#2f4c58" }}>
              Forgot Password?
            </span>
            <Link
              to={"/register"}
              style={{
                display: "flex",
                textDecoration: "none",
                justifyContent: "center",
              }}
            >
              <button
                className="loginRegisterButton"
                to={"/register"}
                style={{ backgroundColor: "#9db33e" }}
              >
                {isFetching ? (
                  <CircularProgress color="action" size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
