import { useState } from 'react'
import Login from "./components/Login";
import Register from "./components/Registration";
import AuthLayout from './components/AuthLayout';
import MainLayout from './components/MainLayout';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-center" toastOptions={{
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      }} />
      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route
            path="*"
            element={
              <div className="h-screen flex items-center justify-center text-red-500 text-xl">
                <NotFound />
              </div>
            }
          />
        </Routes>
      </div>
    </>
  )
}

export default App
