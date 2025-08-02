import React from "react";

const categories = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3U7rH67vBW7SBJnatcOUO9otEKjQPX67FA&s",
    title: "COLLECTIBLES",
    count: 6,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-3kl6xfVda1uDi1sPDqpdsBtOEeHxmyxyHA&s",
    title: "DIGITAL ART",
    count: 17,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnz3WhVWfdXqRZXdoRiTv8pKnMbA8Y0Xmf-Q&s",
    title: "Sports",
    count: 4,
  },
  {
    image: "https://www.shutterstock.com/image-photo/metaverse-digital-cyber-world-technology-260nw-2062865573.jpg",
    title: "VIRTUAL WORLDS",
    count: 6,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFIP8MBAWmvz6Vw4GYpN5trRWetr76aRb_FQ&s",
    title: "Utility",
    count: 4,
  },
];

const CategorySection = () => {
  return (
    <div className="py-20 px-6 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-extrabold text-center text-purple-800 mb-10">
        Explore Categories
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex items-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-24 h-24 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-purple-700">
                {category.title}
              </h3>
              <p className="text-sm text-gray-500">
                {category.count} Products in this Category
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
