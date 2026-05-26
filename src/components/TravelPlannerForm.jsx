import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTrip } from "../redux/tripSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFetch from "../hook/useFetch";
import useDebounce from "../hook/useDebounce";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { travelSchema } from "../utils/validation";

const budgets = [
  { title: "Cheap", desc: "Stay conscious of costs", icon: "💵" },
  { title: "Moderate", desc: "Keep cost on the average side", icon: "💰" },
  { title: "Luxury", desc: "Dont worry about cost", icon: "💸" },
];

const travelers = [
  { title: "Just Me", icon: "✈️" },
  { title: "A Couple", icon: "🥂" },
  { title: "Family", icon: "🏡" },
];

export default function TravelPlannerForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedCityData, setSelectedCityData] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(travelSchema),

    defaultValues: {
      city: "",
      days: "",
      budget: "",
      travelers: "",
    },
  });

  const selectedBudget = watch("budget");
  const selectedTraveler = watch("travelers");

  const url =
    debouncedSearch.length >= 2
      ? `${import.meta.env.VITE_GEODB_API_URL}?namePrefix=${debouncedSearch}&limit=5`
      : null;

  const { data } = useFetch(url, {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_GEODB_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_GEODB_API_HOST,
    },
  });

  const cities = data?.data || [];

  const handleSelectCity = (city) => {
    const fullCity = `${city.city}, ${city.country}`;
    setSelectedCityData(city);
    setSearch(fullCity);
    setOpen(false);
    setValue("city", fullCity, {
      shouldValidate: true,
    });
  };

  const onSubmit = (formData) => {
    const tripData = {
      id: Date.now(),
      city: selectedCityData.city,
      country: selectedCityData.country,
      countryCode: selectedCityData.countryCode,
      lat: selectedCityData.latitude,
      lon: selectedCityData.longitude,
      days: Number(formData.days),
      budget: formData.budget,
      travelers: formData.travelers,
    };
    dispatch(addTrip(tripData));
    toast.success("Trip saved successfully!");
    navigate("/my-trips");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 space-y-10"
      >
        <h1 className="text-4xl font-bold text-black dark:text-white">
          Plan Your Trip
        </h1>

        <div className="relative">
          <label className="block text-2xl font-semibold mb-3 text-black dark:text-white">
            Destination
          </label>

          <input type="hidden" {...register("city")} />

          <div className="relative">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpen(true);
                setValue("city", "");
              }}
              placeholder="Search city..."
              className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 dark:text-white rounded-xl px-4 py-4"
            />
          </div>

          <p className="text-red-500 mt-2">
            {errors.city?.message}
          </p>

          {open && search.length >= 2 && cities.length > 0 && (
            <div className="absolute z-50 w-full mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelectCity(city)}
                  className="w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-zinc-800"
                >
                  {city.city}, {city.country}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-2xl font-semibold text-black dark:text-white">
            Days
          </label>

          <input
            type="number"
            min="1"
            {...register("days")}
            className="w-full mt-3 border rounded-xl px-4 py-4 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 dark:text-white"
            placeholder="Enter number of days"
          />

          <p className="text-red-500 mt-1">
            {errors.days?.message}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-5 text-black dark:text-white">
            Budget
          </h2>

          <p className="text-red-500 mb-3">
            {errors.budget?.message}
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {budgets.map((b) => (
              <button
                key={b.title}
                type="button"
                onClick={() =>
                  setValue("budget", b.title, {
                    shouldValidate: true,
                  })
                }
                className={`p-6 rounded-2xl border ${selectedBudget === b.title
                  ? "border-black dark:border-white shadow-lg"
                  : "border-gray-300 dark:border-zinc-700"
                  } dark:bg-zinc-800`}
              >
                <div className="text-4xl">
                  {b.icon}
                </div>

                <h3 className="text-xl font-bold mt-2 text-black dark:text-white">
                  {b.title}
                </h3>

                <p className="text-gray-500 dark:text-gray-400">
                  {b.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className=" text-2xl font-semibold mb-5 text-black dark:text-white">
            Travelers
          </h2>

          <p className="text-red-500 mb-3">
            {errors.travelers?.message}
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {travelers.map((t) => (
              <button
                key={t.title}
                type="button"
                onClick={() =>
                  setValue("travelers", t.title, {
                    shouldValidate: true,
                  })
                }
                className={`p-6 rounded-2xl border ${selectedTraveler === t.title
                  ? "border-black dark:border-white shadow-lg"
                  : "border-gray-300 dark:border-zinc-700"
                  } dark:bg-zinc-800`}
              >
                <div className="text-4xl">
                  {t.icon}
                </div>

                <h3 className="text-xl font-bold mt-2 text-black dark:text-white">
                  {t.title}
                </h3>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105"
          >
            Save Trip
          </button>
        </div>
      </form>
    </div>
  );
}