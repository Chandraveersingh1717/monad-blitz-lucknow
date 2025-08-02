
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Marketplace() {
  const [nfts, setNfts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchNFTs = async () => {
    try {
      setLoading(true);
      const ethers = require("ethers");
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
          const meta = (await axios.get(GetIpfsUrlFromPinata(tokenURI))).data;
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

      setNfts(items);
      setDataFetched(true);
    } catch (err) {
      console.error("Failed to fetch NFTs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!dataFetched) fetchNFTs();
  }, [dataFetched]);

  const filteredNFTs = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" min-h-screen text-white">
      <Navbar />

      <div className="w-full px-20 ">
      <h2 className="text-3xl font-extrabold mb-4 text-center">Top NFTs</h2>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search NFTs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 border-opacity-50"></div>
          </div>
        ) : filteredNFTs.length > 0 ? (
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{filteredNFTs.map((nft, index) => (
              <NFTTile key={index} data={nft} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg mt-10">
            No NFTs found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
