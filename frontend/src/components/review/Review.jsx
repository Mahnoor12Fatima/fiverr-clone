import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
  if (!review) return null;

  const { data, isLoading } = useQuery({
    queryKey: ["reviewUser", review.userId],
    enabled: !!review.userId,
    queryFn: async () => {
      const res = await newRequest.get(
        `/users/${review.userId}`
      );
      return res.data;
    },
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <div className="flex gap-4">
        <img
          src={
            data?.img ||
            `https://ui-avatars.com/api/?name=${data?.username}&background=7d0c27&color=fff`
          }
          alt="Reviewer"
          className="w-14 h-14 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">
            {isLoading ? "Loading..." : data?.username}
          </h4>

          <p className="text-gray-500 text-sm">
            {data?.country}
          </p>

          <div className="flex items-center gap-1 mt-1">
            {Array(review.star || 0)
              .fill()
              .map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-yellow-400"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.258 5.273c.271 1.137-.964 2.024-1.96 1.425L12 18.354l-4.572 2.826c-.996.6-2.231-.288-1.96-1.425l1.258-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z"
                  />
                </svg>
              ))}

            <span>{review.star}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mt-4 leading-7">
        {review.desc}
      </p>
    </div>
  );
};

export default Review;