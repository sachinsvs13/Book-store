import axios from "axios";
import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { VscErrorCompact } from "react-icons/vsc";
import "../Styles/login.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function LoginIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [passwordSeen, setPasswordSeen] = useState(false);

  const navigate = useNavigate();

  const handleSubmitUserLoginData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/users/login", {
        email: userData.email,
        password: userData.password,
      });
      const token = res.data.token;
      localStorage.setItem("token", token);
      setUserData({ email: "", password: "" });
      navigate("/");
    } catch (error) {
      setError({ ...error });
      setErrorMessage(error?.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (error?.status) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <main>
      <Outlet />
      <div className="form-container">
        <form className="form-controller" onSubmit={handleSubmitUserLoginData}>
          <h1>Login</h1>
          <div className="input-container">
            {error?.status && userData.email === "" ? (
              <VscErrorCompact color="red" />
            ) : (
              <MdEmail />
            )}
            <input
              className={`${error ? "error-input " : "input"}`}
              type="email"
              name="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            {error?.status && userData.password === "" ? (
              <VscErrorCompact color="red" />
            ) : (
              <RiLockPasswordFill />
            )}

            <input
              className={`${error ? "error-input " : "input"}`}
              type={passwordSeen ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            {passwordSeen ? (
              <IoEyeOutline
                className="password-seen"
                onClick={() => setPasswordSeen(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="password-seen"
                onClick={() => setPasswordSeen(true)}
              />
            )}
          </div>
          <div className="error-container">
            {errorMessage && <span className="error">{errorMessage}</span>}
          </div>
          <div className="options-container">
            <div className="signed-in-container">
              <input type="checkbox" />
              <span className="signed-in">Keep me signed In</span>
            </div>
            <div className="forget-password-container">
              <button className="forget-password-btn">
                Forget your password ?
              </button>
            </div>
          </div>
          <button
            className="submit-btn btn"
            style={{ padding: "0.5rem 7.3rem" }}
          >
            Login
          </button>
          <div className="msg-container">
            <hr></hr>
            <p>New on our platform?</p>
            <hr></hr>
          </div>
          <Link to="/sign-in">
            <button
              className="link-btn btn"
              style={{
                padding: "0.5rem 7rem",
              }}
              type="submit"
            >
              Sign in
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
