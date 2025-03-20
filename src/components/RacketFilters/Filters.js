"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { mywebsiteurl } from "@/lib/myurl";

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Rating: High to Low",
];

// Hardcoded filter options
const hardcodedFilterOptions = {
  brands: ["Brand A", "Brand B", "Brand C"],
  levels: ["Beginner", "Intermediate", "Advanced"],
  shapes: ["Teardrop", "Round", "Hybrid"],
};

const ClientFilters = () => {
  const [rackets, setRackets] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brand: "",
    level: "",
    shape: "",
    rating: "",
    type: "",
    forWhom: "",
    face: "",
  });

  // Fetch rackets from API (only rackets, since filter options are hardcoded)
  useEffect(() => {
    const fetchRackets = async () => {
      try {
        const { data } = await axios.get("/api/rackets");
        // console.log("data>>>>>>", data);
        setRackets(data.response);
      } catch (error) {
        console.error("Error fetching rackets:", error);
      }
    };

    fetchRackets();
  }, []);

  // Apply filters
  let filteredRackets = rackets.filter((racket) => {
    return (
      (!filters.brand || racket.brand === filters.brand) &&
      (!filters.level || racket.level === filters.level) &&
      (!filters.shape || racket.shape === filters.shape) &&
      (!filters.rating || racket.rating >= parseFloat(filters.rating)) &&
      (!filters.type || racket.type === filters.type) &&
      (!filters.forWhom || racket.forWhom === filters.forWhom) &&
      (!filters.face || racket.face === filters.face)
    );
  });

  // Apply sorting
  if (selectedSort === "Price: Low to High") {
    filteredRackets = [...filteredRackets].sort((a, b) => a.price - b.price);
  } else if (selectedSort === "Price: High to Low") {
    filteredRackets = [...filteredRackets].sort((a, b) => b.price - a.price);
  } else if (selectedSort === "Rating: High to Low") {
    filteredRackets = [...filteredRackets].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="flex flex-col w-full lg:flex-row lg:gap-6">
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="w-full py-2 bg-black text-white  font-semibold"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Sidebar - hidden on mobile unless toggled */}
      <aside
        className={`${
          showFilters ? "block" : "hidden"
        } lg:block w-full lg:w-1/4 border p-4 mb-4 lg:mb-0`}
      >
        <h3 className="text-lg font-bold mb-4">Filters</h3>

        {/* Brand Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Brand</label>
          <select
            className="w-full p-2 border"
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
            value={filters.brand}
          >
            <option value="">All</option>
            {hardcodedFilterOptions.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Level</label>
          <select
            className="w-full p-2 border"
            onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            value={filters.level}
          >
            <option value="">All</option>
            {hardcodedFilterOptions.levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Shape Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Shape</label>
          <select
            className="w-full p-2 border"
            onChange={(e) => setFilters({ ...filters, shape: e.target.value })}
            value={filters.shape}
          >
            <option value="">All</option>
            {hardcodedFilterOptions.shapes.map((shape) => (
              <option key={shape} value={shape}>
                {shape}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Minimum Rating</label>
          <select
            className="w-full p-2 border"
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            value={filters.rating}
          >
            <option value="">All</option>
            <option value="3">3+ Stars</option>
            <option value="3.5">3.5+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>

        {/* Type of Play Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Type of Play</label>
          <select
            className="w-full p-2 border"
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            value={filters.type}
          >
            <option value="">All</option>
            <option value="Power">Power</option>
            <option value="Versatile">Versatile</option>
            <option value="Control">Control</option>
          </select>
        </div>

        {/* For Whom Filter */}
        <div className="mb-4">
          <label className="block font-semibold">For Whom</label>
          <select
            className="w-full p-2 border"
            onChange={(e) =>
              setFilters({ ...filters, forWhom: e.target.value })
            }
            value={filters.forWhom}
          >
            <option value="">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Junior">Junior</option>
          </select>
        </div>

        {/* Racket Face Filter */}
        <div className="mb-4">
          <label className="block font-semibold">Racket Face</label>
          <select
            className="w-full p-2 border"
            onChange={(e) => setFilters({ ...filters, face: e.target.value })}
            value={filters.face}
          >
            <option value="">All</option>
            <option value="Fiberglass">Fiberglass</option>
            <option value="Carbon">Carbon</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4">
        {/* Sorting */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <h2 className="text-2xl font-bold">All Rackets</h2>
          <select
            className="w-full sm:w-auto p-2 border"
            onChange={(e) => setSelectedSort(e.target.value)}
            value={selectedSort}
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Rackets List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRackets.length > 0 ? (
            filteredRackets.map((racket, index) => (
              <div
                key={index}
                className="bg-white shadow-md  p-4 text-center transition-transform transform hover:scale-105"
              >
                <img
                  src={`${mywebsiteurl}${racket.filePath}`}
                  alt={racket.title}
                  className="w-full h-32 object-contain mx-auto"
                />
                <h3 className="text-lg font-semibold mt-3">{racket.title}</h3>
                <p className="text-gray-600 font-bold">${racket.price}</p>
                <div className="flex justify-center items-center mt-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 text-xl ${
                        i < Math.round(racket.ratings)
                          ? "opacity-100"
                          : "opacity-30"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Performance Metrics */}
                <div className="mt-4 bg-gray-50 p-2 ">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-500">PWR</span>
                      <span className="text-gray-700">Power</span>
                      <span className="ml-auto font-bold text-blue-600">
                        {racket.power || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-500">CTL</span>
                      <span className="text-gray-700">Control</span>
                      <span className="ml-auto font-bold text-blue-600">
                        {racket.control || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-500">RBD</span>
                      <span className="text-gray-700">Rebound</span>
                      <span className="ml-auto font-bold text-blue-600">
                        {racket.rebound || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-gray-500">MAN</span>
                      <span className="text-gray-700">Maneuv.</span>
                      <span className="ml-auto font-bold text-blue-600">
                        {racket.maneuverability || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 col-span-2">
                      <span className="font-bold text-gray-500">SS</span>
                      <span className="text-gray-700">Sweet spot</span>
                      <span className="ml-auto font-bold text-blue-600">
                        {racket.sweetSpot || "-"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="grid grid-cols-2 gap-1 text-xs mt-3">
                  <p className="text-gray-500">Year: {racket.Year}</p>
                  <p className="text-gray-500">Level: {racket.Level}</p>
                  <p className="text-gray-500">Shape: {racket.Shape}</p>
                  <p className="text-gray-500">Type: {racket.Type}</p>
                  <p className="text-gray-500">For: {racket.forGender}</p>
                  <p className="text-gray-500">Face: {racket.Face}</p>
                </div>
                <Link
                  href={`/collections/rackets/${racket.slug}`}
                  className="w-full block py-2 bg-black text-white font-semibold hover:bg-gray-800 transition-colors my-2 mt-4"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-lg text-gray-500">
                No rackets match your filters.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    brand: "",
                    level: "",
                    shape: "",
                    rating: "",
                    type: "",
                    forWhom: "",
                    face: "",
                  })
                }
                className="mt-4 px-4 py-2 bg-black text-white"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientFilters;
