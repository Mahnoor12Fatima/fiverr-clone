import React from "react";

function ProjectCard({ card }) {
  return (
    <div className="w-[300px] h-[300px] rounded-md overflow-hidden cursor-pointer border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
      
      {/* Project Image */}
      <img
        src={card.img}
        alt={card.cat}
        className="w-full h-[70%] object-cover"
      />

      {/* Info */}
      <div className="flex items-center gap-5 p-4">
        <img
          src={card.pp}
          alt={card.username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div>
          <h2 className="text-sm font-medium text-gray-900">
            {card.cat}
          </h2>

          <span className="text-sm font-light text-gray-600">
            {card.username}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;