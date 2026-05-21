import logo from "../../assets/Logo_1_FamilyFriend_Multi_01.png";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";
import Sidebar from "../sidebar/Sidebar";
import ChatArea from "../chat/ChatArea";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const MainLayout = () => {
  return (
    <div className="main-container">
      <header className="app-header">
        <img src={logo} alt="Family Friend" className="app-logo" />
        <button className="signout-btn" onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </header>
      <div className="app-body">
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <main className="chat-area">
          <ChatArea />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;