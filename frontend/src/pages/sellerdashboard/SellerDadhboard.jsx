import React, { useState } from "react";
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  StarIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";
import Add from "../../components/addGigModal/AddGigModal";
function SellerDashboard() {
  const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);
const [gigModalOpen, setGigModalOpen] = useState(false);

if (currentUser && !currentUser.isSeller) {
  return <Navigate to="/" replace />;
}

const {
  data: gigs = [],
  isLoading: gigsLoading,
  error: gigsError,
} = useQuery({
  queryKey: ["myGigs"],
  queryFn: async () => {
    const res = await newRequest.get(
      `/gigs?userId=${currentUser._id}`
    );
    return res.data;
  },
});

const {
  data: orders = [],
  isLoading: ordersLoading,
} = useQuery({
  queryKey: ["orders"],
  queryFn: async () => {
    const res = await newRequest.get("/orders");
    return res.data;
  },
});

const {
  data: conversations = [],
  isLoading: conversationsLoading,
} = useQuery({
  queryKey: ["conversations"],
  queryFn: async () => {
    const res = await newRequest.get("/conversations");
    return res.data;
  },
});

// Seller's gig ids
const gigIds = gigs.map((gig) => gig._id);

// Orders related to seller gigs
const sellerOrders = orders.filter((order) =>
  gigIds.includes(order.gigId)
);

// Stats
const earnings = sellerOrders.reduce(
  (total, order) => total + order.price,
  0
);

const totalOrders = sellerOrders.length;

const totalMessages = conversations.length;

const avgRating =
  gigs.length > 0
    ? (
        gigs.reduce(
          (sum, gig) =>
            sum +
            (gig.starNumber
              ? gig.totalStars / gig.starNumber
              : 0),
          0
        ) / gigs.length
      ).toFixed(1)
    : "0.0";

const dashboardLoading =
  gigsLoading ||
  ordersLoading ||
  conversationsLoading;

  return (
     
    
    
    <div className="bg-[#f7f7f7] min-h-screen">
       <Add
      isOpen={gigModalOpen}
      onClose={() => setGigModalOpen(false)}
    />
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good Morning, {currentUser?.username} 👋
          </h1>

          <p className="text-gray-500 mt-2">
            Here's what's happening with your business today.
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">

        {/* Top Cards */}
       <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500">Earnings</p>
        <h2 className="text-3xl text-gray-700 font-bold mt-2">
          ${earnings}
        </h2>
      </div>

      <CurrencyDollarIcon className="w-12 h-12 text-green-500" />
    </div>
  </div>

  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500">Orders</p>
        <h2 className="text-3xl text-gray-700 font-bold mt-2">
          {totalOrders}
        </h2>
      </div>

      <ClipboardDocumentListIcon className="w-12 h-12 text-blue-500" />
    </div>
  </div>

  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500">Messages</p>
        <h2 className="text-3xl text-gray-700 font-bold mt-2">
          {totalMessages}
        </h2>
      </div>

      <ChatBubbleLeftRightIcon className="w-12 h-12 text-purple-500" />
    </div>
  </div>

  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500">Rating</p>
        <h2 className="text-3xl text-gray-700 font-bold mt-2">
          {avgRating}
        </h2>
      </div>

      <StarIcon className="w-12 h-12 text-yellow-500" />
    </div>
  </div>

</div>
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Profile Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-5">

                {currentUser?.img ? (
                  <img
                    src={currentUser.img}
                    alt=""
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#1dbf73] flex items-center justify-center text-white text-3xl font-bold">
                    {currentUser?.username?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <h2 className="text-2xl text-gray-500 font-bold">
                    {currentUser?.username}
                  </h2>

                  <p className="text-gray-500">
                    Professional Seller
                  </p>
                </div>
              </div>
            </div>

            {/* Active Gigs */}
            <div className="bg-white rounded-xl p-6 shadow-sm">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-gray-500 font-bold">
                  Active Gigs
                </h2>

              <button
  onClick={() => setGigModalOpen(true)}
  className="flex items-center gap-2 bg-[#1dbf73] text-white px-4 py-2 rounded-lg"
>
  <PlusCircleIcon className="w-5 h-5" />
  New Gig
</button>
              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">
                        Gig
                      </th>

                      <th className="text-left py-3">
                        Sales
                      </th>

                      <th className="text-left py-3">
                        Earnings
                      </th>

                      <th className="text-left py-3">
                        Status
                      </th>
                    </tr>
                  </thead>

         <tbody>
  {gigsLoading ? (
    <tr>
      <td colSpan="4" className="text-center py-6">
        Loading...
      </td>
    </tr>
  ) : gigsError ? (
    <tr>
      <td
        colSpan="4"
        className="text-center py-6 text-red-500"
      >
        Failed to load gigs
      </td>
    </tr>
  ) : gigs.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-6">
        No gigs found
      </td>
    </tr>
  ) : (
    gigs.map((gig) => (
      <tr
        key={gig._id}
        className="border-b hover:bg-gray-50"
      >
        <td className="py-4">
          <div className="flex items-center gap-3">
            <img
              src={gig.cover}
              alt={gig.title}
              className="w-12 h-12 rounded object-cover"
            />

            <p className="text-sm text-gray-700">
              {gig.title.length > 30
                ? `${gig.title.slice(0, 30)}...`
                : gig.title}
            </p>
          </div>
        </td>

        <td>{gig.sales || 0}</td>

        <td>
          ${(gig.sales || 0) * gig.price}
        </td>

        <td>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            Active
          </span>
        </td>
      </tr>
    ))
  )}
</tbody>
                </table>

              </div>
            </div>

          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">

            <div className="bg-white rounded-xl p-6 shadow-sm">

              <h2 className="font-bold text-gray-500 text-lg mb-4">
                Quick Actions
              </h2>

              <div className="flex flex-col gap-3">

            <button
  onClick={() => setGigModalOpen(true)}
  className="bg-[#1dbf73] text-white text-center py-3 rounded-lg w-full"
>
  Create New Gig
</button>

                <Link
                  to="/orders"
                  className="border py-3 rounded-lg text-center"
                >
                  View Orders
                </Link>

                <Link
                  to="/messages"
                  className="border py-3 rounded-lg text-center"
                >
                  Open Messages
                </Link>

                <Link
                  to="/myGigs"
                  className="border py-3 rounded-lg text-center"
                >
                  Manage Gigs
                </Link>

              </div>

            </div>

            

          </div>

        </div>

      </div>
    </div>
  );
}

export default SellerDashboard;