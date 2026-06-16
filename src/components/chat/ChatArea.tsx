import { useState, useEffect, useRef, useCallback } from "react";
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


interface Message {
  id: string;
  text: string;
  screenName: string;
  uid: string;
  timestamp: Date | null;
  email?: string;
}

const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const ChatArea = () => {
  const { selectedChannel, selectedChannelData } = useChat();
  const { currentUser } = useAuth();
  const [screenName, setScreenName] = useState("Member");
  const [userEmail, setUserEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [pinExpanded, setPinExpanded] = useState(false);
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
    const fetchUserProfile = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setScreenName(userDoc.data().screenName ?? "Member");
          setUserEmail(userDoc.data().email ?? "");
          setShowEmail(userDoc.data().showEmail ?? false);
        }
      }
    };
    fetchUserProfile();
  }, [currentUser]);

 const handleSend = async () => {
    if (!newMessage.trim() || !selectedChannel) return;

    await addDoc(
      collection(db, "channels", selectedChannel, "messages"),
      {
        text: newMessage.trim(),
        screenName: screenName,
        uid: currentUser?.uid,
        email: showEmail ? userEmail : null,
        timestamp: serverTimestamp(),
      }
    );
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, []);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
    }
  }, [newMessage]);

  const pinnedMessage = selectedChannelData?.type === "active" && messages.length > 0 ? messages[0] : null;
  const chatMessages = pinnedMessage ? messages.slice(1) : messages;
  const pinnedLines = pinnedMessage?.text.split("\n") ?? [];
  const pinnedPreview = pinnedLines[0];
  const pinnedRest = pinnedLines.slice(1).join("\n");

  return (
    <div className="chat-area-container">
      <div className="chat-header">
        {selectedChannelData?.name ?? "Select a channel to get started"}
      </div>

      {pinnedMessage && (
        <div className="chat-pinned-card">
          <div className="chat-pinned-content">
            <span className="chat-pinned-preview">{pinnedPreview}</span>
            {pinExpanded && (
              <span className="chat-pinned-rest">{pinnedRest}</span>
            )}
          </div>
          <button
            className="chat-pinned-toggle"
            onClick={() => setPinExpanded((prev) => !prev)}
          >
            {pinExpanded ? "...less" : "...more"}
          </button>
        </div>
      )}

      <div className="chat-messages">
        {!selectedChannel && (
          <p className="chat-placeholder">
            Select a channel from the left sidebar to view the conversation.
          </p>
        )}
        {chatMessages.reduce<React.ReactNode[]>((acc, msg, index) => {
          const msgDate = msg.timestamp ?? new Date();
          const prevMsg = chatMessages[index - 1];
          const prevDate = prevMsg?.timestamp ?? null;

          const isNewDay =
            !prevDate ||
            msgDate.getFullYear() !== prevDate.getFullYear() ||
            msgDate.getMonth() !== prevDate.getMonth() ||
            msgDate.getDate() !== prevDate.getDate();

          if (isNewDay) {
            acc.push(
              <div key={`divider-${msg.id}`} className="chat-date-divider">
                <span>{getDateLabel(msgDate)}</span>
              </div>
            );
          }

          acc.push(
            <div key={msg.id} className={`chat-message ${msg.uid === currentUser?.uid ? "own" : ""}`}>
              <span className="chat-screen-name">
                {msg.screenName}
                {msg.email ? ` · ${msg.email}` : ""}
              </span>
              <span className="chat-text">{msg.text}</span>
              <span className="chat-timestamp">
                {msg.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          );

          return acc;
        }, [])}
        <div ref={bottomRef} />
      </div>

      {(selectedChannelData?.type === "active" || selectedChannelData?.type === "general") && (
        <div className="chat-input-bar">
          <textarea
            ref={textareaRef}
            placeholder="Write a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            className="chat-input"
            rows={5}
          />
          <button onClick={handleSend} className="chat-send-btn">Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatArea;