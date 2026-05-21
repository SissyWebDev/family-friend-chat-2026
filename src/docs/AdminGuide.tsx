import { useNavigate } from "react-router-dom";
import "./AdminGuide.css";

const AdminGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="guide-container">
      <div className="guide-header">
        <h2>Family Friend Chat — Admin Guide</h2>
        <button className="guide-back-btn" onClick={() => navigate("/admin")}>
          ← Back to Admin Panel
        </button>
      </div>

      <div className="guide-body">

        <section className="guide-section">
          <h3>Signing In as Admin</h3>
          <p>Navigate to <strong>familyfriend-chat.com</strong> and sign in with your admin email and password. Once logged in you will see a subtle <strong>⚙ Admin</strong> link at the bottom of the left sidebar. Click it to access the Admin Panel.</p>
        </section>

        <section className="guide-section">
          <h3>Adding a New Member</h3>
          <ol>
            <li>Go to the <strong>Firebase Console</strong> at console.firebase.google.com and sign in with your Google account.</li>
            <li>Select the <strong>family-friend-chat-2026</strong> project.</li>
            <li>Click <strong>Authentication</strong> in the left sidebar.</li>
            <li>Click <strong>Add user</strong> and enter the new member's email address and a temporary password (e.g. <strong>Welcome1234</strong>).</li>
            <li>Send the new member an email containing:
              <ul>
                <li>The link: <strong>familyfriend-chat.com/welcome</strong></li>
                <li>Their temporary password</li>
                <li>Instructions to set up their profile on the Welcome screen</li>
              </ul>
            </li>
            <li>The member will complete their profile setup on the Welcome screen and create their own permanent password.</li>
          </ol>
        </section>

        <section className="guide-section">
          <h3>Authorizing a New Member's Email</h3>
          <p>In addition to creating their account in Firebase Authentication, each new member's email must also be added to the <strong>authorization list</strong> in Firestore. This is a security step that ensures only admin-approved members can access the app — even if someone obtains login credentials.</p>
          <ol>
            <li>Go to the <strong>Firebase Console</strong> at console.firebase.google.com and sign in.</li>
            <li>Select the <strong>family-friend-chat-2026</strong> project.</li>
            <li>Click <strong>Firestore Database</strong> in the left sidebar.</li>
            <li>Open the <strong>allowedMembers</strong> collection. If it is not visible, click <strong>Start collection</strong> and name it exactly <strong>allowedMembers</strong>.</li>
            <li>Click <strong>Add document</strong>.</li>
            <li>In the <strong>Document ID</strong> field, enter the member's email address exactly as it appears in Firebase Authentication (e.g. <strong>jane@example.com</strong>). Do not use an auto-generated ID.</li>
            <li>No fields are required — leave the document empty and click <strong>Save</strong>.</li>
          </ol>
          <p><strong>Important:</strong> This step must be completed every time a new member is added. A member whose email is not in the <strong>allowedMembers</strong> collection will be unable to sign in and will see a message directing them to contact the administrator.</p>
          <p><strong>Removing a member:</strong> When removing a member, delete their document from <strong>allowedMembers</strong> in addition to removing them from Firebase Authentication. Both steps are required to fully revoke access.</p>
        </section>

        <section className="guide-section">
          <h3>Removing a Member</h3>
          <ol>
            <li>Go to the <strong>Admin Panel</strong> and find the member in the <strong>Members</strong> section.</li>
            <li>Click the red <strong>Remove</strong> button next to their name.</li>
            <li>Confirm the action in the popup.</li>
            <li>Then go to the <strong>Firebase Console → Authentication</strong> and delete their account there as well to prevent them from signing in.</li>
          </ol>
          <p><strong>Note:</strong> Removing a member requires three steps: removing them from the Admin Panel Members list, deleting their Firebase Auth account, and deleting their email from the <strong>allowedMembers</strong> collection in Firestore. All three steps are required to fully revoke access.</p>
        </section>

        <section className="guide-section">
          <h3>Adding a New Active Chat Channel</h3>
          <ol>
            <li>Go to the <strong>Admin Panel → Channels</strong> section.</li>
            <li>Type the channel name in the input field (e.g. <strong>Spring Gala 2026</strong>).</li>
            <li>Click <strong>Add Channel</strong>.</li>
            <li>The channel will appear immediately in the sidebar under <strong>Active Chats</strong> for all members.</li>
          </ol>
          <p><strong>Tip:</strong> Each Active Chat channel should have a pinned Event Card at the top. See the Event Card section below.</p>
        </section>

        <section className="guide-section">
          <h3>Event Cards in Active Chat Channels</h3>
          <p>Each Active Chat channel should begin with a pinned Event Card containing key event details. To create one, simply send the first message in the channel using this format:</p>
          <pre>{`📌 EVENT: Spring Gala 2026
📅 Date: Saturday, April 12, 2026
📍 Location: The Crystal Ballroom, Portland OR
🎟 Tickets: [link to ticketing site]
ℹ️ Details: [brief event description]`}</pre>
          <p>This message will serve as the reference card for members viewing the channel.</p>
        </section>

        <section className="guide-section">
          <h3>Archiving an Active Chat Channel</h3>
          <ol>
            <li>Go to the <strong>Admin Panel → Channels</strong> section.</li>
            <li>Find the channel you want to archive.</li>
            <li>Click the orange <strong>→ Archive</strong> button.</li>
            <li>Confirm the action in the popup.</li>
            <li>The channel will move from <strong>Active Chats</strong> to the <strong>Archive</strong> folder in the sidebar automatically.</li>
          </ol>
        </section>

        <section className="guide-section">
          <h3>Archiving General Chat Monthly</h3>
          <ol>
            <li>Go to the <strong>Admin Panel → Archive General Chat</strong> section.</li>
            <li>Type the archive label in the format <strong>Month Year</strong> (e.g. <strong>April 2026</strong>).</li>
            <li>Click <strong>Archive Now</strong>.</li>
            <li>Confirm the action in the popup.</li>
            <li>All current General Chat messages will be moved to the Archive folder under that label and General Chat will be cleared for the new month.</li>
          </ol>
          <p><strong>Recommended schedule:</strong> Archive General Chat on the first day of each month.</p>
        </section>

        <section className="guide-section">
          <h3>Deleting a Channel</h3>
          <ol>
            <li>Go to the <strong>Admin Panel → Channels</strong> section.</li>
            <li>Find the channel you want to delete.</li>
            <li>Click the red <strong>Delete</strong> button.</li>
            <li>Confirm the action in the popup.</li>
          </ol>
          <p><strong>Warning:</strong> Deleting a channel is permanent and cannot be undone. Archive the channel instead if you want to preserve its messages.</p>
        </section>

        <section className="guide-section">
          <h3>Storage Monitoring</h3>
          <p>The <strong>Admin Panel → Storage</strong> section shows an estimate of how much Firestore storage is being used. The free tier limit is <strong>1 GB</strong>.</p>
          <ul>
            <li><strong>Green bar:</strong> Storage is healthy, no action needed.</li>
            <li><strong>Yellow bar:</strong> Approaching limit — consider exporting older archive folders.</li>
            <li><strong>Red bar:</strong> Action required — export and delete older archive folders immediately.</li>
          </ul>
          <p>To free up storage, export old archive channel messages to a local document and then delete the archive channel from Firestore.</p>
        </section>

        <section className="guide-section">
          <h3>Member Forgot Their Password</h3>
          <ol>
            <li>Go to <strong>Firebase Console → Authentication → Users</strong>.</li>
            <li>Find the member's account.</li>
            <li>Click the three-dot menu next to their name.</li>
            <li>Select <strong>Send password reset email</strong>.</li>
            <li>Firebase will send them a reset link automatically.</li>
          </ol>
        </section>

      </div>
    </div>
  );
};

export default AdminGuide;