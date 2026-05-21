import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        setHasProfile(userDoc.exists());
      }
      setProfileChecked(true);
    };

    if (!loading) {
      checkProfile();
    }
  }, [currentUser, loading]);

  if (loading) return null;

  if (!currentUser) return <Navigate to="/signin" replace />;

  if (!profileChecked) return null;

  if (!hasProfile) return <Navigate to="/welcome" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;