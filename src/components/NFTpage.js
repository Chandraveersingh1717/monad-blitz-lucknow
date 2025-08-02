
import Navbar from "./Navbar";
import { useParams, Link } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import { GetIpfsUrlFromPinata } from "../utils";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function NFTPage() {
  const [data, updateData] = useState({});
  const [relatedBySeller, setRelatedBySeller] = useState([]);
  const [relatedByName, setRelatedByName] = useState([]);
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");
  const [owner, setOwner] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const params = useParams();
  const tokenId = params.tokenId;

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateCurrAddress(addr);

    const contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    try {
      let tokenURI = await contract.tokenURI(tokenId);
      tokenURI = GetIpfsUrlFromPinata(tokenURI);
      const meta = (await axios.get(tokenURI)).data;
      const listedToken = await contract.getListedTokenForId(tokenId);

      const item = {
        price: ethers.utils.formatEther(listedToken.price.toString()), // ✅ use updated on-chain price
        tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: GetIpfsUrlFromPinata(meta.image),
        name: meta.name,
        description: meta.description,
      };

      updateData(item);
      updateDataFetched(true);

      const allNFTs = await fetchAllNFTs(contract);

      const bySameSeller = allNFTs.filter(
        (nft) => nft.seller === listedToken.seller && nft.tokenId !== tokenId
      );
      const bySimilarName = allNFTs.filter(
        (nft) =>
          nft.name.toLowerCase().includes(meta.name.split(" ")[0].toLowerCase()) &&
          nft.tokenId !== tokenId
      );

      setRelatedBySeller(bySameSeller);
      setRelatedByName(bySimilarName);
    } catch (err) {
      console.error("Error fetching NFT:", err.message);
      updateMessage("This NFT does not exist.");
    }
  }

  async function fetchAllNFTs(contract) {
    const ethers = require("ethers");
    const items = [];
    const allTokens = await contract.getAllNFTs();

    for (let i = 0; i < allTokens.length; i++) {
      try {
        let tokenURI = await contract.tokenURI(allTokens[i].tokenId);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        const meta = (await axios.get(tokenURI)).data;

        items.push({
          price: ethers.utils.formatEther(allTokens[i].price.toString()), // ✅ fix here too
          tokenId: Number(allTokens[i].tokenId),
          seller: allTokens[i].seller,
          owner: allTokens[i].owner,
          image: GetIpfsUrlFromPinata(meta.image),
          name: meta.name,
          description: meta.description,
        });
      } catch (err) {
        continue;
      }
    }
    return items;
  }

  async function buyNFT(tokenId) {
    try {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );

      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Up to 5 mins)");

      const transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
      window.location.reload();
    } catch (e) {
      alert("Transaction Error: " + e);
      updateMessage("Transaction failed");
    }
  }

  async function updatePrice() {
    if (!newPrice || isNaN(newPrice)) {
      alert("Enter a valid price in ETH.");
      return;
    }

    try {
      const ethers = require("ethers");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );

      const priceInWei = ethers.utils.parseUnits(newPrice, "ether");

      setIsUpdating(true);
      updateMessage("Updating price...");

      const tx = await contract.updateTokenPrice(tokenId, priceInWei);
      await tx.wait();

      updateMessage("Price updated successfully!");
      updateData((prev) => ({ ...prev, price: newPrice }));
      setNewPrice("");
    } catch (err) {
      console.error("Price update failed:", err);
      updateMessage("Failed to update price.");
    } finally {
      setIsUpdating(false);
    }
  }

  useEffect(() => {
    if (!dataFetched) getNFTData(tokenId);
  }, [dataFetched, tokenId]);

  return (
    <div className="min-h-screen text-white font-sans">
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row items-start gap-12 px-6 lg:px-20 mt-24"
      >
        {data.image ? (
          <>
            <img
              src={data.image}
              alt={data.name}
              className="w-full max-w-md rounded-2xl shadow-xl border-4 border-white/10"
            />

            <div className="flex-1 bg-white/10 border border-white/20 p-8 rounded-2xl backdrop-blur-md shadow-lg space-y-6 text-lg">
              <h2 className="text-3xl font-bold text-white mb-4">{data.name}</h2>
              <p className="text-white/90">{data.description}</p>

              <div className="space-y-2">
                <div><strong>Price:</strong> <span className="text-blue-400">{data.price} ETH</span></div>
                <div><strong>Owner:</strong> <span className="text-gray-300 text-sm break-words">{data.owner}</span></div>
                <div><strong>Seller:</strong> <span className="text-gray-300 text-sm break-words">{data.seller}</span></div>
              </div>

              <div className="pt-4 space-y-4">
                {currAddress !== data.owner && currAddress !== data.seller ? (
                  <button
                    onClick={() => buyNFT(tokenId)}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-md transition-all"
                  >
                    Buy this NFT
                  </button>
                ) : (
                  <div className="text-green-400 font-semibold">
                    You are the owner of this NFT
                  </div>
                )}

                {currAddress === data.seller && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter new price in ETH"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-400"
                    />
                    <button
                      onClick={updatePrice}
                      disabled={isUpdating}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-xl shadow transition"
                    >
                      {isUpdating ? "Updating..." : "Update Price"}
                    </button>
                  </div>
                )}

                {message && <div className="text-sm mt-3 text-yellow-300">{message}</div>}
              </div>
            </div>
          </>
        ) : (
          <div className="text-red-400 text-lg font-medium">{message || "Loading..."}</div>
        )}
      </motion.div>

      {/* NFTs by Same Seller */}
      {relatedBySeller.length > 0 && (
        <section className="mt-20 px-6 lg:px-20">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 border-l-4 border-blue-500 pl-3">More from This Seller</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBySeller.map((item) => (
              <Link key={item.tokenId} to={`/nftPage/${item.tokenId}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-md transition"
                >
                  <img src={item.image} className="rounded-lg mb-2 w-full aspect-square object-cover" />
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-gray-300">{item.price} ETH</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* NFTs with Similar Name */}
      {relatedByName.length > 0 && (
        <section className="mt-20 px-6 lg:px-20 mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 border-l-4 border-pink-500 pl-3">Similar NFTs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedByName.map((item) => (
              <Link key={item.tokenId} to={`/nftPage/${item.tokenId}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 border border-white/20 rounded-xl p-4 shadow-md transition"
                >
                  <img src={item.image} className="rounded-lg mb-2 w-full aspect-square object-cover" />
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-sm text-gray-300">{item.price} ETH</div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
