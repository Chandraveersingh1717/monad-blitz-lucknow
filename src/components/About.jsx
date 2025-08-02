import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const About = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#f9f9fc] to-[#e0e0f4] overflow-hidden px-4 md:px-12 py-20 flex items-center justify-center">
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-300 opacity-20 blur-[120px] rounded-full z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-pink-300 opacity-30 blur-[150px] rounded-full z-0" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between max-w-7xl w-full gap-16">
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center"
          initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="bg-white rounded-[32px] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-500 max-w-sm w-full">
            <img
              src="https://dinarys.com/storage/images/blogs/RFUNiW5LPRSwBrFg7eUrpaoqQqjFjf01luhMoeAe.png" // Replace with your HD NFT card image
              alt="About"
              className="rounded-[28px] object-cover w-full h-auto"
            />
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              C S NFT Marketplace
            </span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            C S NFTs MarketPlace is a cutting-edge NFT marketplace featuring premium digital assets,
            collectibles, and virtual art. Discover unique creations, rare drops,
            and immersive artwork experiences. Dive into the future of decentralized art!
          </p>

          <motion.button
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToTop}
      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg transition"
    >
      Explore Now
    </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
