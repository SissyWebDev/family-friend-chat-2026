import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Admin.css";
import MemberManager from "../components/admin/MemberManager";
import ChannelManager from "../components/admin/ChannelManager";
import ArchiveGeneralChat from "../components/admin/ArchiveGeneralChat";
import StorageCounter from "../components/admin/StorageCounter";
import AnnouncementManager from "../components/admin/AnnouncementManager";

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading]);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Panel</h2>
        <button className="admin-back-btn" onClick={() => navigate("/admin-guide")}>
          📋 Admin Guide
        </button>
        <button className="admin-back-btn" onClick={() => navigate("/")}>
          ← Back to Chat
        </button>
      </div>

      <div className="admin-sections">
        <section className="admin-section">
          <h3>Members</h3>
          <p>Add and remove chat members.</p>
          <MemberManager />
        </section>

        <section className="admin-section">
          <h3>Channels</h3>
          <p>Add new Active Chat folders or move to Archive.</p>
          <ChannelManager />
        </section>

        <section className="admin-section">
          <h3>Archive General Chat</h3>
          <p>Move current General Chat messages to a monthly archive folder.</p>
          <ArchiveGeneralChat />
        </section>

        <section className="admin-section">
          <h3>Storage</h3>
          <p>Monitor Firestore usage — archive older chats when approaching limits.</p>
          <StorageCounter />
        </section>

        <section className="admin-section">
          <h3>Announcements</h3>
          <p>Post new announcements to the Announcements page. Archive to hide from members.</p>
          <AnnouncementManager />
        </section>

      </div>
    </div>
  );
};

export default Admin;