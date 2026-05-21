import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const WARN_THRESHOLD = 700;
const ALERT_THRESHOLD = 900;
const MAX_MB = 1024;

const estimateSizeInMB = (count: number): number => {
  // Rough estimate: average message ~500 bytes, plus overhead
  const bytes = count * 500;
  return parseFloat((bytes / (1024 * 1024)).toFixed(3));
};

const StorageCounter = () => {
  const [messageCount, setMessageCount] = useState<number | null>(null);
  const [estimatedMB, setEstimatedMB] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const channelsSnap = await getDocs(collection(db, "channels"));
        let totalMessages = 0;

        for (const channelDoc of channelsSnap.docs) {
          const messagesSnap = await getDocs(
            collection(db, "channels", channelDoc.id, "messages")
          );
          totalMessages += messagesSnap.size;
        }

        setMessageCount(totalMessages);
        setEstimatedMB(estimateSizeInMB(totalMessages));
      } catch (err) {
        setError("Unable to fetch storage estimate.");
      }
    };

    fetchCounts();
  }, []);

  const getStatus = () => {
    if (estimatedMB === null) return "loading";
    if (estimatedMB >= ALERT_THRESHOLD) return "alert";
    if (estimatedMB >= WARN_THRESHOLD) return "warning";
    return "good";
  };

  const status = getStatus();
  const percentage = estimatedMB !== null
    ? Math.min((estimatedMB / MAX_MB) * 100, 100)
    : 0;

  return (
    <div className="storage-counter">
      {error && <p className="storage-error">{error}</p>}
      {estimatedMB === null && !error && <p>Loading storage estimate...</p>}
      {estimatedMB !== null && (
        <>
          <div className="storage-bar-wrap">
            <div
              className={`storage-bar ${status}`}
              style={{ width: `${percentage === 0 ? 1 : percentage}%` }}
            />
          </div>
          <p className={`storage-label ${status}`}>
            ~{estimatedMB} MB estimated used of {MAX_MB} MB
            ({messageCount} total messages)
            {status === "warning" && " — Consider archiving older chats."}
            {status === "alert" && " — Action needed: archive or export old chats now."}
          </p>
          <p style={{ fontSize: "0.75rem", color: "#aaa", margin: 0 }}>
            Storage estimate based on message count. Actual usage may vary.
          </p>
        </>
      )}
    </div>
  );
};

export default StorageCounter;