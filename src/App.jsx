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
import MyTrips from './components/MyTrips';
import TripDetails from './components/TripDetails';
import TravelPlannerForm from './components/TravelPlannerForm';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";

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
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>

            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="/create-trip" element={<TravelPlannerForm />} />
                <Route path="/my-trips" element={<MyTrips />} />
                <Route path="/trip/:id" element={<TripDetails />} />
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
        </ErrorBoundary>
      </div>
    </>
  )
}

export default App
