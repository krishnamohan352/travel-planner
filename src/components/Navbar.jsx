import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to="/">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Smart Travel Planner
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/create-trip"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
          >
            Create Trip
          </Link>

          <Link
            to="/my-trips"
            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white"
          >
            My Trips
          </Link>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-800" />
            )}
          </button>

          {isLoggedIn && user?.name && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {user.name}
              </span>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={logout}
              className="hidden md:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="hidden md:block">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
          >
            {menuOpen ? (
              <X size={22} className="text-gray-800 dark:text-white" />
            ) : (
              <Menu size={22} className="text-gray-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 px-4 py-4 space-y-4">

          <Link
            to="/create-trip"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-200"
          >
            Create Trip
          </Link>

          <Link
            to="/my-trips"
            onClick={() => setMenuOpen(false)}
            className="block text-gray-700 dark:text-gray-200"
          >
            My Trips
          </Link>

          {isLoggedIn && user?.name && (
            <div className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-800 dark:text-gray-200">
                {user.name}
              </span>
            </div>
          )}

          {isLoggedIn ? (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}