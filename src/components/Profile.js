
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Profile() {
    const [data, updateData] = useState([]);
    const [dataFetched, updateFetched] = useState(false);
    const [address, updateAddress] = useState("0x");
    const [totalPrice, updateTotalPrice] = useState("0");

    async function getNFTData() {
        try {
            const ethers = require("ethers");
            let sumPrice = 0;
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const addr = await signer.getAddress();
            const contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
            const transaction = await contract.getMyNFTs();

            const items = await Promise.all(transaction.map(async (i) => {
                let tokenURI = await contract.tokenURI(i.tokenId);
                tokenURI = GetIpfsUrlFromPinata(tokenURI);
                let meta = await axios.get(tokenURI);
                meta = meta.data;
                let price = ethers.utils.formatUnits(i.price.toString(), "ether");

                return {
                    price,
                    tokenId: i.tokenId.toNumber(),
                    seller: i.seller,
                    owner: i.owner,
                    image: GetIpfsUrlFromPinata(meta.image),
                    name: meta.name,
                    description: meta.description,
                };
            }));

            sumPrice = items.reduce((acc, item) => acc + Number(item.price), 0);
            updateData(items);
            updateFetched(true);
            updateAddress(addr);
            updateTotalPrice(sumPrice.toPrecision(3));
        } catch (e) {
            console.error("Error fetching NFTs:", e);
        }
    }

    const params = useParams();

    useEffect(() => {
        if (!dataFetched) getNFTData();
    }, [dataFetched]);

    return (
        <>
            <div className="flex flex-col items-center text-white min-h-screen">
                <Navbar />
                <div className="w-full max-w-6xl text-center h-full mt-10 px-4">
                    <div className="p-5 bg-black bg-opacity-30 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold">Wallet Address</h2>
                        <p className="glassmorphism break-words">{address}</p>
                    </div>

                    <div className="flex justify-center mt-10 space-x-10">
                        <div className="stats-box p-4 bg-black bg-opacity-30  rounded-xl shadow-lg">
                            <h2 className="font-bold">No. of NFTs</h2>
                            <p className="text-xl">{data.length}</p>
                        </div>
                        <div className="stats-box p-4 bg-black bg-opacity-30  rounded-xl shadow-lg">
                            <h2 className="font-bold">Total Value</h2>
                            <p className="text-xl">{totalPrice} ETH</p>
                        </div>
                    </div>

                    <div className="mt-10">
                        <h2 className="text-2xl font-bold">Your NFTs</h2>
                        <div className="nft-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
                            {data.map((value, index) => (
                                <NFTTile data={value} key={index} />
                            ))}
                        </div>
                    </div>

                    {data.length === 0 && (
                        <p className="text-xl mt-10 text-red-400">
                            Oops, No NFT data to display (Are you logged in?)
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
