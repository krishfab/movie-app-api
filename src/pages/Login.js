import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { saveUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     const url = isRegister
       ? `${process.env.REACT_APP_API_URL}/users/register`
       : `${process.env.REACT_APP_API_URL}/users/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      console.log("Login response:", data);

     if (data.access && data.user) {
   localStorage.setItem("accessToken", data.access);
   saveUser({ 
       email: data.user.email, 
       token: data.access, 
       isAdmin: data.user.isAdmin 
   });
} else {
        saveUser({ email });
      }

      alert(isRegister ? "Registered successfully!" : "Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.error(err.message);
      alert("Authentication failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <p onClick={() => setIsRegister(!isRegister)}>
          {isRegister
            ? "Already have an account? Login"
            : "Don’t have an account? Register"}
        </p>
      </form>
    </div>
  );
};

export default Login;

