import React from 'react';
import heroImage from '../logo.png';
import back from '../back.jpg';
import { useNavigate } from 'react-router';

const Banner = () => {
    const navigate = useNavigate();
  return (
    <section
      className="text-white min-h-screen px-8 md:px-16 py-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${back})`,
      }}
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover rare digital art and collect
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              sell extraordinary
            </span>{' '}
            NFTs
          </h1>
          <p className="text-gray-300 mb-6">
          Nfts MarketPlace is a decentralized platform where users can seamlessly buy, sell, and trade unique digital assets. Whether you're an artist, collector, or investor, our marketplace empowers you to showcase and own NFTs with transparency and security. Join a growing community of creators and explore the future of digital ownership today.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <button onClick={()=>navigate("/marketPlace")} className="px-6 py-2 bg-transparent border border-purple-500 rounded-full hover:bg-purple-600 transition">
              🔍 Explore
            </button>
            <button onClick={()=>navigate("/sellNFT")} className="px-6 py-2 bg-transparent border border-purple-500 rounded-full hover:bg-purple-600 transition">
              ➕ Create
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={heroImage}
            alt="NFT Hero"
            className="rounded-lg max-w-[400px] shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
