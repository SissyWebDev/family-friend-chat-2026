import { useState } from "react";
import logo from "../../assets/Logo_1_FamilyFriend_Multi_01.png";
import "./MainLayout.css";
import Sidebar from "../sidebar/Sidebar";
import ChatArea from "../chat/ChatArea";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-container">
      <header className="app-header">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <img src={logo} alt="Family Friend" className="app-logo" />
        <button className="signout-btn" onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </header>
      <div className="app-body">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>
        <main className="chat-area">
          {children ?? <ChatArea />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;