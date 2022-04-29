import React, { useState, useEffect } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { HOME, COURSE } from "../../constants/pages";


const Sidebar = () => {
  const [userData, setUserData] = useState({});

  return (
    <>
      <div id="Logo_mjb">
        <img
          id="Logo_mjd"
          src="/Logo.png"
          alt=""
        />
        <div id="Online_Asset_Management_mjc">
          <span>Quản lý Giảng Viên, Khóa Học</span>
        </div>
      </div>

      <div id="sizeBar">
        <ul className="SidebarList">
          <li className="row active">
            <NavLink to={HOME} exact activeClassName="active" className="link">
              <div className="title">Home</div>
            </NavLink>
          </li>
          <li className="row">
            <NavLink to={COURSE} activeClassName="active" className="link">
              <div className="title">Quản lý khóa học</div>
            </NavLink>
          </li>
          {/* {userData.type === "Admin" ? (
            <>
              <li className="row">
                <NavLink to="/user" activeClassName="active" className="link">
                  <div className="title">Manage User</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink to="/asset" activeClassName="active" className="link">
                  <div className="title">Manage Asset</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink
                  to="/assignment"
                  activeClassName="active"
                  className="link"
                >
                  <div className="title">Manage Assignment</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink
                  to="/returnasset"
                  activeClassName="active"
                  className="link"
                >
                  <div className="title">Request for Returning</div>
                </NavLink>
              </li>
              <li className="row">
                <NavLink to="/report" activeClassName="active" className="link">
                  <div className="title">Report</div>
                </NavLink>
              </li>
            </>
          ) : null} */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
