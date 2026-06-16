import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";


interface Channel {
  id: string;
  name: string;
  type: string;
}

const Sidebar = ({ onNavigate, selectedPage }: { onNavigate?: () => void; selectedPage?: string }) => {
  const [activeChatsOpen, setActiveChatsOpen] = useState(false);
  const [activeChannels, setActiveChannels] = useState<Channel[]>([]);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [archivedChannels, setArchivedChannels] = useState<Channel[]>([]);
  const { selectedChannel, setSelectedChannel, setSelectedChannelData } = useChat();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "channels"),
      where("type", "==", "active")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const channels = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Channel[];
      setActiveChannels(channels);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "channels"),
      where("type", "in", ["archived", "general-archive"])
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const channels = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Channel[];
      setArchivedChannels(channels);
    });

    return unsubscribe;
  }, []);

  return (
    <nav className="sidebar-nav">
      {/* Announcements */}
      <div
        className={`sidebar-item ${selectedPage === "announcements" ? "active" : ""}`}
        onClick={() => {
          navigate("/announcements");
          onNavigate?.();
        }}
      >
        📣 Announcements
      </div>     
      
      {/* General Chat */}
      <div
        className={`sidebar-item ${selectedChannel === "general" ? "active" : ""}`}
          onClick={() => {
            setSelectedChannel("general");
            setSelectedChannelData({ name: "General Chat", type: "general" });
            navigate("/chat");
            onNavigate?.();
          }}
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
            {activeChannels.map((channel) => (
              <div
                key={channel.id}
                className={`sidebar-item subfolder ${selectedChannel === channel.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedChannel(channel.id);
                  setSelectedChannelData({ name: channel.name, type: channel.type });
                  navigate("/chat");
                  onNavigate?.();
                }}
              >
                {channel.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Archive Folder */}
      <div className="sidebar-folder">
        <div
          className="sidebar-item folder-toggle"
          onClick={() => setArchiveOpen(!archiveOpen)}
        >
          <span className="folder-arrow">{archiveOpen ? "▾" : "▸"}</span>
          Archive
        </div>
        {archiveOpen && (
          <div className="sidebar-subfolders">
            {archivedChannels.length === 0 && (
              <div className="sidebar-item subfolder" style={{ color: "#aaa" }}>
                No archived channels yet
              </div>
            )}
            {archivedChannels.map((channel) => (
              <div
                key={channel.id}
                className={`sidebar-item subfolder ${selectedChannel === channel.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedChannel(channel.id);
                  setSelectedChannelData({ name: channel.name, type: channel.type });
                  navigate("/chat");
                  onNavigate?.();
                }}
              >
                {channel.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Statement */}
      <div
        className="sidebar-item privacy-link"
        onClick={() => {
          navigate("/privacy");
          onNavigate?.();
        }}
      >
        Privacy Statement
      </div>

      {/* Admin Link */}
      {isAdmin && (
        <div
          className="sidebar-item admin-link"
          onClick={() => {
            navigate("/admin");
            onNavigate?.();
          }}
        >
          ⚙ Admin
        </div>
      )}
    </nav>
  );
};

export default Sidebar;