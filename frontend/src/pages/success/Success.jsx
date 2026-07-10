import { useEffect } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

export const Success = () => {
  const { search } = useLocation();
const navigate = useNavigate();
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const payment_intent = new URLSearchParams(search).get(
          "payment_intent"
        );

        await newRequest.put("/orders", {
          payment_intent,
        });
        setTimeout(() => {
         
        navigate("/orders") 
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, [search]);

  return <div>Payment successful!</div>;
};