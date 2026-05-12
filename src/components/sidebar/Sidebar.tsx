import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import "./Sidebar.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeChatsOpen, setActiveChatsOpen] = useState(false);
  const { selectedChannel, setSelectedChannel } = useChat();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sidebar-nav">
      {/* General Chat */}
      <div
        className={`sidebar-item ${selectedChannel === "general" ? "active" : ""}`}
        onClick={() => setSelectedChannel("general")}
      >
        General Chat
      </div>

      {/* Active Chats Folder */}
      <div className="sidebar-folder">
        <div
          className="sidebar-item folder-toggle"
          onClick={() => setActiveChatsOpen(!activeChatsOpen)}
        >
          <span className="folder-arrow">{activeChatsOpen ? "▾" : "▸"}</span>
          Active Chats
        </div>
        {activeChatsOpen && (
          <div className="sidebar-subfolders">
            <div
              className={`sidebar-item subfolder ${selectedChannel === "upcoming-events" ? "active" : ""}`}
              onClick={() => setSelectedChannel("upcoming-events")}
            >
              Upcoming Events
            </div>
            <div
              className={`sidebar-item subfolder ${selectedChannel === "special-offers" ? "active" : ""}`}
              onClick={() => setSelectedChannel("special-offers")}
            >
              Special Offers
            </div>
            <div
              className={`sidebar-item subfolder ${selectedChannel === "event-series" ? "active" : ""}`}
              onClick={() => setSelectedChannel("event-series")}
            >
              Event Series
            </div>
          </div>
        )}
      </div>

      {/* Archive Folder */}
      <div
        className={`sidebar-item ${selectedChannel === "archive" ? "active" : ""}`}
        onClick={() => setSelectedChannel("archive")}
      >
        Archive
      </div>
      {isAdmin && (
        <div
          className="sidebar-item admin-link"
          onClick={() => navigate("/admin")}
        >
          ⚙ Admin
        </div>
      )}
    </nav>
  );
};

export default Sidebar;