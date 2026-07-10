import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  // Search from input
  const handleSearch = (searchTerm = input) => {
    if (!searchTerm.trim()) return;

    navigate(
      `/gigs?search=${encodeURIComponent(searchTerm)}`
    );
  };
  const handleCategory = (cat) => {
  navigate(`/gigs?cat=${cat}`);
};
const popularTags = [
  {
    name: "AI Artists",
    cat: "ai-artists",
  },
  {
    name: "Logo Design",
    cat: "logo-design",
  },
  {
    name: "WordPress",
    cat: "wordpress",
  },
  {
    name: "Web Development",
    cat: "web-development",
  },
];




  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#013914] via-[#015d23] to-[#013914] text-white">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/10 blur-[120px] rounded-full"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 py-16 lg:py-0 min-h-[650px] flex flex-col lg:flex-row items-center">

        {/* Left */}
        <div className="flex-1 flex flex-col gap-8 z-10">

          <div>
           

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Find the perfect{" "}
              <span className="italic font-light text-green-300">
                freelance
              </span>{" "}
              services for your business
            </h1>

            <p className="text-gray-200 mt-6 text-lg max-w-2xl">
              Connect with talented freelancers around the world and get your
              projects completed faster.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center max-w-3xl">

            <div className="px-4 text-gray-400">
              <MagnifyingGlassIcon className="w-6 h-6" />
            </div>

            <input
              type="text"
              placeholder='Try "Web Development"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch()
              }
              className="flex-1 py-4 text-gray-700 text-lg outline-none bg-transparent"
            />

            <button
              onClick={() => handleSearch()}
              className="bg-[#1dbf73] hover:bg-[#17a463] px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Search
            </button>
          </div>

          {/* Popular Searches */}


  <div className="flex flex-wrap items-center gap-3 pb-4">
  <span className="font-medium text-green-200">
    Popular:
  </span>

  {popularTags.map((tag) => (
    <button
      key={tag.name}
      onClick={() => handleCategory(tag.cat)}
      className="
        px-4 py-2
        rounded-full
        border border-white/30
        bg-white/5
        text-white
        text-sm
        font-medium
        transition-all duration-300
        hover:bg-white
        hover:text-[#013914]
        hover:border-white
      "
    >
      {tag.name}
    </button>
  ))}
</div>

         

        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center items-end mt-10 lg:mt-0">

          <img
            src="./img/man.png"
            alt="Freelancer"
            className="w-full max-w-[650px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          />

        </div>

      </div>
    </div>
  );
}

export default Featured;