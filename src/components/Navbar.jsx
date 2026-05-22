import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Moon, Sun, Heart } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link to='/'>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            K-Shop
          </h1>
        </Link>
        <div className="flex items-center space-x-4">

          <button onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700">
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-800" />
            )}
          </button>

          <div className="relative">

            <Link to='/' ><button className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <Heart size={20} className="text-gray-800 dark:text-white" />
            </button></Link>
          </div>

          {isLoggedIn && user?.name && (
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-800 dark:text-gray-200 font-medium">
                {user.name}
              </span>
            </div>
          )}

          {isLoggedIn ? (

            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-500 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-blue-600">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}