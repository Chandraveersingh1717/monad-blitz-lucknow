import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export const blogPosts = [
  {
    id: "1",
    title: "Exploring NFT Market Trends in 2025",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOuTudFFRPdYxRcp1twL_x-QvQkW2pIAARQ&s",
    excerpt:
      "Discover how NFTs are evolving into digital ecosystems, reshaping art, gaming, and ownership.",
    author: "Chandraveer Singh",
    date: "July 16, 2025",
    tags: ["NFT", "Web3", "Trends"],
  },
  {
    id: "2",
    title: "Mastering React Performance",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwEQkECsrMQWcH-7-AAoq-SD43cDC4FxuBgw&s",
    excerpt:
      "Boost your React app’s performance with optimization techniques and best practices.",
    author: "Nishant Chaudhary",
    date: "June 28, 2025",
    tags: ["React", "Optimization", "Frontend"],
  },
  {
    id: "3",
    title: "CryptoDose in world of NFTs",
     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-3U7rH67vBW7SBJnatcOUO9otEKjQPX67FA&s",
    excerpt:
      "CryptoDose is the ultimate go-to website for everyone who wants to learn about the industry, as it covers a broad range of related topics. Ultimately, it’s a site with plenty of useful and informative content if you’re looking to learn more about NFTs and crypto.",
    author: "Chanchal",
    date: "May 12, 2025",
    tags: ["MetaVerse", "crypto art", "gaming"],
  },
];

const BlogCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="min-h-screen px-6 lg:px-20 py-16 bg-gradient-to-b from-black to-zinc-900 text-white">
      <h1 className="text-4xl font-extrabold mb-10 text-center">📰 Featured Blogs</h1>
      <Slider {...settings}>
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.03, rotateX: 1, rotateY: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-4"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover rounded-t-2xl"
              />
              <div className="p-5">
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-sm text-gray-300 mt-2 line-clamp-3">{post.excerpt.slice(0,100)}...</p>
                <div className="flex justify-between text-xs text-gray-400 mt-3">
                  <span className="flex items-center gap-1 text-pink-400">
                    <User className="w-4 h-4" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {post.date}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-pink-600/20 text-pink-300 text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`} className="mt-4 inline-block">
  <button             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg transition">

    <span className="relative z-10">Read More →</span>
    <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition duration-300 blur-sm"></span>
  </button>
</Link>

              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default BlogCarousel;
