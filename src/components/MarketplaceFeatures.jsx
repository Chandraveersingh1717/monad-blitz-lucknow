import React from "react";
import { motion } from "framer-motion";
import { FaWallet, FaTags, FaRegHeart, FaCubes, FaRocket, FaUserAlt,FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaWallet className="text-4xl text-indigo-500" />,
    title: "Secure Wallet Integration",
    description: "Connect seamlessly with MetaMask or any Web3 wallet to manage your digital assets safely.",
  },
  {
    icon: <FaTags className="text-4xl text-purple-500" />,
    title: "Buy & Sell Instantly",
    description: "Trade NFTs effortlessly with a few clicks, powered by smart contract automation.",
  },
  {
    icon: <FaShieldAlt className="text-4xl text-gray-600" />,
  title: "On-Chain Provenance",
  description: "Track the full ownership and history of NFTs on the blockchain for full transparency and trust.",
  },
  {
    icon: <FaCubes className="text-4xl text-blue-500" />,
    title: "Mint Your Own NFTs",
    description: "Create and list your digital art or collectibles as NFTs within minutes.",
  },
  {
    icon: <FaRocket className="text-4xl text-red-500" />,
    title: "Lightning-Fast Transactions",
    description: "Experience high-speed NFT transactions with low fees and zero hassle.",
  },
  {
    icon: <FaUserAlt className="text-4xl text-emerald-500" />,
    title: "User-Friendly Dashboard",
    description: "Track purchases, sales, and performance in a beautiful dashboard experience.",
  },
];

const MarketplaceFeatures = () => {
    
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-6 drop-shadow-md">
          Explore Our NFT Marketplace Features
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-14 max-w-3xl mx-auto">
          Discover powerful tools to enhance your NFT journey—from secure wallet connections to fast, user-friendly experiences.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-6 border-t-4 border-indigo-500 dark:border-indigo-400 transform transition-transform hover:shadow-indigo-300 dark:hover:shadow-indigo-800 hover:-translate-y-2"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default MarketplaceFeatures;
