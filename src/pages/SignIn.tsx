import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/Logo_1_FamilyFriend_Multi_01.png";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { unauthorized } = useAuth();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-logo-wrap">
        <img src={logo} alt="Family Friend" className="app-logo" />
      </div>
      <div className="signin-card">
        <h2>Welcome Back!</h2>
        <p className="signin-subtitle">Sign in to Family Friend Chat</p>

        {unauthorized && (
          <p className="signin-error signin-unauthorized">
            Your account is not authorized to access this app. Please contact the administrator to request access.
          </p>
        )}
        {error && <p className="signin-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signin-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signin-input"
        />
        <button onClick={handleEmailSignIn} className="signin-btn primary">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;