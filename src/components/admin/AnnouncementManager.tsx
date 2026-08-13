import { useState, useEffect } from "react";
import {
  collection, addDoc, serverTimestamp,
  query, orderBy, onSnapshot, doc, updateDoc
} from "firebase/firestore";
import { db } from "../../firebase";

interface Announcement {
  id: string;
  text: string;
  archived: boolean;
  createdAt: Date | null;
}

const AnnouncementManager = () => {
  const [text, setText] = useState("");
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [status, setStatus] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAnnouncements(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          archived: doc.data().archived ?? false,
          createdAt: doc.data().createdAt?.toDate() ?? null,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const handlePost = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "announcements"), {
      text: text.trim(),
      archived: false,
      createdAt: serverTimestamp(),
    });
    setText("");
    setStatus("Announcement posted.");
    setTimeout(() => setStatus(""), 3000);
  };

  const toggleArchive = async (id: string, current: boolean) => {
    await updateDoc(doc(db, "announcements", id), { archived: !current });
  };

  const startEdit = (a: Announcement) => {
  setEditingId(a.id);
  setEditText(a.text);
};

const cancelEdit = () => {
  setEditingId(null);
  setEditText("");
};

const saveEdit = async (id: string) => {
  if (!editText.trim()) return;
  await updateDoc(doc(db, "announcements", id), { text: editText.trim() });
  setEditingId(null);
  setEditText("");
};

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a new announcement..."
        rows={3}
        style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", fontFamily: "inherit", fontSize: "1rem" }}
      />
      <button className="admin-action-btn" onClick={handlePost}>Post Announcement</button>
      {status && <p style={{ color: "#017f8d", marginTop: "0.5rem" }}>{status}</p>}

        <div style={{ marginTop: "1.25rem" }}>
        <h4 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>Active</h4>
        {announcements.filter(a => !a.archived).length === 0 && (
            <p style={{ color: "#aaa", fontSize: "0.9rem" }}>No active announcements.</p>
        )}
          {announcements.filter(a => !a.archived).map((a) => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid #eee", gap: "1rem" }}>
              {editingId === a.id ? (
                <div style={{ flex: 1 }}>
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows={3}
                    style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", fontFamily: "inherit", fontSize: "0.95rem" }}
                  />
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="admin-action-btn" onClick={() => saveEdit(a.id)}>Save</button>
                    <button className="admin-action-btn" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "#2c3e50", whiteSpace: "pre-wrap" }}>{a.text}</p>
                    <span style={{ fontSize: "0.75rem", color: "#999" }}>
                      {a.createdAt?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button className="admin-action-btn" onClick={() => startEdit(a)} style={{ whiteSpace: "nowrap" }}>
                      Edit
                    </button>
                    <button className="admin-action-btn" onClick={() => toggleArchive(a.id, a.archived)} style={{ whiteSpace: "nowrap" }}>
                      Archive
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.5rem" }}>
        <button
            className="admin-action-btn"
            onClick={() => setShowArchived(prev => !prev)}
            style={{ marginBottom: "0.75rem" }}
        >
            {showArchived ? "Hide Archived" : "Show Archived"}
        </button>

        {showArchived && (
            <>
            <h4 style={{ color: "#999", marginBottom: "0.5rem" }}>Archived</h4>
            {announcements.filter(a => a.archived).length === 0 && (
                <p style={{ color: "#aaa", fontSize: "0.9rem" }}>No archived announcements.</p>
            )}
            {announcements.filter(a => a.archived).map((a) => (
                <div key={a.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid #eee", gap: "1rem" }}>
                <div>
                    <p style={{ margin: 0, fontSize: "0.95rem", color: "#aaa", textDecoration: "line-through", whiteSpace: "pre-wrap" }}>{a.text}</p>
                    <span style={{ fontSize: "0.75rem", color: "#bbb" }}>
                    {a.createdAt?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    {" · Archived"}
                    </span>
                </div>
                <button
                    className="admin-action-btn"
                    onClick={() => toggleArchive(a.id, a.archived)}
                    style={{ whiteSpace: "nowrap" }}
                >
                    Unarchive
                </button>
                </div>
            ))}
            </>
        )}
        </div>
    </div>
  );
};

export default AnnouncementManager;