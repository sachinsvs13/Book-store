import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [error, setError] = useState();

  // should do the sign-in after the admin access also have to re-style the sign-in to type of google form
  const passwordPattern = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="form-container">
        <form className="form-controller" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="input-container">
            <FaUser />

            <input
              type="text"
              name="user Name"
              placeholder="User name"
              className={`${error ? "error-input " : "input"}`}
            />
          </div>
          <div className="input-container">
            <MdEmail />

            <input
              type="email"
              name="email id"
              placeholder="Email"
              className={`${error ? "error-input " : "input"}`}
            />
          </div>
          <div className="input-container">
            <RiLockPasswordFill />
            <input
              type="password"
              name="password"
              placeholder="Password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}"
              className={`${error ? "error-input " : "input"}`}
              title="Must include at least 6 characters, one uppercase, one lowercase, one number, and one special character"
            />
          </div>
          <div className="input-container">
            <RiLockPasswordFill />
            <input
              type="password"
              name="password"
              placeholder="Password confirm"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}"
              className={`${error ? "error-input " : "input"}`}
              title="Must include at least 6 characters, one uppercase, one lowercase, one number, and one special character"
            />
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
    </>
  );
}
