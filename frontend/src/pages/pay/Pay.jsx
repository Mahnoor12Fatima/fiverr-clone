import React from "react";
import { useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

export const Pay = () => {
  const { id } = useParams();

  const handleCheckout = async () => {
    try {
      const res = await newRequest.post(
        `/orders/checkout/${id}`
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};