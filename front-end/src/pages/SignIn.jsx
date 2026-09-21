import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscErrorCompact } from "react-icons/vsc";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

export default function SignIn() {
  const [error, setError] = useState();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isConfirmPassword, setIsConfirmPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const [passwordSeen, setPasswordSeen] = useState(false);

  const navigate = useNavigate();

  // should do the sign-in after the admin access also have to re-style the sign-in to type of google form
  const passwordPattern = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.password === userData.confirmPassword) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/users/register",
          {
            name: userData.name,
            email: userData.email,
            password: userData.password,
          },
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
        setUserData("");
        setIsConfirmPassword(false);
        navigate("/");
      } catch (error) {
        setError({ ...error });
        setErrorMessage(error?.response?.data?.msg);
        setIsConfirmPassword(false);
      }
    } else {
      setErrorMessage(null);
      setIsConfirmPassword(true);
    }
  };

  useEffect(() => {
    if (error?.status) {
      const timer = setTimeout(() => {
        setError(null);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [error]);
  console.log(error);
  console.log(userData);

  return (
    <main>
      <Outlet />
      <div className="form-container">
        <form className="form-controller" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="input-container">
            {error?.status && userData.name === "" ? (
              <VscErrorCompact color="red" />
            ) : (
              <FaUser />
            )}
            <input
              type="text"
              name="user Name"
              placeholder="User name"
              className={`${error ? "error-input " : "input"}`}
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </div>
          <div className="input-container">
            {error?.status && userData.email === "" ? (
              <VscErrorCompact color="red" />
            ) : (
              <MdEmail />
            )}
            <input
              type="email"
              name="email id"
              placeholder="Email"
              className={`${error ? "error-input " : "input"}`}
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
              type={passwordSeen ? "text" : "password"}
              name="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}"
              className={`${error ? "error-input " : "input"}`}
              title="Must include at least 6 characters, one uppercase, one lowercase, one number, and one special character"
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
          <div className="input-container">
            {error?.status && userData.confirmPassword === "" ? (
              <VscErrorCompact color="red" />
            ) : (
              <RiLockPasswordFill />
            )}

            <input
              type={passwordSeen ? "text" : "password"}
              name="confirm password"
              placeholder="Password confirm"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}"
              className={`${error ? "error-input " : "input"}`}
              title="Must include at least 6 characters, one uppercase, one lowercase, one number, and one special character"
              value={userData.confirmPassword}
              onChange={(e) =>
                setUserData({ ...userData, confirmPassword: e.target.value })
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
            {errorMessage && (
              <span className="error">Please fill the form</span>
            )}
            {isConfirmPassword && (
              <span className="error">Not matching password</span>
            )}
          </div>
          <button className="submit-btn btn" style={{ marginTop: "1rem" }}>
            Sign in
          </button>

          <div className="msg-container">
            <hr></hr>
            <p>Already have an account</p>
            <hr></hr>
          </div>
          <Link to="/login">
            <button className="link-btn btn">Login</button>
          </Link>
        </form>
      </div>
    </main>
  );
}
