import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user, saveUser } = useContext(UserContext);

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    // Just a frontend demo, backend update not yet implemented
    if (!email.trim()) {
      setMessage("Email cannot be empty");
      return;
    }

    // Simulate successful update
    saveUser({ ...user, email });
    setPassword(""); // clear password input
    setMessage("Profile updated successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d1b2a",
        color: "white",
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Current Details */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "2rem",
          borderRadius: "10px",
          marginBottom: "2rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Your Details</h2>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Role:</strong> {user?.isAdmin ? "Admin" : "User"}
        </p>
      </div>

      {/* Update Form */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Update Profile</h2>
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#1b2b40",
                color: "white",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Password (leave blank to keep current)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#1b2b40",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "0.6rem 1.5rem",
              backgroundColor: "#ff4c4c",
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#ff1c1c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ff4c4c")}
          >
            Update Profile
          </button>

          {message && <p style={{ color: "#00ffb3", marginTop: "0.5rem" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Profile;

