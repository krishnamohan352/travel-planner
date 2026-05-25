import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hook/useFetch";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const storedTrips =
      JSON.parse(localStorage.getItem("trips")) || [];
    const selectedTrip = storedTrips.find(
      (item) => item.id === Number(id)
    );
    setTrip(selectedTrip);
  }, [id]);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const weatherUrl = trip
    ? `${import.meta.env.VITE_WEATHER_API_URL}?lat=${trip.lat}&lon=${trip.lon}&appid=${API_KEY}&units=metric`
    : null;

  const { data, loading, error } = useFetch(weatherUrl);

  const weather = data
    ? {
      temp: data?.main?.temp ?? "N/A",
      condition: data?.weather?.[0]?.main ?? "N/A",
      description: data?.weather?.[0]?.description ?? "N/A",
      humidity: data?.main?.humidity ?? "N/A",
      wind: data?.wind?.speed ?? "N/A",
      icon: data?.weather?.[0]?.icon ?? null,
    }
    : null;

  if (!trip) {
    return (
      <div className="p-10 text-xl">
        Loading Trip...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <div className="max-w-6xl mx-auto px-5 py-10">

        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8">

          <h2 className="text-4xl font-bold text-black dark:text-white">
            {trip.city}, {trip.country}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

            <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl p-6">

              <h3 className="text-xl font-semibold text-black dark:text-white">
                Weather
              </h3>

              {loading && (
                <p className="text-gray-500 dark:text-gray-400">Loading weather...</p>
              )}

              {weather && (
                <>
                  <div className="flex items-center justify-between mt-4">

                    <div>
                      <p className="text-3xl font-bold text-black dark:text-white">
                        {weather.temp}°C
                      </p>

                      <p className="text-gray-600 dark:text-gray-400 capitalize">
                        {weather.description}
                      </p>
                    </div>

                    <img
                      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                      alt="weather"
                      className="w-20 h-20"
                    />
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Humidity</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {weather.humidity}%
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Wind</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {weather.wind} km/h
                      </span>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <p className="text-red-500 mt-4">
                  Failed to load weather
                </p>
              )}
            </div>

            <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Budget
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {trip.budget}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-black dark:text-white">
                Travelers
              </h3>

              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {trip.travelers}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}