import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transfer from "./pages/Transfer";
import Support from "./pages/Support";
import AdminPanel from "./pages/AdminPanel";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/auth/RequireAdmin";
import Transactions from "./pages/Transactions";
import ChangePassword from "./pages/ChangePassword";
import UploadAvatar from "./pages/UploadAvatar";
import EditProfile from "./pages/EditProfile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import AdminInbox from "./pages/AdminInbox";
import AdminChat from "./pages/AdminChat";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./admin/AdminDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected User Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="withdraw" element={<Withdraw />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="support" element={<Support />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="upload-avatar" element={<UploadAvatar />} />

        {/* Optional: admin subroutes inside user dashboard (only if meant to show under same layout) */}
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminPanel />
            </RequireAdmin>
          }
        />
        <Route
          path="admin/support"
          element={
            <RequireAdmin>
              <AdminInbox />
            </RequireAdmin>
          }
        />
        <Route
          path="admin/chat/:userId"
          element={
            <RequireAdmin>
              <AdminChat />
            </RequireAdmin>
          }
        />
      </Route>

      {/* ✅ Top-level Admin Dashboard Route */}
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
