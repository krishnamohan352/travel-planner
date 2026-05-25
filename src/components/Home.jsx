import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="bg-white dark:bg-zinc-950">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-400 sm:text-5xl md:text-6xl">
            Discover Your Perfect Journey
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            Plan unforgettable trips with smart itineraries designed around your travel
            style.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link to="/create-trip">
              <button className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white shadow-lg hover:scale-105 hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200">
                Start Planning
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
