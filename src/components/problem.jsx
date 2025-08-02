
import React, { useState } from "react";
import BidModal from "./BidModal";

const Problem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const auctions = [
    {
      id: "01",
      title: "Galxe",
      image: "https://www.securities.io/wp-content/uploads/2022/09/galxe.jpeg",
      creator: "Trung Nguyen",
      currentBid: "5.89 ETH",
      link: " https://galxe.com",
    },
    {
      id: "02",
      title: "Layer3",
      image: "https://www.alchemy.com/dapps/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Falchemy-website%2Fimage%2Fupload%2Fv1694675497%2Fdapp-store%2Fdapp-logos%2FLayer%25203.jpg&w=640&q=75&dpl=dpl_ELfE6ona9tScS9poC6sPghhw4CSn",
      creator: "Nicolas Julia",
      currentBid: "5.09 ETH",
      link: " https://layer3.xyz",
    },
    {
      id: "03",
      title: "Zealy",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvnviFvMtMfZpYKoiBYgbx1uMIv4uA2aMlputvobMEX1YnQvnlnJGAjSx6LsTOROoWH6A&usqp=CAU",
      creator: "Arthur Madrid",
      currentBid: "6.89 ETH",
      link: " https://zealy.io",
    },
    {
      id: "04",
      title: "Dework",
      image: "https://cms3.diadata.org/wp-content/uploads/2022/11/DAO-Tooling-Dework.png",
      creator: "James Ferguson",
      currentBid: "7.89 ETH",
      link: " https://dework.xyz",
    },

    {
        id: "05",
        title: "QuestN",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jKxD6Kh8hnwKioiBpcGchBeRu4vC22Z-iQ&s",
        creator: "Kieran Warwick",
        currentBid: "7.89 ETH",
        link: " https://questn.com",
      },
      {
        id: "06",
        title: "LearnWeb3 DAO",
        image: "https://101blockchains.com/wp-content/uploads/2024/08/DAOs-in-WEB3.png",
        creator: "Appxplore",
        currentBid: "7.89 ETH",
        link: " https://learnweb3.io",
      },
  ];

  return (
    <>
    <section className="bg-[#0d0c1d] text-white px-6 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Earn Free NFTs With Problem Solving</h2>
        
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
            {/* <p className="text-sm text-gray-400 mt-1">
              Created By <span className="text-white">{nft.creator}</span>
            </p> */}
            <p className="text-sm mt-1">
              Amount:{" "}
              <span className="text-purple-300">{nft.currentBid}</span>
            </p>
            
          </a>
        ))}
      </div>
    </section>
    </>
  );
};

export default Problem;
