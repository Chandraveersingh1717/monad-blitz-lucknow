import React, { useState } from "react";
import { ethers } from "ethers";
import MarketplaceABI from "../Marketplace.json"; // Make sure this file exists

const ResellNFT = ({ tokenId, marketplaceAddress }) => {
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResell = async () => {
    if (!price) return alert("Enter a valid price");

    try {
      setLoading(true);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const marketplaceContract = new ethers.Contract(
        marketplaceAddress,
        MarketplaceABI.abi,
        signer
      );

      const formattedPrice = ethers.utils.parseEther(price);

      const listingFee = await marketplaceContract.getListPrice();

      const tx = await marketplaceContract.resellToken(
        tokenId,
        formattedPrice,
        { value: listingFee }
      );

      await tx.wait();
      alert("NFT resold successfully!");
      setPrice("");
    } catch (err) {
      console.error("Resell failed:", err);
      alert("Resell failed: " + (err?.reason || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resell NFT</h2>
      <input
        type="text"
        placeholder="Enter new price in ETH"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full px-3 py-2 mb-3 border rounded"
      />
      <button
        onClick={handleResell}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Resell"}
      </button>
    </div>
  );
};

export default ResellNFT;
