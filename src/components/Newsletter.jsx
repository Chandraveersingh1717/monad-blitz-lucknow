import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error(error.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="my-20 px-6 flex justify-center"
    >
      <div className="bg-white border border-gray-200 shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center transition duration-300">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4 drop-shadow">
          Never Miss a Deal!
        </h1>
        <p className="text-gray-600/90 text-base md:text-lg mb-6">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full md:w-auto flex-1 rounded-xl px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-indigo-400 border border-gray-300 shadow-inner"
            placeholder="Enter your email address"
            required
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className={`px-6 py-3 text-white font-semibold rounded-xl transition-all duration-300 ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-400/50"
            }`}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default NewsLetter;
