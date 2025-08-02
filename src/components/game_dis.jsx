import React from "react";
import { useNavigate } from "react-router-dom";

const Problem = () => {
  const navigate = useNavigate();

  const nft = {
    title: "Solve to Earn NFT",
    image: "https://spribe.co/assets/images/games/carousel/screen_pl-1.jpeg",
    currentBid: "Free Entry",
  };

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <section className="bg-gradient-to-br from-[#0d0c1d] to-[#1b1a33] text-white min-h-screen px-6 py-20 flex flex-col items-center justify-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        🎮 Earn Free NFTs by Playing Games on This Site
      </h2>

      <div
        onClick={handleClick}
        className="bg-[#23213b] hover:bg-[#2e2c4b] p-6 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer w-full max-w-sm text-center group"
      >
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-56 object-cover rounded-xl mb-4 border-2 border-purple-500/30 group-hover:border-purple-400 transition"
        />
        <h3 className="text-2xl font-semibold mb-1">{nft.title}</h3>
        <p className="text-sm text-gray-400 mb-2">Entry: <span className="text-green-400">{nft.currentBid}</span></p>
        <button
          className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:brightness-110 transition"
        >
          🚀 Start Game
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-6">No wallet needed. Just play & earn.</p>
    </section>
  );
};

export default Problem;
