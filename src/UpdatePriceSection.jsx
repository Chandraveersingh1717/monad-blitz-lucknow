// import { ethers } from "ethers";
// import MarketplaceJSON from "../Marketplace.json";

// async function updatePriceOnChain(tokenId, newPrice) {
//   if (!newPrice || isNaN(newPrice)) {
//     alert("Please enter a valid price in ETH");
//     return;
//   }

//   try {
//     // Connect to MetaMask
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     await provider.send("eth_requestAccounts", []); // Request access to accounts
//     const signer = provider.getSigner();

//     // Connect to your contract
//     const contract = new ethers.Contract(
//       MarketplaceJSON.address,
//       MarketplaceJSON.abi,
//       signer
//     );

//     // Convert ETH to Wei
//     const priceInWei = ethers.utils.parseUnits(newPrice.toString(), "ether");

//     // Call the smart contract function
//     const transaction = await contract.updatePrice(tokenId, priceInWei);
//     await transaction.wait();

//     alert("Price updated successfully on-chain!");
//   } catch (err) {
//     console.error("Error updating price:", err);
//     alert("Failed to update price: " + (err?.reason || err?.message || "Unknown error"));
//   }
// }





import { ethers } from "ethers";
import MarketplaceJSON from "../Marketplace.json";

const updateListingFee = async (newPriceInETH) => {
  try {
    if (!window.ethereum) throw new Error("MetaMask is not installed");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    const newPriceInWei = ethers.utils.parseEther(newPriceInETH.toString());

    const tx = await contract.updateListPrice(newPriceInWei);
    await tx.wait();

    alert("✅ Listing fee updated successfully!");
  } catch (err) {
    console.error("❌ Error updating listing fee:", err);
    alert(`Failed to update listing fee: ${err.message}`);
  }
};

export default updateListingFee;
