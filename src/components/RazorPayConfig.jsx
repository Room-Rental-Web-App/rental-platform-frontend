import { useEffect, useState } from "react";
import Api from "../api/Api";
import usePremiumStatus from "../customHook/usePremiumStatus";

function RazorPayConfig({ amountToPay, value }) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const { isPremiumUser } = usePremiumStatus();


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);


 

  const handlePayment = async () => {
    try {

      if (isPremiumUser) {
        const confirmExtend = window.confirm(
          "You already have an active premium plan. Do you want to extend it?"
        );
        if (!confirmExtend) return;
      }

      // Continue payment
      const order = await Api.post("payment/create-order", {
        amountToPay,
        currency: "INR",
        email,
        role
      });

      const { orderId, razorpayKey } = order.data;

      const options = {
        key: razorpayKey,
        amount: amountToPay * 100,
        currency: "INR",
        name: "RoomsDekho",
        description: "Premium Plan Payment",
        order_id: orderId,
        handler: async (response) => {
          await Api.post("payment/verify", {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            email,
            role,
            amountToPay
          });
          alert("Payment Successful!");
          window.location.reload();
        },
        theme: { color: "#3399cc" },
      };

      new window.Razorpay(options).open();

    } catch (err) {
      console.error(err);
      alert("Payment could not start.");
    }
  };

  return (
    <button className="upgrade-btn owner big" onClick={handlePayment}>
      {isPremiumUser ? "Extend Premium Plan" : value}
    </button>
  );
}

export default RazorPayConfig;
