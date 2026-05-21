import { useState } from "react";
import logo from "../assets/Logo_1_FamilyFriend_Multi_01.png";
import "./FirstTimeWelcome.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const FirstTimeWelcome = () => {
  const [screenName, setScreenName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  const handleSubmit = async () => {
    if (!screenName || !email) {
      alert("Please fill in all fields.");
      return;
    }
    const passwordRegex = /^(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters and include at least one number.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      if (currentUser && currentUser.email) {
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          tempPassword
        );
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, password);
      }
      await setDoc(doc(db, "users", currentUser!.uid), {
        screenName,
        email,
        showEmail,
        isAdmin: false,
        createdAt: new Date(),
      });
      navigate("/");
    } catch (err: any) {
      console.error("Full error:", err);
      console.error("Error code:", err.code);
      console.error("Error message:", err.message);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-logo-wrap">
        <img src={logo} alt="Family Friend" className="app-logo" />
      </div>

      <div className="welcome-card">
        <h2>Welcome to Family Friend Chat!</h2>

        <div className="welcome-guidelines">
          <h3>Before You Begin</h3>
          <p><strong>Using the Chat:</strong> Select a channel from the left sidebar to view and participate in conversations. Use the message bar at the bottom to post.</p>
          <p><strong>Etiquette & Expectations:</strong> Please be respectful and supportive of all members. This is a private, invite-only community.</p>
          <p><strong>Moderator Rules:</strong> The admin may remove posts that violate community standards without notice.</p>
          <p><strong>Content Limitations:</strong> No promotional content, spam, or off-topic posts. Keep conversations relevant to Family Friend events and announcements.</p>
          <p><strong>Archive Protocol:</strong> General Chat is archived monthly. Past Event Chats are moved to the Archive folder after the event date.</p>
        </div>

        <div className="welcome-divider" />

        <h3>Set Up Your Profile</h3>

        <input
          type="text"
          placeholder="Choose a Screen Name"
          value={screenName}
          onChange={(e) => setScreenName(e.target.value)}
          className="welcome-input"
        />
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="welcome-input"
        />

        <input
          type="password"
          placeholder="Temporary Password (from your invite email)"
          value={tempPassword}
          onChange={(e) => setTempPassword(e.target.value)}
          className="welcome-input"
        />
        <input
          type="password"
          placeholder="Create a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="welcome-input"
        />

        <p className="welcome-note">
          Password must be at least 8 characters and include at least one number.
        </p>
        
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="welcome-input"
        />

        <label className="welcome-checkbox-label">
          <input
            type="checkbox"
            checked={showEmail}
            onChange={(e) => setShowEmail(e.target.checked)}
          />
          Show my email address alongside my Screen Name in chat
        </label>

        <button onClick={handleSubmit} className="welcome-btn">
          Enter the Chat
        </button>

        <p className="welcome-note">
          Your email is always captured privately for account purposes regardless of this setting.
          <br />Please find a link to our Privacy Statement on the Home Page
        </p>

      </div>
    </div>
  );
};

export default FirstTimeWelcome;