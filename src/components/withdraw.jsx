import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function WithdrawSection() {
  const [ethBalance, setEthBalance] = useState(0);
  const [userAddress, setUserAddress] = useState("");
  const [message, setMessage] = useState("");

  // Load score from localStorage and convert to ETH
  useEffect(() => {
    const score = parseInt(localStorage.getItem("plinko_lifetime_score")) || 0;
    const eth = (score * 0.0002).toFixed(4); // 1000 pts = 0.2 ETH
    setEthBalance(Number(eth));
  }, []);

  const handleWithdraw = () => {
    if (!userAddress || !/^0x[a-fA-F0-9]{40}$/.test(userAddress)) {
      setMessage("❌ Please enter a valid Ethereum address.");
      return;
    }

    if (ethBalance < 0.2) {
      setMessage("❌ Minimum withdraw amount is 0.2 ETH.");
      return;
    }

    setMessage("✅ Withdrawal request submitted. Await confirmation.");
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-r from-gray-950 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">💸 Withdraw ETH</h2>

        <div className="mb-4">
          <p className="text-sm text-gray-400">Available Balance:</p>
          <p className="text-2xl font-semibold text-green-400">{ethBalance} ETH</p>
          <p className="text-xs text-yellow-300">Note: Minimum withdraw is 0.2 ETH</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Your Wallet Address</label>
          <input
            type="text"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            placeholder="0xABC123..."
            className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleWithdraw}
          disabled={ethBalance < 0.2}
          className={`w-full py-2 text-white font-semibold rounded-md transition-all duration-300 ${
            ethBalance >= 0.2
              ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-600 hover:to-green-600"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Request Withdraw
        </button>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
    </>
  );
}
