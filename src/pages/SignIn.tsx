import { useState } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo_1_FamilyFriend_Multi_01.png";
import "./SignIn.css";

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
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

        <div className="signin-divider">or</div>

        <button onClick={handleGoogleSignIn} className="signin-btn google">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;