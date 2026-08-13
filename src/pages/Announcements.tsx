import { useEffect, useState } from "react";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import MainLayout from "../components/layout/MainLayout";
import "./Announcements.css";

interface Announcement {
  id: string;
  text: string;
  createdAt: Date | null;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [etiquetteOpen, setEtiquetteOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      where("archived", "==", false),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnnouncements(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().createdAt?.toDate() ?? null,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <MainLayout>
      <div className="announcements-page">
        <div className="announcements-etiquette">
          <div
            className="etiquette-header"
            onClick={() => setEtiquetteOpen(prev => !prev)}
          >
            <h3 style={{ margin: 0 }}>Remember...</h3>
            <button className="etiquette-toggle">
              {etiquetteOpen ? "...less" : "...more"}
            </button>
          </div>

          {etiquetteOpen && (
            <div className="etiquette-body">
              <p><strong>Using the Chat:</strong> Select a channel from the left sidebar to view and participate in conversations. Use the message bar at the bottom to post.</p>
              <p><strong>Etiquette & Expectations:</strong> Please be respectful and supportive of all members. This is a private, invite-only community.</p>
              <p><strong>Moderator Rules:</strong> The admin may remove posts that violate community standards without notice.</p>
              <p><strong>Content Limitations:</strong> No promotional content, spam, or off-topic posts. Keep conversations relevant to Family Friend events and announcements.</p>
              <p><strong>Archive Protocol:</strong> General Chat is archived monthly. Past Event Chats are moved to the Archive folder after the event date.</p>
              <p><strong>Support:</strong> Basic usage questions can be posted in General Chat. For account help, password resets, or larger questions contact us at <a href="mailto:hello@familyfriendpdx.com">hello@familyfriendpdx.com</a>.</p>
            </div>
          )}
        </div>

        <div className="announcements-divider" />

        <div className="announcements-list">
          <h3>Announcements</h3>
          {announcements.length === 0 && (
            <p className="announcements-empty">No announcements yet.</p>
          )}
          {announcements.map((a) => {
            const isExpanded = expandedIds.has(a.id);
            return (
              <div key={a.id} className="announcement-item">
                <div className="announcement-header">
                  <span className="announcement-date">
                    {a.createdAt?.toLocaleDateString("en-US", {
                      month: "long", day: "numeric", year: "numeric"
                    })}
                  </span>
                  <button
                    className="announcement-toggle"
                    onClick={() => toggleExpanded(a.id)}
                  >
                    {isExpanded ? "...less" : "...more"}
                  </button>
                </div>
                <p className={`announcement-text ${isExpanded ? "expanded" : "collapsed"}`}>
                  {a.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Announcements;