import { SiCoinbase } from "react-icons/si";
import { FaBitcoin, FaEthereum, FaFirefoxBrowser } from "react-icons/fa";

import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function ConnectWallet() {
  const wallets = [
    {
      name: "Bitcoin",
      icon: <FaBitcoin className="text-yellow-400 text-3xl" />,
      description: "Connect with your Bitcoin wallet easily and securely.",
    },
    {
      name: "Coinbase",
      icon: <SiCoinbase className="text-blue-500 text-3xl" />,
      description: "Use Coinbase Wallet for fast crypto transactions.",
    },
    {
      name: "Metamask",
      icon: (
        <img
          src="https://files.svgcdn.io/logos/metamask-icon.svg"
          alt="MetaMask"
          className="w-8 h-8"
        />),      description: "Connect to Ethereum & Polygon using MetaMask.",
    },
    {
      name: "Ethereum",
      icon: <FaEthereum className="text-purple-500 text-3xl" />,
      description: "Link your Ethereum wallet for seamless access.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
    <Navbar />

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-20">
      
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🔐 Connect Your Wallet
        </motion.h1>
        <motion.p
          className="text-lg max-w-2xl mx-auto text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Choose your preferred wallet to securely access the NFT marketplace.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {wallets.map((wallet, i) => (
          <motion.div
            key={wallet.name}
            className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition duration-300 border border-white/10"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <div className="flex items-center justify-center mb-4">
              {wallet.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{wallet.name}</h2>
            <p className="text-sm text-gray-300">{wallet.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
