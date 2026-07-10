import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
    const { data, isLoading, error} = useQuery({
    queryKey: ["gigUser", item.userId],
    queryFn: async () => {
     const res = await newRequest.get(`/users/public/${item.userId}`);
       return res.data;
    },
  });
  return (
    <Link to={`/gig/${item._id}`} className="block">
      <div className="w-full max-w-[324px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        
        {/* Gig Image */}
        <div className="overflow-hidden">
          <img
            src={item.cover}
            alt={item.desc}
            className="h-52 w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {isLoading ? ("Loading") : error ? ("Something went wrong"):(

          <div className="mb-4 flex items-center gap-3">
            <img
  src={data?.img || "/img/noavatar.jpg"}
  alt={data?.username || "User"}
  className="h-10 w-10 rounded-full border-2 border-green-500 object-cover"
/>

            <div>
             
<h4 className="font-semibold text-gray-800">
  {data?.username || "Unknown Seller"}
</h4>
              <span className="text-xs text-gray-500">
                Top Rated Seller
              </span>
            </div>
          </div>
          )}
         

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm leading-6 text-gray-600">
            {item.desc}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <img
              src="./img/star.png"
              alt="Star"
              className="h-4 w-4"
            />
            <span className="font-semibold text-yellow-500">
              {!isNaN(item.totalStars/item.starNumber) && Math.round(item.totalStars / item.starNumber)}
            </span>
            <span className="text-sm text-gray-400">
              ( Reviews)
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Footer */}
        <div className="flex items-center justify-between p-5">
          
          <button className="rounded-full p-2 transition hover:bg-red-50">
            <img
              src="./img/heart.png"
              alt="Favorite"
              className="h-5 w-5"
            />
          </button>

          <div className="text-right">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
              Starting at
            </span>

            <div className="mt-1">
              <span className="text-2xl font-bold text-gray-900">
                ${item.price}
              </span>
             
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;