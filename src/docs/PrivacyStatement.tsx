import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo_1_FamilyFriend_Multi_01.png";
import "./PrivacyStatement.css";

const PrivacyStatement = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-container">
      <div className="privacy-logo-wrap">
        <img src={logo} alt="Family Friend" className="app-logo" />
      </div>

      <div className="privacy-body">
        <div className="privacy-header">
          <h2>Privacy Statement</h2>
          <p className="privacy-effective">Effective Date: January 1, 2026</p>
        </div>

        <section className="privacy-section">
          <h3>About This Statement</h3>
          <p>Family Friend LLC ("Family Friend", "we", "our") is committed to protecting the privacy of our members. This Privacy Statement explains what information we collect through the Family Friend Chat platform, how it is used, and how it is protected.</p>
        </section>

        <section className="privacy-section">
          <h3>Information We Collect</h3>
          <p>When you create an account and use Family Friend Chat, we collect the following information:</p>
          <ul>
            <li><strong>Email address</strong> — used for account authentication and administrative communication.</li>
            <li><strong>Screen name</strong> — the display name you choose during account setup, shown alongside your messages in the chat.</li>
            <li><strong>Chat messages</strong> — the content of messages you post in any chat channel.</li>
            <li><strong>Account preferences</strong> — such as whether you have chosen to display your email address alongside your screen name in chat.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h3>How Your Information Is Used</h3>
          <p>Your information is used solely to operate the Family Friend Chat platform. Specifically:</p>
          <ul>
            <li>Your email address is used to authenticate your account and allow the administrator to contact you if needed.</li>
            <li>Your screen name is displayed alongside your messages in the chat.</li>
            <li>Your chat messages are stored to enable real-time and archived conversation within the platform.</li>
          </ul>
          <p>We do not sell, share, or distribute your personal information to any third parties for marketing or commercial purposes.</p>
        </section>

        <section className="privacy-section">
          <h3>Who Can See Your Information</h3>
          <ul>
            <li><strong>Other members</strong> may see your screen name alongside your messages. They will only see your email address if you have opted in to display it.</li>
            <li><strong>The Family Friend administrator</strong> has access to member account information including email addresses for the purposes of managing the platform.</li>
            <li><strong>No other parties</strong> have access to your personal information or chat messages.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h3>How Your Information Is Stored</h3>
          <p>Family Friend Chat is built on Google Firebase, a secure cloud platform operated by Google LLC. Your data is stored in Google's Firestore database and Firebase Authentication service, both of which are protected by Google's enterprise-grade security infrastructure.</p>
          <p>For more information on Google's data practices, please visit <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google's Privacy Policy</a>.</p>
        </section>

        <section className="privacy-section">
          <h3>Data Retention</h3>
          <p>Chat messages in active channels are retained until the administrator manually archives or deletes them. Archived messages are retained in the Archive folder until the administrator removes them. If your account is removed from the platform, your profile information is deleted. Your chat messages may remain in the archive at the administrator's discretion.</p>
        </section>

        <section className="privacy-section">
          <h3>Your Rights</h3>
          <p>You have the right to request access to, correction of, or deletion of your personal information held by Family Friend LLC. To make a request, please contact us at the email address below.</p>
        </section>

        <section className="privacy-section">
          <h3>Contact Us</h3>
          <p>If you have any questions or concerns about this Privacy Statement or how your information is handled, please contact us at:</p>
          <p><strong>Family Friend LLC</strong><br />
          <a href="mailto:hello@familyfriendpdx.com">hello@familyfriendpdx.com</a></p>
        </section>

        <section className="privacy-section">
          <h3>Changes to This Statement</h3>
          <p>Family Friend LLC reserves the right to update this Privacy Statement at any time. Members will be notified of significant changes via the General Chat channel.</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyStatement;