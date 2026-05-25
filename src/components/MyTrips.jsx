import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import CountryInfo from "./CountryInfo";
import { deleteTrip } from "../redux/tripSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function MyTrips() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tripSelector = useSelector((state) => state.trip.items);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold text-black dark:text-white mb-10">
          My Trips
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tripSelector.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 text-xl mt-10">
              No trips found
            </div>
          ) : (
            tripSelector.map((trip) => (
              <div
                key={trip.id}
                onClick={() => navigate(`/trip/${trip.id}`)}
                className="relative bg-white dark:bg-zinc-900 rounded-3xl shadow-lg hover:shadow-2xl p-6 cursor-pointer"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteTrip(trip.id));
                    toast.error("Trip removed from list");
                  }}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={24} />
                </button>

                <div className="flex items-center gap-4 mb-5">
                  <CountryInfo code={trip.countryCode} />
                  <div>
                    <h2 className="text-2xl font-bold text-black dark:text-white">
                      {trip.city}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400">
                      {trip.country}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Days
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {trip.days} Days
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Budget
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {trip.budget}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}