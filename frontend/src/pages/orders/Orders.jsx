import React from "react";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const currentUser=JSON.parse(localStorage.getItem("currentUser"));
  const navigate=useNavigate();
  const { data = [], isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await newRequest.get("/orders");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading orders</div>;
  }
const handleContact=async(order)=>{
const sellerId=order.sellerId;
const buyerId=order.buyerId;
const id=sellerId+buyerId;
try{

const res=await newRequest.get(`/conversations/single/${id}`);
navigate(`/message/${res.data.id}`)
}
catch(err){
 if (err.response?.status === 404) {
    
const res=await newRequest.post(`/conversations/`,{to:currentUser.isSeller?buyerId:sellerId});
navigate(`/message/${res.data.id}`)
  }
}
}
  return (
    <div className="flex justify-center text-gray-600">
      <div className="w-full max-w-[1400px] py-[50px] px-4">
        {/* TITLE */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-medium">Orders</h1>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="h-[50px] text-left border-b">
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>

            <tbody>
              {data.map((order) => (
                <tr
                  key={order._id}
                  className="border-b h-[60px]"
                >
                  <td>
                    <img
                      src={order.img}
                      alt={order.title}
                      className="w-[50px] h-[25px] object-cover"
                    />
                  </td>

                  <td>{order.title}</td>

                  <td>${order.price}</td>

                  <td>
                    <img
                    onClick={()=>handleContact(order)}
                      src="/img/message.png"
                      alt="message"
                      className="w-6 h-6 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;