
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import newRequest from "../../utils/newRequest";

const LoginModal = ({ isOpen, onClose, mode }) => {
  const [showPassword, setShowPassword] = useState(false);
const [file,setFile]=useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    img: "",
    role: "customer",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
const uploadImage = async () => {
  if (!formData.img) return "";

  const data = new FormData();
  data.append("file", formData.img);
  data.append("upload_preset", "fiverr");

  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dgg71trrt/image/upload",
    data
  );

  return res.data.secure_url;
};
const handleSubmit = async (e) => {
  e.preventDefault();

  const toastId = toast.loading(
    mode === "login"
      ? "Signing in..."
      : "Creating account..."
  );

  try {
    if (mode === "login") {
      
          const res = await newRequest.post("/auth/login", {
          username: formData.username,
          password: formData.password,
        }
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data.user)
      );

      toast.success("Login successful!", {
        id: toastId,
      });

      onClose();

      setTimeout(() => {
        if (res.data.user.isSeller) {
          window.location.href =
            "/seller-dashboard";
        } else {
          window.location.href = "/";
        }
      }, 1000);
    } else {
      const imageUrl = await uploadImage();

     await newRequest.post("/auth/register", {
          ...formData,
          img: imageUrl,
        }
      );

      toast.success(
        "Registration successful! Please login.",
        {
          id: toastId,
        }
      );

      onClose();
    }
  } catch (err) {
    console.log(err.response?.data);

    toast.error(
      err.response?.data?.message ||
        "Something went wrong",
      {
        id: toastId,
      }
    );
  }
};

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="h-full flex">
          {/* LEFT SIDE */}
          <div className="hidden lg:flex lg:w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="team"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-green-700/90 to-black/70" />

            <div className="relative z-10 flex flex-col justify-center px-14 text-white">
              <h1 className="text-5xl font-extrabold leading-tight mb-8">
                Success
                <br />
                Starts Here
              </h1>

              <div className="space-y-5">
                {[
                  "Over 700 Categories",
                  "Quality work done faster",
                  "Access to talent worldwide",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <span className="text-lg">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 bg-white">
            <div className="h-full overflow-y-auto">
              <div className="max-w-md mx-auto px-8 py-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {mode === "login"
                    ? "Welcome Back"
                    : "Create Account"}
                </h2>

                <p className="text-gray-500 mb-5">
                  {mode === "login"
                    ? "Sign in to continue"
                    : "Join our marketplace today"}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  {/* Username */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0"
                        />
                      </svg>
                    </div>

                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleChange}
                      className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:border-[#7d0c27] focus:ring-2 focus:ring-[#7d0c27]/20 outline-none transition"
                    />
                  </div>

                  {/* EMAIL */}
                  {mode === "register" && (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75L12 13.5 2.25 6.75"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 6.75h18v10.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25V6.75z"
                          />
                        </svg>
                      </div>

                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full h-12 pl-11 pr-4 rounded-lg border border-gray-300 focus:border-[#7d0c27] focus:ring-2 focus:ring-[#7d0c27]/20 outline-none transition"
                      />
                    </div>
                  )}

                  {/* PASSWORD */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.8}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 10.5h15v9h-15z"
                        />
                      </svg>
                    </div>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      className="w-full h-12 pl-11 pr-12 rounded-lg border border-gray-300 focus:border-[#7d0c27] focus:ring-2 focus:ring-[#7d0c27]/20 outline-none transition"
                    />

                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3l18 18"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.8}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>

                  {/* REGISTER ONLY */}
                  {mode === "register" && (
                    <>
                 <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setFormData((prev) => ({
      ...prev,
      img: e.target.files[0],
    }))
  }
/>
<input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  onChange={handleChange}
  className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#7d0c27] focus:ring-2 focus:ring-[#7d0c27]/20 outline-none transition"
/>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#7d0c27] focus:ring-2 focus:ring-[#7d0c27]/20 outline-none transition"
                      />

                      <select
                        name="role"
                        onChange={handleChange}
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-[#7d0c27] focus:ring-2 focus:ring-[#7d0c27]/20 outline-none transition"
                      >
                        <option value="customer">
                          Customer
                        </option>
                        <option value="seller">
                          Seller
                        </option>
                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    </>
                  )}

                  {mode === "login" && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="text-sm text-[#7d0c27] font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full h-12 rounded-lg  text-white font-semibold bg-[#1dbf73] hover:bg-[#17a463]  transition"
                  >
                    {mode === "login"
                      ? "Sign In"
                      : "Create Account"}
                  </button>

                 

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

