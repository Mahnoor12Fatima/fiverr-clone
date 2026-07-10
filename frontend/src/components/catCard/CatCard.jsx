import React from "react";
import { Link } from "react-router-dom";

function CatCard({ card }) {
  return (
    <Link to={`/gigs?cat=${card.cat}`}>
      <div className="relative w-[252px] h-[344px] rounded-md overflow-hidden cursor-pointer text-white">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-4 left-4 text-sm font-light">
          {card.desc}
        </span>

        <span className="absolute top-10 left-4 text-2xl font-medium">
          {card.title}
        </span>
      </div>
    </Link>
  );
}

export default CatCard;