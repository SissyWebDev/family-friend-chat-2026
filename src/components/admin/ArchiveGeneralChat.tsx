import { useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";

const ArchiveGeneralChat = () => {
  const [archiveLabel, setArchiveLabel] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleArchive = async () => {
    if (!archiveLabel.trim()) {
      setStatus("Please enter a label e.g. 'March 2026'");
      return;
    }

    const confirmed = window.confirm(
      `Archive General Chat as "${archiveLabel}"? Current messages will be moved and General Chat will be cleared.`
    );
    if (!confirmed) return;

    setLoading(true);
    setStatus("");

    try {
      // Create archive channel document
      const archiveId = `general-${archiveLabel.trim().toLowerCase().replace(/\s+/g, "-")}`;

      // Fetch all current general messages
      const messagesSnap = await getDocs(
        collection(db, "channels", "general", "messages")
      );

      // Copy each message to the archive channel
      for (const messageDoc of messagesSnap.docs) {
        await addDoc(
          collection(db, "channels", archiveId, "messages"),
          {
            ...messageDoc.data(),
            archivedAt: serverTimestamp(),
          }
        );
        // Delete from general
        await deleteDoc(
          doc(db, "channels", "general", "messages", messageDoc.id)
        );
      }

        // Add archive channel to channels collection
        await setDoc(doc(db, "channels", archiveId), {
        name: `General — ${archiveLabel.trim()}`,
        type: "general-archive",
        createdAt: serverTimestamp(),
        });

      setArchiveLabel("");
      setStatus(`✓ General Chat archived as "${archiveLabel}" successfully.`);
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="archive-general">
      <div className="channel-add-row">
        <input
          type="text"
          placeholder="Archive label e.g. March 2026"
          value={archiveLabel}
          onChange={(e) => setArchiveLabel(e.target.value)}
          className="channel-input"
        />
        <button
          onClick={handleArchive}
          className="channel-add-btn"
          disabled={loading}
        >
          {loading ? "Archiving..." : "Archive Now"}
        </button>
      </div>
      {status && (
        <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: status.startsWith("✓") ? "#2ecc71" : "#e74c3c" }}>
          {status}
        </p>
      )}
    </div>
  );
};

export default ArchiveGeneralChat;