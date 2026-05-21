import { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import "./ChatArea.css";

const channelLabels: Record<string, string> = {
  "general": "General Chat",
  "upcoming-events": "Upcoming Events",
  "special-offers": "Special Offers",
  "event-series": "Event Series",
  "archive": "Archive",
};

interface Message {
  id: string;
  text: string;
  screenName: string;
  uid: string;
  timestamp: Date | null;
}

const ChatArea = () => {
  const { selectedChannel, selectedChannelData } = useChat();
  const { currentUser } = useAuth();
  const [screenName, setScreenName] = useState("Member");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useAuth();
console.log("isAdmin:", isAdmin);

  useEffect(() => {
    if (!selectedChannel) return;

    const q = query(
      collection(db, "channels", selectedChannel, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() ?? null,
      })) as Message[];
      setMessages(msgs);
    });

    return unsubscribe;
  }, [selectedChannel]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchScreenName = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setScreenName(userDoc.data().screenName ?? "Member");
        }
      }
    };
    fetchScreenName();
  }, [currentUser]);

 const handleSend = async () => {
    if (!newMessage.trim() || !selectedChannel) return;

    await addDoc(
      collection(db, "channels", selectedChannel, "messages"),
      {
        text: newMessage.trim(),
        screenName: screenName,
        uid: currentUser?.uid,
        timestamp: serverTimestamp(),
      }
    );
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-area-container">
      <div className="chat-header">
        {selectedChannelData?.name ?? "Select a channel to get started"}
      </div>
      <div className="chat-messages">
        {!selectedChannel && (
          <p className="chat-placeholder">
            Select a channel from the left sidebar to view the conversation.
          </p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.uid === currentUser?.uid ? "own" : ""}`}>
            <span className="chat-screen-name">{msg.screenName}</span>
            <span className="chat-text">{msg.text}</span>
            <span className="chat-timestamp">
              {msg.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {(selectedChannelData?.type === "active" || selectedChannelData?.type === "general") && (
        <div className="chat-input-bar">
          <input
            type="text"
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-input"
          />
          <button onClick={handleSend} className="chat-send-btn">Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatArea;