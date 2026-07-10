// import React from "react";

// const Add = () => {
//   return (
//     <div className="flex justify-center">
//       <div className="w-full max-w-[1400px] py-[50px] px-4">
        
//         {/* TITLE */}
//         <h1 className="w-fit mb-[30px] text-gray-500 font-light text-3xl">
//           Add New Gig
//         </h1>

//         <div className="flex flex-col lg:flex-row justify-between gap-[100px]">

//           {/* LEFT SECTION */}
//           <div className="flex-1 flex flex-col gap-4">
//             <label className="text-gray-500 text-lg">Title</label>
//             <input
//               type="text"
//               placeholder="e.g. I will do something I'm really good at"
//               className="p-5 border rounded"
//             />

//             <label className="text-gray-500 text-lg">Category</label>
//             <select
//               className="p-5 border rounded"
//               name="cats"
//               id="cats"
//             >
//               <option value="design">Design</option>
//               <option value="web">Web Development</option>
//               <option value="animation">Animation</option>
//               <option value="music">Music</option>
//             </select>

//             <label className="text-gray-500 text-lg">Cover Image</label>
//             <input type="file" className="p-2 border rounded" />

//             <label className="text-gray-500 text-lg">Upload Images</label>
//             <input type="file" multiple className="p-2 border rounded" />

//             <label className="text-gray-500 text-lg">Description</label>
//             <textarea
//               placeholder="Brief descriptions to introduce your service to customers"
//               rows={8}
//               className="p-5 border rounded"
//             />

//             <button className="bg-[#1dbf73] text-white p-5 font-medium text-lg rounded hover:opacity-90">
//               Create
//             </button>
//           </div>

//           {/* RIGHT SECTION */}
//           <div className="flex-1 flex flex-col gap-4">
//             <label className="text-gray-500 text-lg">Service Title</label>
//             <input
//               type="text"
//               placeholder="e.g. One-page web design"
//               className="p-5 border rounded"
//             />

//             <label className="text-gray-500 text-lg">Short Description</label>
//             <textarea
//               placeholder="Short description of your service"
//               rows={6}
//               className="p-5 border rounded"
//             />

//             <label className="text-gray-500 text-lg">
//               Delivery Time (e.g. 3 days)
//             </label>
//             <input type="number" className="p-5 border rounded" />

//             <label className="text-gray-500 text-lg">Revision Number</label>
//             <input type="number" className="p-5 border rounded" />

//             <label className="text-gray-500 text-lg">Add Features</label>
//             <input
//               type="text"
//               placeholder="e.g. page design"
//               className="p-5 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="e.g. file uploading"
//               className="p-5 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="e.g. setting up a domain"
//               className="p-5 border rounded"
//             />
//             <input
//               type="text"
//               placeholder="e.g. hosting"
//               className="p-5 border rounded"
//             />

//             <label className="text-gray-500 text-lg">Price</label>
//             <input type="number" className="p-5 border rounded" />
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Add;

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import toast from "react-hot-toast";
const Add = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [gig, setGig] = useState({
    title: "",
    desc: "",
    cat: "",
    price: "",
    cover: "",
    images: [],
    shortTitle: "",
    shortDesc: "",
    deliveryTime: "",
    revisionTime: "",
    features: [],
  });

  const [feature, setFeature] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    setGig((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addFeature = () => {
    if (!feature.trim()) return;

    setGig((prev) => ({
      ...prev,
      features: [...prev.features, feature],
    }));

    setFeature("");
  };

  const addImage = () => {
    if (!image.trim()) return;

    setGig((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));

    setImage("");
  };

const mutation = useMutation({
  mutationFn: (gigData) =>
    newRequest.post("/gigs", gigData),

  onMutate: () => {
    toast.loading("Creating gig...", {
      id: "createGig",
    });
  },

  onSuccess: (res) => {
    toast.success("Gig created successfully!", {
      id: "createGig",
    });

    onClose();

    setTimeout(() => {
      navigate(`/gig/${res.data._id}`);
    }, 1000);
  },

  onError: (err) => {
    console.log(err.response?.data);

    toast.error(
      err.response?.data?.message ||
        "Failed to create gig",
      {
        id: "createGig",
      }
    );
  },
});

const handleSubmit = (e) => {
  e.preventDefault();

  if (!gig.title.trim()) {
    return toast.error("Title is required");
  }

  if (!gig.cat) {
    return toast.error("Please select a category");
  }

  if (!gig.desc.trim()) {
    return toast.error("Description is required");
  }

  if (!gig.price) {
    return toast.error("Price is required");
  }

  mutation.mutate({
    ...gig,
    price: Number(gig.price),
    deliveryTime: Number(gig.deliveryTime),
    revisionTime: Number(gig.revisionTime),
  });
};
if (!isOpen) return null;
 return (
<div
  className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
  onClick={onClose}
>
    <div
  className="relative bg-white w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl overflow-hidden"
  onClick={(e) => e.stopPropagation()}
>
      {/* Close Button */}
     <button
  onClick={onClose}
  className="absolute top-5 right-5 z-[10000] bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100"
>
  ✕
</button>

      {/* Scrollable Content */}
     <div className="h-full overflow-y-auto ">
        <div className="w-full py-12 px-8">
          <h1 className="text-3xl font-semibold text-gray-700 mb-8">
            Add New Gig
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-20"
          >
            {/* LEFT */}
            <div className="flex-1 flex flex-col gap-4">
              <label>Title</label>
              <input
                name="title"
                onChange={handleChange}
                className="p-4 border rounded"
                placeholder="Gig title"
              />

              <label>Category</label>
              <select
                name="cat"
                onChange={handleChange}
                className="p-4 border rounded"
              >
                <option value="">Select Category</option>
                <option value="ai-artists">AI Artists</option>
                <option value="logo-design">Logo Design</option>
                <option value="wordpress">WordPress</option>
                <option value="web-development">Web Development</option>
                <option value="video-explainer">Video Explainer</option>
                <option value="social-media">Social Media</option>
                <option value="seo">SEO</option>
                <option value="illustration">Illustration</option>
              </select>

              <label>Cover Image URL</label>
              <input
                name="cover"
                onChange={handleChange}
                className="p-4 border rounded"
                placeholder="https://image-url.com"
              />

              <label>Description</label>
              <textarea
                name="desc"
                rows="8"
                onChange={handleChange}
                className="p-4 border rounded"
              />

              <button
                type="submit"
                disabled={mutation.isPending}
                className="bg-[#1dbf73] text-white p-4 rounded disabled:opacity-50"
              >
                {mutation.isPending
                  ? "Creating..."
                  : "Create Gig"}
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex-1 flex flex-col gap-4">
              <label>Service Title</label>
              <input
                name="shortTitle"
                onChange={handleChange}
                className="p-4 border rounded"
              />

              <label>Short Description</label>
              <textarea
                name="shortDesc"
                rows="5"
                onChange={handleChange}
                className="p-4 border rounded"
              />

              <label>Delivery Time</label>
              <input
                type="number"
                name="deliveryTime"
                onChange={handleChange}
                className="p-4 border rounded"
              />

              <label>Revision Number</label>
              <input
                type="number"
                name="revisionTime"
                onChange={handleChange}
                className="p-4 border rounded"
              />

              <label>Price</label>
              <input
                type="number"
                name="price"
                onChange={handleChange}
                className="p-4 border rounded"
              />

              <label>Add Feature</label>

              <div className="flex gap-2">
                <input
                  value={feature}
                  onChange={(e) =>
                    setFeature(e.target.value)
                  }
                  className="flex-1 p-4 border rounded"
                  placeholder="e.g. Responsive Design"
                />

                <button
                  type="button"
                  onClick={addFeature}
                  className="bg-blue-500 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              {gig.features.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded"
                >
                  {item}
                </div>
              ))}

              <label>Additional Image URL</label>

              <div className="flex gap-2">
                <input
                  value={image}
                  onChange={(e) =>
                    setImage(e.target.value)
                  }
                  className="flex-1 p-4 border rounded"
                  placeholder="https://image-url.com"
                />

                <button
                  type="button"
                  onClick={addImage}
                  className="bg-blue-500 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              {gig.images.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded break-all"
                >
                  {item}
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default Add;