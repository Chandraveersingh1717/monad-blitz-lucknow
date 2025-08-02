import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "./BlogCarousel";
import { Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ReadMoreBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Blog not found.
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 lg:px-32 py-16 bg-gradient-to-b from-black to-zinc-900 text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-pink-400 hover:underline"
      >
        ← Back to Blogs
      </button>

      <div className="max-w-4xl mx-auto">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 object-cover rounded-xl mb-6 shadow-lg"
        />
        <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
        <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" /> {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
        </div>
        <div className="flex gap-2 flex-wrap mb-6">
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-pink-500/20 text-pink-300 px-3 py-1 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-lg text-gray-200 leading-7">
  {post.excerpt}
</p>

      </div>
    </section>
  );
};

export default ReadMoreBlog;
