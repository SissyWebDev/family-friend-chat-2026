import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface Member {
  uid: string;
  screenName: string;
  email: string;
  isAdmin?: boolean;
}

const MemberManager = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    const list = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    })) as Member[];
    setMembers(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleRemove = async (uid: string, screenName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${screenName} from the chat?`
    );
    if (!confirmed) return;

    // Fetch the user's email before deleting, so we can remove from allowedMembers
    const userDoc = await getDoc(doc(db, "users", uid));
    const email = userDoc.data()?.email;

    // Delete from users collection
    await deleteDoc(doc(db, "users", uid));

    // Delete from allowedMembers collection if email was found
    if (email) {
      await deleteDoc(doc(db, "allowedMembers", email));
    }

    setMembers((prev) => prev.filter((m) => m.uid !== uid));
  };

  if (loading) return <p>Loading members...</p>;

  return (
    <div className="member-list">
      {members.length === 0 && <p>No members found.</p>}
      {members.map((member) => (
        <div key={member.uid} className="member-row">
          <div className="member-info">
            <span className="member-name">{member.screenName}</span>
            <span className="member-email">{member.email}</span>
          </div>
          {!member.isAdmin && (
            <button
              className="member-remove-btn"
              onClick={() => handleRemove(member.uid, member.screenName)}
            >
              Remove
            </button>
          )}
          {member.isAdmin && (
            <span className="member-admin-badge">Admin</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MemberManager;