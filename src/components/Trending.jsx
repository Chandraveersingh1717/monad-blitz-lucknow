
import React, { useState, useEffect } from "react";
import BidModal from "./BidModal";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { GetIpfsUrlFromPinata } from "../utils";
import { ethers } from "ethers";

const Trending = () => {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  const openModal = (nft) => {
    setSelectedNFT(nft);
    setIsOpen(true);
  };

  const getAllNFTs = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );

      const transaction = await contract.getAllNFTs();

      const items = await Promise.all(
        transaction.map(async (i) => {
          let tokenURI = await contract.tokenURI(i.tokenId);
          tokenURI = GetIpfsUrlFromPinata(tokenURI);
          const meta = (await axios.get(tokenURI)).data;

          const price = ethers.utils.formatUnits(i.price.toString(), "ether");
          return {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };
        })
      );

      updateData(items);
      updateFetched(true);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  };

  useEffect(() => {
    if (!dataFetched) getAllNFTs();
  }, [dataFetched]);

  return (
    <section className="bg-[#0d0c1d] text-white px-6 py-12 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Trending</h2>
        <a href="/marketPlace" className="text-purple-400 hover:underline">
          Explore more
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.slice(0, 8).map((nft, index) => (
          <NFTTile
            data={nft}
            key={index}
            onClick={() => openModal(nft)} 
          />
        ))}
      </div>

      {selectedNFT && (
        <BidModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          nft={selectedNFT}
        />
      )}
    </section>
  );
};

export default Trending;
