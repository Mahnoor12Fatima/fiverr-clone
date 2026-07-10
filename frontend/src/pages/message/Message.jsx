import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";

const Message = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [desc, setDesc] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      const res = await newRequest.get(`/messages/${id}`);
      return res.data;
    },
  });
const handleSend = () => {
  if (!desc.trim()) {
    toast.error("Please enter a message");
    return;
  }

  sendMessageMutation.mutate();
};
  const sendMessageMutation = useMutation({
    mutationFn: async () => {
      return await newRequest.post("/messages", {
        conversationId: id,
        desc,
      });
    },
  onMutate: () => {
    toast.loading("Sending message...", {
      id: "messageToast",
    });
  },
    onSuccess: () => {
      setDesc("");

      queryClient.invalidateQueries({
        queryKey: ["messages", id],
      });
       toast.success("Message sent successfully!", {
      id: "messageToast",
    });
    },

    onError: (err) => {
      console.log(err);
       toast.error("Failed to send message", {
      id: "messageToast",
    });
    },
  });
const { data: conversation } = useQuery({
  queryKey: ["conversation", id],
  queryFn: async () => {
    const res = await newRequest.get(
      `/conversations/single/${id}`
    );
    return res.data;
  },
});const { data: seller } = useQuery({
  queryKey: ["seller", conversation?.sellerId],
  enabled: !!conversation?.sellerId,
  queryFn: async () => {
    const res = await newRequest.get(
      `/users/public/${conversation.sellerId}`
    );
    return res.data;
  },
});const { data: buyer } = useQuery({
  queryKey: ["buyer", conversation?.buyerId],
  enabled: !!conversation?.buyerId,
  queryFn: async () => {
    const res = await newRequest.get(
      `/users/public/${conversation.buyerId}`
    );
    return res.data;
  },
});
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl m-12">
        <span className="text-sm font-light text-gray-500">
          <Link
            to="/messages"
            className="hover:text-green-600"
          >
            Messages
          </Link>{" "}
          &gt; Conversation
        </span>

        {isLoading ? (
          <div className="mt-5">Loading...</div>
        ) : error ? (
          <div className="mt-5 text-red-500">
            Something went wrong
          </div>
        ) : (
          <div className="my-8 p-12 flex flex-col gap-5 h-[500px] overflow-y-auto bg-white rounded-xl shadow">
            {data?.map((m) => (
              <div
                key={m._id}
                className={`flex gap-5 max-w-[600px] ${
                  m.userId === currentUser?._id
                    ? "owner item"
                    : "item"
                }`}
              >
               <img
  src={
    (
      m.userId === conversation?.sellerId
        ? seller?.img
        : buyer?.img
    ) ||
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  }
  alt=""
  className="w-10 h-10 rounded-full object-cover"
/>

                <p
                  className={`max-w-[500px] p-5 ${
                    m.userId === currentUser?._id
                      ? "bg-blue-600 text-white rounded-tl-2xl rounded-br-2xl rounded-bl-2xl"
                      : "bg-gray-100 text-gray-600 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        <hr className="border border-gray-200 mb-5" />

        <div className="flex items-center justify-between gap-4">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write a message..."
            className="w-4/5 h-24 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          />

         <button
  onClick={handleSend}
  disabled={sendMessageMutation.isPending}
  className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-4 rounded-xl transition duration-300 disabled:bg-gray-400"
>
  {sendMessageMutation.isPending
    ? "Sending..."
    : "Send"}
</button>
        </div>
      </div>
    </div>
  );
};

export default Message;