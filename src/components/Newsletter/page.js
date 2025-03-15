"use client";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed with:", email);
    setEmail(""); // Clear input after submission
  };

  return (
    <div className="bg-gray-100 py-10 px-5 text-center">
      <h2 className="text-2xl font-bold">Subscribe to Our Newsletter</h2>
      <p className="text-gray-700 mt-2">
        Get updates on new arrivals and exclusive discounts!
      </p>
      <form onSubmit={handleSubscribe} className="mt-4 flex justify-center">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="px-4 py-2 w-80 border border-gray-400  selection:focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-black text-white px-6 py-2 hover:bg-gray-800"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
