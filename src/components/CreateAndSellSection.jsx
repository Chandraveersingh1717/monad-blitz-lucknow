import { FaWallet, FaLayerGroup, FaImages, FaList } from 'react-icons/fa';

const features = [
  {
    icon: <FaWallet size={24} className="text-indigo-400" />,
    title: 'Setup your wallet',
    description: 'Connect your cryptocurrency wallet to securely manage your NFTs and interact with the blockchain.'
  },
  {
    icon: <FaLayerGroup size={24} className="text-indigo-400" />,
    title: 'Create your collection',
    description: 'Organize your NFTs by creating a custom collection with a unique name, description, and banner.'
  },
  {
    icon: <FaImages size={24} className="text-indigo-400" />,
    title: 'Add your NFTs',
    description: 'Upload your digital assets, add titles, descriptions, properties, and mint them as NFTs.'
  },
  {
    icon: <FaList size={24} className="text-indigo-400" />,
    title: 'List them for sale',
    description: 'Set your price and choose between fixed-price or auction listings to sell your NFTs to collectors.'
  }
  
];

export default function CreateAndSellSection() {
  return (
    <section className="bg-[#0f0f1d] text-white py-16 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Create and sell your NFTs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#1e1e2f] p-6 rounded-xl shadow-md hover:shadow-purple-500/40 transition-all duration-300"
          >
            <div className="mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-[#2d2d44] rounded-lg">
                {item.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
