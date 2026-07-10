import React from "react";
import Review from "../review/Review";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";

const Reviews = ({ gigId,currentUser  }) => {
  console.log("Current Gig ID:", gigId);
  const queryClient = useQueryClient();

const { data, isLoading, error } = useQuery({
  queryKey: ["reviews", gigId],
  queryFn: async () => {
    const res = await newRequest.get(`/reviews/${gigId}`);

    console.log("Reviews API Response:", res.data);

    return res.data;
  },
  enabled: !!gigId,
});
  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post(
        "/reviews",
        review
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", gigId],
      });
       toast.success("Review submitted successfully!");
    },
      onError: (err) => {
    toast.error(
      err?.response?.data || "Failed to submit review"
    );
  },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const desc = e.target.desc.value;
    const star = Number(
      e.target.star.value
    );

    mutation.mutate({
      gigId,
      desc,
      star,
    });

    e.target.reset();
  };

  return (
    <div className="review">
      <h2 className="text-2xl text-black font-bold mb-6">
        Reviews
      </h2>
{isLoading ? (
  <p>Loading...</p>
) : error ? (
  <p>Something went wrong</p>
) : data?.length === 0 ? (
  <p>No reviews yet.</p>
) : (
  data.map((review) => (
    <Review
      key={review._id}
      review={review}
    />
  ))
)}
{currentUser && !currentUser.isSeller && (
      <div className="add mt-8 bg-white p-6 rounded-xl shadow">
       
        <h3 className="text-lg font-semibold mb-4">
          Add a Review
        </h3>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <textarea
            name="desc"
            placeholder="Write your opinion..."
            className="border rounded-lg p-3"
            rows="4"
            required
          />

          <select
            name="star"
            className="border rounded-lg p-3"
            required
          >
            <option value="">
              Select Rating
            </option>
            <option value="1">
              1 Star
            </option>
            <option value="2">
              2 Stars
            </option>
            <option value="3">
              3 Stars
            </option>
            <option value="4">
              4 Stars
            </option>
            <option value="5">
              5 Stars
            </option>
          </select>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-green-600 text-white py-3 px-4 rounded-lg"
          >
            {mutation.isPending
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>

        {mutation.isError && (
          <p className="text-red-500 mt-2">
            {mutation.error?.response?.data
              ?.message ||
              "Failed to submit review"}
          </p>
        )}
      </div>)}
    </div>
  );
};

export default Reviews;