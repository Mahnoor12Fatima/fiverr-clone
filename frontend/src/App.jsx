import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import MyGigs from "./pages/myGigs/MyGigs";
import { QueryClient, QueryClientProvider,useQuery } from '@tanstack/react-query';
import { Pay } from "./pages/pay/Pay";
import { Success } from "./pages/success/Success";
import SellerDashboard from "./pages/sellerdashboard/SellerDadhboard";
import { Toaster } from "react-hot-toast";
function App() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
      <Navbar />
<Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* GIGS */}
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gig/:id" element={<Gig />} />

        {/* USER GIGS */}
        <Route path="/myGigs" element={<MyGigs />} />
        
        {/* ORDERS */}
        <Route path="/orders" element={<Orders />} />

        {/* MESSAGES */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/message/:id" element={<Message />} />
        
        <Route path="/pay/:id" element={<Pay />} />
        <Route path="/success" element={<Success />} />
        <Route
  path="/seller-dashboard"
  element={<SellerDashboard />}
/>
 

        {/* AUTH */}
       
      </Routes>

      <Footer />
      </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
