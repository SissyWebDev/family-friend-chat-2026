import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

interface Channel {
  id: string;
  name: string;
  type: string;
}

const ChannelManager = () => {
  const [activeChannels, setActiveChannels] = useState<Channel[]>([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [archivedChannels, setArchivedChannels] = useState<Channel[]>([]);

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

  const handleAddChannel = async () => {
    if (!newChannelName.trim()) return;

    const id = newChannelName
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    await setDoc(doc(db, "channels", id), {
      name: newChannelName.trim(),
      type: "active",
      createdAt: new Date(),
    });

    setNewChannelName("");
  };

  const handleArchive = async (channel: Channel) => {
    const confirmed = window.confirm(
      `Move "${channel.name}" to Archive?`
    );
    if (!confirmed) return;
    await updateDoc(doc(db, "channels", channel.id), { type: "archived" });
  };

const handleDelete = async (channel: Channel) => {
  const confirmed = window.confirm(
    `Permanently delete "${channel.name}"? This cannot be undone.`
  );
  if (!confirmed) return;

  try {
    // Delete all messages in the subcollection first
    const messagesSnap = await getDocs(
      collection(db, "channels", channel.id, "messages")
    );
    for (const messageDoc of messagesSnap.docs) {
      await deleteDoc(doc(db, "channels", channel.id, "messages", messageDoc.id));
    }
    // Then delete the channel document itself
    await deleteDoc(doc(db, "channels", channel.id));
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

  return (
    <div className="channel-manager">
      <div className="channel-add-row">
        <input
          type="text"
          placeholder="New channel name..."
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
          className="channel-input"
        />
        <button onClick={handleAddChannel} className="channel-add-btn">
          Add Channel
        </button>
      </div>

      <div className="channel-list">
        {activeChannels.length === 0 && (
          <p>No active channels found.</p>
        )}
        {activeChannels.map((channel) => (
          <div key={channel.id} className="channel-row">
            <span className="channel-name">{channel.name}</span>
            <div className="channel-actions">
              <button
                className="channel-btn archive"
                onClick={() => handleArchive(channel)}
              >
                → Archive
              </button>
              <button
                className="channel-btn delete"
                onClick={() => handleDelete(channel)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {archivedChannels.length > 0 && (
        <div className="channel-archive-list">
          <h4 className="channel-archive-title">Archived Channels</h4>
          {archivedChannels.map((channel) => (
            <div key={channel.id} className="channel-row">
              <span className="channel-name">{channel.name}</span>
              <div className="channel-actions">
                <button
                  className="channel-btn delete"
                  onClick={() => handleDelete(channel)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ChannelManager;