import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  // Safely extract initials
  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[1][0]).toUpperCase();
  };

  return (
    <header className="w-full px-4 md:px-6 py-3 border-b dark:border-gray-900 bg-white dark:bg-gray-950 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
        Welcome,
        <span className="text-primary">
          {user?.fullName?.split(" ")[0] || "User"}
        </span>
      </h1>

      <div className="flex items-center gap-3">
        
        {/* Placeholder avatar with initials */}
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
          {user?.fullName ? getInitials(user.fullName) : "👤"}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
