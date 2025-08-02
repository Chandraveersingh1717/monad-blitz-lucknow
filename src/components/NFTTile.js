
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";

function NFTTile({ data, index }) {
  const imageUrl = GetIpfsUrlFromPinata(data.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="rounded-xl overflow-hidden shadow-lg bg-gray-800"
    >
      <div className="relative h-64 w-full">
        <img
          src={imageUrl}
          alt={data.name}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{data.name}</h3>
          <span className="bg-purple-600 text-white px-2 py-1 rounded-md text-sm">
            {data.price} ETH
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {data.description}
        </p>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img
                src="https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg"
                // alt={data.creator.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-gray-300 text-sm">{data.owner.slice(0, 20)}...</span>
          </div>

          <Link
            to={`/nftPage/${data.tokenId}`}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default NFTTile;
