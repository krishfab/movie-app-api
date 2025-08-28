import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import "../App.css";
import { Button } from 'react-bootstrap';

const NavBar = () => {
  const { user, saveUser, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark glass-navbar px-3">
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        FabMovie
      </Link>

      {/* Hamburger toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul className="navbar-nav flex-row flex-nowrap overflow-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">
              Home
            </Link>
          </li>

          {/* Show Add Movie only for admin users */}
          {user && user.isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin-dashboard">
                Admin Dashboard
              </Link>
            </li>
          )}

          {/* Show Profile link if logged in */}
          {user && (
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          )}

          {/* Logout link */}
          {user && (
            <li className="nav-item">
              <span
                className="nav-link text-danger"
                style={{ cursor: "pointer" }}
                onClick={handleLogout}
              >
                Logout
              </span>
            </li>
          )}

          {/* Login link for guests */}
          {!user && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;


