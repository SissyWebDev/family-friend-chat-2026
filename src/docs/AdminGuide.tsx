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
            <li>Copy the <strong>User UID</strong> that appears to the right of the new member email in the Authentication → Users grid.</li>
            <li>Click <strong>Firestore</strong> in the left sidebar.</li>
              <ul>
                <li>In the left column choose <strong>users</strong>.</li>
                <li>In the middle column click <strong>+ Add Document</strong>.</li>
                <li>This opens a pop up: Paste the copied UID into the <strong>Document ID</strong> field, and click the <strong>minus button</strong> to delete the blocks for <strong>field</strong>.</li>
                <li>Click <strong>Save</strong> at bottom right of popup</li>
                <li>Back at the <strong>Firestore</strong> field, click <strong>allowedMembers</strong> in the left column.</li>
                <li>In the middle column, again click <strong>+ Add Document</strong>.</li>
                <li>This then opens that same pop up: Enter the new member's email address into the <strong>Document ID</strong> field, and click the <strong>minus button</strong> to delete the blocks for <strong>field</strong>.</li>
                <li>Click <strong>Save</strong> at bottom right of popup</li>      
              </ul>
            <li>Send the new member a welcome email containing:
              <ul>
                <li>The link: <strong>familyfriend-chat.com</strong></li>
                <li>Their email address</li>
                <li>Their temporary password</li>
                <li>A note that they will be prompted to set up their profile automatically after signing in</li>
                <li>Instructions to set up their profile on the Welcome screen</li>
                <li><strong>Essentials for Your Welcome Letter:</strong>
                  <ul>
                    <li><strong>Signing in:</strong> To avoid errors, please copy and paste both your email address and temporary password directly from this letter into the sign-in fields at <strong>familyfriend-chat.com</strong>, then click <strong>Sign In</strong>. The site will automatically bring you to our Welcome / Profile Setup page.</li>
                    <li><strong>Read first:</strong> Once you arrive at the Welcome page, please take a moment to read the community etiquette guidelines at the top of the page before proceeding.</li>
                    <li><strong>Screen Name:</strong> Choose a unique name that other members will see when you post in chat — this can be your real name or a preferred nickname.</li>
                    <li><strong>Email Address:</strong> Your email address will already be filled in for you — no need to retype it.</li>
                    <li><strong>Temporary Password:</strong> Copy and paste your temporary password from this letter into the field marked <em>Temporary Password</em>.</li>
                    <li><strong>New Password:</strong> Create a unique password of your choice. It must be at least 8 characters long and include at least one number.</li>
                    <li><strong>Confirm Password:</strong> Retype your new password exactly to confirm it.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>The member will complete their profile setup on the Welcome screen and create their own permanent password. They will be brought directly into the chat when finished.</li>
            <li><p><strong>Important:</strong> These step must be completed every time a new member is added. A member whose email is not in the <strong> Firebase Authentication account</strong>, <strong>Firebase database user</strong>, and <strong>allowedMembers</strong> collection will be unable to sign in and will see a message directing them to contact the administrator.</p></li>
          
          </ol>
        </section>

        <section className="guide-section">
          <h3>Removing a Member</h3>
          <ol>
            <li>Go to the <strong>Admin Panel</strong> contained within the app, and find the member in the <strong>Members</strong> section.</li>
            <li>Click the red <strong>Remove</strong> button next to their name.</li>
            <li>Confirm the action in the popup.</li>
            <li>Then go to the <strong>Firebase Console → Authentication</strong> and delete their account (accessed though 3-dot popup to right).</li>
          </ol>
          <p><strong>Note:</strong> Removing a member requires two steps: removing them from the app Admin Panel Members list and deleting their Firebase Auth account. Both steps are required to fully revoke access.</p>
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
          <div className="guide-event-card-example">
            <p className="guide-event-card-title">📌 EVENT: Spring Gala 2026</p>
            <ul>
              <li>Date: Saturday, April 12, 2026</li>
              <li>Location: The Crystal Ballroom, Portland OR</li>
              <li>Tickets: [link to ticketing site]</li>
              <li>Details: [brief event description]</li>
            </ul>
          </div>
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