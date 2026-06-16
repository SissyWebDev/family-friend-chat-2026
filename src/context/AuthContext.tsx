import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isAllowed: boolean;
  unauthorized: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAdmin: false,
  isAllowed: false,
  unauthorized: false,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user && user.email) {
      // Check allowlist before granting access
      const allowDoc = await getDoc(doc(db, "allowedMembers", user.email));

      if (!allowDoc.exists()) {
        await signOut(auth);
        setCurrentUser(null);
        setIsAdmin(false);
        setIsAllowed(false);
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      // Email is allowed — now check admin status
      const userDoc = await getDoc(doc(db, "users", user.uid));
      setIsAdmin(userDoc.exists() && userDoc.data()?.isAdmin === true);
      setCurrentUser(user);
      setIsAllowed(true);
      setUnauthorized(false);
    } else {
      setCurrentUser(null);
      setIsAdmin(false);
      setIsAllowed(false);
      setUnauthorized(false);
    }

    setLoading(false);
  });

    return unsubscribe;
  }, []);

  const content = () => {
    if (loading) return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#017f8d" }}>
        <div style={{
          width: "48px",
          height: "48px",
          border: "5px solid rgba(255,255,255,0.3)",
          borderTop: "5px solid #ecb920",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

    if (!isAllowed && currentUser !== null) return (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh", fontSize: "1rem", color: "#2c3e50", gap: "1rem" }}>
        <p>You're not authorized to access this app.</p>
        <p>Please contact the administrator to request access.</p>
      </div>
    );

    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, isAllowed, unauthorized, loading }}>
      {content()}
    </AuthContext.Provider>
  );
};