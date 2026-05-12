import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Admin.css";
import MemberManager from "../components/admin/MemberManager";

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
          {/* Channel management will go here */}
        </section>

        <section className="admin-section">
          <h3>Storage</h3>
          <p>Monitor Firestore usage.</p>
          {/* Storage counter will go here */}
        </section>
      </div>
    </div>
  );
};

export default Admin;