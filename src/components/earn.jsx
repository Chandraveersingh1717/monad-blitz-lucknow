
import React, { useState } from "react";
import BidModal from "./BidModal";
import Navbar from "./Navbar";
import Problem from "./problem";
import Game from "./game_dis";

const Earn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const auctions = [
    {
      id: "01",
      title: "Axieinfinity",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRkXRx2xUe7lEqWEKUFmSdHkjqsQjKpWNm0Q&s",
      creator: "Trung Nguyen",
      currentBid: "5.89 ETH",
      link: "https://axieinfinity.com",
    },
    {
      id: "02",
      title: "Sorare",
      image: "https://cdn.prod.website-files.com/603404ef5024773ad38de705/632c7af2bdcd94b24233d41e_FOOT%20-%20Leon%20Reason.webp",
      creator: "Nicolas Julia",
      currentBid: "5.09 ETH",
      link: "https://sorare.com",
    },
    {
      id: "03",
      title: "Sandbox",
      image: "https://miro.medium.com/v2/resize:fit:1200/1*gyxYRqdcULyjIOC-WRksXw.jpeg",
      creator: "Arthur Madrid",
      currentBid: "6.89 ETH",
      link: "https://sandbox.game",
    },
    {
      id: "04",
      title: "Immutable",
      image: "https://sm.ign.com/ign_ap/screenshot/default/0-6ec1jbmsiljrbsz3_ngs5.jpg",
      creator: "James Ferguson",
      currentBid: "7.89 ETH",
      link: "https://www.immutable.com",
    },

    {
        id: "05",
        title: "illuvium",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr6xjh9_I7J4LpeG6c3SIs_Ltj3Ktku3YbPQ&s",
        creator: "Kieran Warwick",
        currentBid: "7.89 ETH",
        link: "https://illuvium.io/",
      },
      {
        id: "06",
        title: "Snaky Cat",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIxYmvoxhf6A1W6cZzj4QdyQdxmlwO450Z0A&s",
        creator: "Appxplore",
        currentBid: "7.89 ETH",
        link: "https://snakycat.io/",
      },
  ];

  return (
    <>
    <Navbar />
    <section className="bg-[#0d0c1d] text-white px-6 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Earn Free NFTs With Games</h2>
        
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {auctions.map((nft) => (
          <a
            key={nft.id}
            href={nft.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1b1a33] p-4 rounded-xl shadow-md hover:scale-105 transition-transform block"
          >
            <img
              src={nft.image}
              alt={nft.title}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-bold">{nft.title}</h3>
            <p className="text-sm text-gray-400 mt-1">
              Created By <span className="text-white">{nft.creator}</span>
            </p>
            <p className="text-sm mt-1">
              Amount:{" "}
              <span className="text-purple-300">{nft.currentBid}</span>
            </p>
            
          </a>
        ))}
      </div>
    </section>
    <Problem />
    <Game />
    </>
  );
};

export default Earn;
