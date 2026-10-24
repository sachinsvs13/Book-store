import { Link, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
export default function Address() {
  return (
    <div>
      <Outlet />
      <section className="setting-section">
        <div className="setting-link-container">
          <Link to={"/setting"}>My Account</Link>
          <span className="arrow-span">{">"}</span>
          <span className="setting-span">Personal Setting</span>
        </div>
        <div className="setting-profile-container">
          <img src="" alt="" className="setting-profile-img" />
          <h3 className="setting-profile-name"></h3>
        </div>
        <section className="account-setting-section">
          <div className="account-setting-container">
            <h3 className="account-setting-h3">Account Setting</h3>
            <div className="setting-container">
              <div className="personal-setting-container">
                <FaUser />
                <Link>Personal Setting</Link>
              </div>
              <div className="password-container">
                <RiLockPasswordFill />
                <Link>Password</Link>
              </div>
              <div className="address-container">
                <FaLocationDot />
                <Link>Address</Link>
              </div>
            </div>
          </div>
          <div className="personal-info-container">
            <h2 className="personal-info-h2">Personal Information</h2>
            <form className="personal-info-form">
              <div className="input-container">
                <label htmlFor="first-name" className="personal-info-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="personal-info-input"
                />
              </div>
              <div className="input-container">
                <label htmlFor="last-name" className="personal-info-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="personal-info-input"
                />
              </div>
              <div className="input-container">
                <label htmlFor="profile-name" className="personal-info-label">
                  Profile Name
                </label>
                <input
                  type="text"
                  name="profile-name"
                  id="profile-name"
                  required
                  className="personal-info-input"
                />
              </div>
              <div className="input-container">
                <label htmlFor="email" className="personal-info-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="personal-info-input"
                />
              </div>
            </form>
          </div>
        </section>
        <div className="setting-ctn-container">
          <button className="update-btn">Update</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </section>
    </div>
  );
}
