import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import newRequest from "../../utils/newRequest";
import Review from "../../components/review/Review";
import Reviews from "../../components/reviews/Reviews";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import getCurrentUser from "../../utils/getCurrentUser";
const Gig = () => {
const navigate = useNavigate();
  const {id}=useParams();
  const currentUser = getCurrentUser();
    const { data, isLoading, error ,} = useQuery({
    queryKey: ["gig",id],
  queryFn: async () => {
  const res = await newRequest.get(
    `/gigs/single/${id}`
  );

  return res.data;
},
  });
 const conversationMutation = useMutation({
  mutationFn: async () => {
    const res = await newRequest.post("/conversations", {
      to: data.userId,
    });

    return res.data;
  },

  onSuccess: (conversation) => {
    navigate(`/message/${conversation.id}`);
  },
});
  const {
  data: dataUser,
  isLoading: isLoadingUser,
  error: errorUser,
} = useQuery({
  queryKey: ["user", data?.userId],
  enabled: !!data?.userId,
  queryFn: async () => {
    const res = await newRequest.get(
      `/users/public/${data.userId}`
    );

    return res.data;
  },
});

  console.log("ID:", id);
console.log("DATA:", data);
console.log("LOADING:", isLoading);
console.log("ERROR:", error);
  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          {isLoading ? ("loading") : error ? ("something went wrong" ):(
          <div className="lg:col-span-2">

            <p className="text-sm text-gray-500 mb-2">
               &gt;  {data?.cat}
            </p>

            <h1 className="text-4xl text-black  font-bold mb-6">
             {data?.title}
            </h1>

            {/* Seller Info */}
          <div className="flex items-center gap-4 mb-8">
  {isLoadingUser ? (
    "Loading..."
  ) : errorUser ? (
    "Something went wrong"
  ) : (
    <>
      <img
        src={
          dataUser?.img ||
          "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg"
        }
        alt={dataUser?.username}
        className="w-14 h-14 rounded-full object-cover"
      />

      <div>
        <h3 className="font-semibold text-lg">
          {dataUser?.username}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.258 5.273c.271 1.137-.964 2.024-1.96 1.425L12 18.354l-4.572 2.826c-.996.6-2.231-.288-1.96-1.425l1.258-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>

          <span className="font-medium text-gray-700">
            {!isNaN(data?.totalStars / data?.starNumber)
              ? (data.totalStars / data.starNumber).toFixed(1)
              : "0.0"}
          </span>
        </div>
      </div>
    </>
  )}
</div>

            {/* Slider */}
          <Swiper
  modules={[Navigation, Pagination]}
  navigation
  pagination={{ clickable: true }}
  className="rounded-2xl overflow-hidden shadow-lg mb-10"
>
  {data?.images?.map((img, index) => (
    <SwiperSlide key={index}>
      <img
        src={img}
        alt={`Gig ${index + 1}`}
        className="w-full h-[500px] object-cover"
      />
    </SwiperSlide>
  ))}
</Swiper>
            {/* About Gig */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl text-black  text-black font-bold mb-4">
                About This Gig
              </h2>

              <p className="text-gray-600 leading-8">
                {data?.desc}
              </p>
            </div>
{isLoadingUser ? (
  <div className="bg-white rounded-2xl shadow-md p-6">
    Loading seller...
  </div>
) : errorUser ? (
  <div className="bg-white rounded-2xl shadow-md p-6 text-red-500">
    Something went wrong
  </div>
) : (
<div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 w-full">
  <h2 className="text-2xl font-bold text-gray-900 mb-8">
    About The Seller
  </h2>

  {/* Header */}
  <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
    <div className="flex items-center gap-5">
      <img
        src={dataUser?.img || "/img/noavatar.png"}
        alt={dataUser?.username}
        className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
      />

      <div>
        <h3 className="text-2xl font-bold text-gray-900">
          {dataUser?.username}
        </h3>

        <p className="text-gray-500">
          Professional Seller
        </p>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.258 5.273c.271 1.137-.964 2.024-1.96 1.425L12 18.354l-4.572 2.826c-.996.6-2.231-.288-1.96-1.425l1.258-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          ))}

         <span className="ml-2 font-semibold text-gray-700">
  {!isNaN(data?.totalStars / data?.starNumber)
    ? (data.totalStars / data.starNumber).toFixed(1)
    : "0.0"}
</span>
        </div>
      </div>
    </div>
{!currentUser?.isSeller &&
 currentUser?._id !== data?.userId && (
  <button
    onClick={() => conversationMutation.mutate()}
    disabled={
      conversationMutation.isPending ||
      isLoadingUser ||
      !data?.userId
    }
    className="px-6 py-3 bg-green-600 text-white rounded-xl"
  >
    {conversationMutation.isPending
      ? "Opening..."
      : "Contact Me"}
  </button>
)}
  </div>

  {/* Stats */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div className="bg-gray-50 p-5 rounded-xl">
      <p className="text-sm text-gray-500">Country</p>
      <p className="font-semibold">{dataUser?.country}</p>
    </div>

    <div className="bg-gray-50 p-5 rounded-xl">
      <p className="text-sm text-gray-500">Member Since</p>
      <p className="font-semibold">
        {new Date(dataUser?.createdAt).getFullYear()}
      </p>
    </div>

    <div className="bg-gray-50 p-5 rounded-xl">
      <p className="text-sm text-gray-500">Response Time</p>
      <p className="font-semibold">1 Hour</p>
    </div>

    <div className="bg-gray-50 p-5 rounded-xl">
      <p className="text-sm text-gray-500">Orders</p>
      <p className="font-semibold">{data?.sales || 0}</p>
    </div>
  </div>

  {/* Description */}
  <div className="border-t pt-6">
    <h4 className="text-lg font-semibold mb-3">
      Seller Description
    </h4>

    <p className="text-gray-600 leading-8">
      {dataUser?.desc ||
        "Experienced freelancer dedicated to delivering high-quality work."}
    </p>
  </div>
</div>
)}
          {/* <Reviews gigId={id}/> */}
   {data && <Reviews gigId={data._id}  currentUser={currentUser} />}
          </div>)}
          {/* RIGHT SIDE */}
          <div>

            <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6">

              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">
                 {data?.shortTitle}
                </h3>

                <h2 className="text-3xl font-bold text-green-600">
                  ${data?.price}
                </h2>
              </div>

              <p className="text-gray-600 mb-6">
               {data?.shortDesc}
              </p>

              <div className="flex justify-between mb-6 text-sm">
                <span>⏰ {data?.deliveryTime} Days Delivery</span>
                <span>🔄 {data?.revisionTime} Revisions</span>
              </div>

              <ul className="space-y-3 mb-6">
  {data?.features?.map((feature, index) => (
    <li key={index}>✅ {feature}</li>
  ))}
</ul>
{!currentUser?.isSeller &&
 currentUser?._id !== data?.userId && (
  <Link to={`/pay/${id}`}>
    <button
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
    >
      Continue
    </button>
  </Link>
)}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Gig;