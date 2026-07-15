import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "../loginModal/LoginModal";
import axios from "axios";
import toast from "react-hot-toast";
import Add from "../addGigModal/AddGigModal";
import newRequest from "../../utils/newRequest";
function Navbar() {
  const navigate = useNavigate();
  const [authModal, setAuthModal] = useState({
  open: false,
  mode: "login",
});
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
const [gigModalOpen, setGigModalOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const isActive = () => {
      setActive(window.scrollY > 0);
    };

    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

const currentUser = JSON.parse(
  localStorage.getItem("currentUser")
);
const handleLogout = async () => {
  const toastId = toast.loading("Logging out...");

  try {
    const res = await newRequest.post("/auth/logout", 
      {},
      {
        withCredentials: true,
      }
    );

    localStorage.removeItem("currentUser");

    toast.success("Logged out successfully!", {
      id: toastId,
    });

    setOpen(false);

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1000);

  } catch (err) {
    console.log(err);

    toast.error("Failed to logout", {
      id: toastId,
    });
  }
};

  return (
    <div
      className={`sticky top-0 z-[999] flex flex-col items-center transition-all duration-500 ${
        active || pathname !== "/"
          ? "bg-white text-black shadow-sm"
          : "bg-[#013914] text-white"
      }`}
    >
      {/* Navbar */}
      <div className="max-w-[1400px] w-full px-6 flex items-center justify-between py-5">
        
        {/* Logo */}
     <Link
  to={currentUser?.isSeller ? "/seller-dashboard" : "/"}
>
  <span>Fiverr</span>
  <span className="text-[#1dbf73]">.</span>
</Link>

        {/* Links */}
        <div className="flex items-center gap-6 font-medium">
          <span className="hidden lg:block whitespace-nowrap">
            Fiverr Business
          </span>
          <span className="hidden lg:block whitespace-nowrap">Explore</span>
          <span className="hidden md:block whitespace-nowrap">English</span>

        <LoginModal
  isOpen={authModal.open}
  mode={authModal.mode}
  onClose={() =>
    setAuthModal({
      open: false,
      mode: "login",
    })
  }
/>
<Add
  isOpen={gigModalOpen}
  onClose={() => setGigModalOpen(false)}
/>

          {!currentUser?.isSeller && (
            <span className="hidden lg:block whitespace-nowrap">
              Become a Seller
            </span>
          )}
{currentUser ? (
<div className="relative">
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => setOpen((prev) => !prev)}
  >
   {currentUser?.img ? (
    <img
      src={currentUser.img}
      alt={currentUser.username}
      className="w-10 h-10 rounded-full object-cover border border-gray-200"
    />
  ) : (
    <div
      className="
        w-10
        h-10
        rounded-full
        bg-[#7d0c27]
        text-white
        flex
        items-center
        justify-center
        font-bold
        text-lg
        shadow-md
      "
    >
      {currentUser?.username?.charAt(0).toUpperCase()}
    </div>
  )}


    <span>{currentUser.username}</span>

  {open && (
  <div className="absolute top-12 right-0 w-52 bg-white text-gray-600 shadow-lg rounded-lg p-4 flex flex-col gap-3">
    
    {currentUser.isSeller && (
      <>
        <Link className="hover:text-[#1dbf73]"  to="/myGigs">My Gigs</Link>
        <button
  onClick={() => {
    setGigModalOpen(true);
    setOpen(false);
  }}
  className="text-center hover:text-[#1dbf73]"
>
  Add New Gig
</button>
      </>
    )}

    <Link className="hover:text-[#1dbf73]" to="/orders">Orders</Link>
    <Link className="hover:text-[#1dbf73]"  to="/messages">Messages</Link>

 <button
  onClick={handleLogout}
  className="w-full text-center text-red-500 font-medium"
>
  Logout
</button>
  </div>
)}
  </div>
  </div>
) : (
<>
 <button
  onClick={() =>
    setAuthModal({
      open: true,
      mode: "login",
    })
  }
>
  Sign In
</button>

  
  <button
  onClick={() =>
    setAuthModal({
      open: true,
      mode: "register",
    })
  }
  className={`px-5 py-2 rounded border transition-all ${
    active || pathname !== "/"
      ? "bg-white text-[#1dbf73] border-[#1dbf73]"
      : "border-white text-white"
  }`}
>
  Join
</button>
</>
)}
        </div>
      </div>

      {/* Categories Menu */}
      {(active || pathname !== "/") && (
        <>
          <hr className="w-full border-gray-200" />

          <div className="max-w-[1400px] w-full px-6 py-3 hidden lg:flex justify-between text-gray-500 font-light">
            <Link to="/">Graphics & Design</Link>
            <Link to="/">Video & Animation</Link>
            <Link to="/">Writing & Translation</Link>
            <Link to="/">AI Services</Link>
            <Link to="/">Digital Marketing</Link>
            <Link to="/">Music & Audio</Link>
            <Link to="/">Programming & Tech</Link>
            <Link to="/">Business</Link>
            <Link to="/">Lifestyle</Link>
          </div>

          <hr className="w-full border-gray-200" />
        </>
      )}
    </div>
  );
}

export default Navbar;
