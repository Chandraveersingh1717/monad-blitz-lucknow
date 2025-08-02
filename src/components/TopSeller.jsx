import React from 'react';
import img1 from '../assets/ava-01.png'
import img2 from '../assets/ava-02.png';
import img3 from '../assets/ava-03.png';  
import img4 from '../assets/ava-04.png';
import img5 from '../assets/ava-05.png';
import img6 from '../assets/ava-06.png';

const topSellers = [
  { name: 'Ryan Carder', eth: '5.89', avatar: img1 },
  { name: 'Trista Francis', eth: '5.89', avatar: img2 },
  { name: 'Ryan Carder', eth: '5.89', avatar: img3 },
  { name: 'Trista Francis', eth: '5.89', avatar: img4 },
  { name: 'Ryan Carder', eth: '5.89', avatar: img5 },
  { name: 'Trista Francis', eth: '5.89', avatar: img6 },
  { name: 'Ryan Carder', eth: '5.89', avatar: img1 },
  { name: 'Trista Francis', eth: '5.89', avatar: img2 },
];

const TopSeller = () => {
  return (
    <div className="py-10 px-6 bg-[#0b0c1e]">
      <h2 className="text-white text-2xl font-semibold mb-6">Top Seller</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {topSellers.map((seller, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 bg-[#181a2a] p-3 rounded-xl shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-white font-medium">{seller.name}</h4>
              <p className="text-purple-400 text-sm">{seller.eth} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSeller;
