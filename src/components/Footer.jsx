
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-gray-100 dark:bg-[#111] text-gray-700 dark:text-gray-300 pt-12 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      <div id="footer" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">Nfts MarketPlace</h1>
          <p className="mt-3 text-sm max-w-xs">
          A decentralized platform where users can buy, sell, and trade unique digital assets as NFTs.          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="w-6 h-6 hover:scale-110 transition-transform duration-200 hover:drop-shadow-[0_0_4px_#ec4899]"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-6 h-6 hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                alt="Twitter"
                className="w-6 h-6 hover:scale-110 transition-transform duration-200"
              />
            </a>
            <a href="https://in.linkedin.com/in/chandraveer-singh-122a14326">
              <img
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
                alt="LinkedIn"
                className="w-6 h-6 hover:scale-110 transition-transform duration-200"
              />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 8209412709</li>
            <li>📞 9461596377</li>
            <li>📧 chandraveersingh6377@gmail.com</li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              Bharatpur, Rajasthan, India - 400104
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/features" className="hover:underline">Features</a></li>
            <li><a href="/marketPlace" className="hover:underline">Market</a></li>
            <li><a href="/sellNFT" className="hover:underline">Create</a></li>
            <li><a href="/connect" className="hover:underline">Connect</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>

          </ul>
        </div>

        <div className="max-w-80">
          <h3 className="text-lg font-semibold text-black dark:text-white">STAY UPDATED</h3>
          <p className="mt-3 text-sm">Subscribe to our newsletter for inspiration and offers.</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/NewsLetter")}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-2 rounded hover:opacity-90 transition-all duration-300"
            >
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 mt-4">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-10 h-8" />
            <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="w-10 h-8" />
            <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="w-10 h-8" />
            <img src="https://img.icons8.com/color/48/000000/discover.png" alt="Discover" className="w-10 h-8" />
          </div>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-600 mt-12" />

      <div className="flex flex-col md:flex-row justify-between items-center text-sm py-6 gap-3">
        <p>© {new Date().getFullYear()} Grocery App. All rights reserved.</p>
        <ul className="flex gap-4">
          <li><a href="#" className="hover:underline">Privacy</a></li>
          <li><a href="#" className="hover:underline">Terms</a></li>
          <li><a href="#" className="hover:underline">Sitemap</a></li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Footer;
