# 🌍 Trip Planner App

A React-based Trip Planner app where users can create, view, and manage travel trips. It stores data in **localStorage** and shows live weather using the **OpenWeather API**.

---

## 🚀 Features

- Create and store trips (localStorage)
- View trip details using dynamic routes
- Live weather data (OpenWeather API)
- Delete trips from list
- Country flag, capital, and population info
- Responsive UI with Tailwind CSS
- Dark mode support

---

## 🛠️ Tech Stack

- React.js
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- OpenWeather API
- LocalStorage

---

## 📦 Installation

### 1. Clone the project

```bash
git clone https://github.com/your-username/trip-planner.git
cd trip-planner

## 2. Install dependencies

```bash
npm install

## 3. Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env

Add value inside the .env file

VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
VITE_GEODB_API_HOST=wft-geo-db.p.rapidapi.com
VITE_GEODB_API_URL=https://wft-geo-db.p.rapidapi.com/v1/geo/cities
VITE_REST_COUNTRIES_API_URL=https://restcountries.com
VITE_GEODB_API_KEY
VITE_WEATHER_API_KEY

## 4. Run the project
```bash
npm run dev