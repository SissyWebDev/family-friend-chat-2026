import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import SignIn from "./pages/SignIn";
import Announcements from "./pages/Announcements";
import FirstTimeWelcome from "./pages/FirstTimeWelcome";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import Admin from "./pages/Admin";
import AdminGuide from "./docs/AdminGuide";
import PrivacyStatement from "./docs/PrivacyStatement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<FirstTimeWelcome />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <ProtectedRoute>
              <Announcements />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-guide" element={<AdminGuide />} />
        <Route path="/privacy" element={<PrivacyStatement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;