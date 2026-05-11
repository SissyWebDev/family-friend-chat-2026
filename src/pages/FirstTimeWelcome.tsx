import { useState } from "react";
import logo from "../assets/Logo_1_FamilyFriend_Multi_01.png";
import "./FirstTimeWelcome.css";

const FirstTimeWelcome = () => {
  const [screenName, setScreenName] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!screenName || !email) {
      alert("Please fill in both your screen name and email.");
      return;
    }
    // Will write to Firestore here in the next step
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="welcome-container">
        <p className="welcome-success">
          You're all set! Redirecting you to the chat...
        </p>
      </div>
    );
  }

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
          <p><strong>Archive Protocol:</strong> General Chat is archived monthly. Past event chats are moved to the Archive folder after the event date.</p>
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
          **Your email is always captured privately for account purposes regardless of this setting.**
          <br />Please find a link to our Privacy Statement on the Home Page
        </p>


      </div>
    </div>
  );
};

export default FirstTimeWelcome;