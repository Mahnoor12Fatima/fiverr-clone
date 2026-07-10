import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient=useQueryClient()
  const { data, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await newRequest.get("/conversations");
      return res.data;
    },
  });
  const mutation = useMutation({
  mutationFn: (id) => {
    return newRequest.put(`/conversations/${id}`);
  },

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["conversations"],
    });
  },
});

const handleRead = (id) => {
  mutation.mutate(id);
};

return (
  <>
    {isLoading ? (
      "Loading..."
    ) : error ? (
      "Error"
    ) : (
      <div className="bg-white overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5">
          <h2 className="text-white text-xl font-semibold">
            Conversations
          </h2>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-6 py-4 text-gray-600 font-semibold">
                {currentUser?.isSeller ? "Buyer" : "Seller"}
              </th>
              <th className="text-left px-6 py-4 text-gray-600 font-semibold">
                Message
              </th>
              <th className="text-left px-6 py-4 text-gray-600 font-semibold">
                Date
              </th>
              <th className="text-left px-6 py-4 text-gray-600 font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {data?.map((c) => (
              <tr
                key={c._id}
                className={`transition-all duration-300 hover:bg-gray-50 border-b ${
                  (!currentUser?.isSeller && !c.readByBuyer) ||
                  (currentUser?.isSeller && !c.readBySeller)
                    ? "bg-green-50"
                    : ""
                }`}
              >
                {/* User */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
                      {(currentUser?.isSeller
                        ? c.buyerId
                        : c.sellerId)
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {currentUser?.isSeller
                          ? c.buyerId
                          : c.sellerId}
                      </p>

                      {((currentUser?.isSeller &&
                        !c.readBySeller) ||
                        (!currentUser?.isSeller &&
                          !c.readByBuyer)) && (
                        <span className="text-xs text-green-600 font-medium">
                          New Message
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Message */}
                <td className="px-6 py-5">
                  <Link
                    to={`/message/${c._id}`}
                    className="text-gray-600 hover:text-green-600 transition"
                  >
                    {c.lastMessage
                      ? c.lastMessage.substring(0, 80) +
                        (c.lastMessage.length > 80 ? "..." : "")
                      : "No messages yet"}
                  </Link>
                </td>

                {/* Date */}
                <td className="px-6 py-5 text-gray-500 whitespace-nowrap">
                  {moment(c.updatedAt).fromNow()}
                </td>

                {/* Action */}
                <td className="px-6 py-5">
                  {((currentUser?.isSeller &&
                    !c.readBySeller) ||
                    (!currentUser?.isSeller &&
                      !c.readByBuyer)) && (
                    <button
                      onClick={() => handleRead(c._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-md"
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No Conversations Yet
            </h3>
            <p className="text-gray-500 mt-2">
              Start chatting with buyers and sellers.
            </p>
          </div>
        )}
      </div>
    )}
  </>
);
}

export default Messages;