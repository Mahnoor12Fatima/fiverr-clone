import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/solid";
import newRequest from "../../utils/newRequest";
import getCurrentUser from "../../utils/getCurrentUser";

import toast from "react-hot-toast";
import Add from "../../components/addGigModal/AddGigModal";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] =
    useState(false);

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ["myGigs"],
    queryFn: async () => {
      const res = await newRequest.get(
        `/gigs?userId=${currentUser._id}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (id) =>
      newRequest.delete(`/gigs/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myGigs"],
      });

      toast.success(
        "Gig deleted successfully!"
      );
    },

    onError: () => {
      toast.error("Failed to delete gig");
    },
  });

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this gig?"
      )
    ) {
      mutation.mutate(id);
    }
  };

  return (
    <>
      <div className="flex justify-center text-gray-600">
        <div className="w-full max-w-[1400px] py-12 px-4">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-medium">
              {currentUser?.isSeller
                ? "My Gigs"
                : "Orders"}
            </h1>

            {currentUser?.isSeller && (
              <button
                onClick={() =>
                  setShowAddModal(true)
                }
                className="bg-[#1dbf73] hover:bg-[#19a463] text-white px-5 py-3 rounded-lg transition"
              >
                Add New Gig
              </button>
            )}
          </div>

          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Something went wrong!</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b h-16 text-left bg-gray-50">
                    <th className="px-4">Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((gig) => (
                    <tr
                      key={gig._id}
                      className="h-16 border-b even:bg-green-50"
                    >
                      <td className="px-4">
                        <img
                          src={gig.cover}
                          alt={gig.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </td>

                      <td>{gig.title}</td>

                      <td>${gig.price}</td>

                      <td>{gig.sales || 0}</td>

                      <td>
                        <button
                          onClick={() =>
                            handleDelete(gig._id)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data?.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No gigs found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ADD GIG MODAL */}
      <Add
        isOpen={showAddModal}
        onClose={() =>
          setShowAddModal(false)
        }
      />
    </>
  );
}

export default MyGigs;