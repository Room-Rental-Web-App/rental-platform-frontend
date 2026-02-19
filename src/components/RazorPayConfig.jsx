import React, { useEffect } from "react";
import Api from "../api/Api";
import "../CSS/RazorPayConfig.css";

// Props mein 'onSuccess' aur 'planCode' add kiya hai
function RazorPayConfig({ amountToPay, value, planCode, onSuccess }) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      // Backend ko batao kaunsa plan le raha hai user
      const order = await Api.post("payment/create-order", {
        amountToPay,
        currency: "INR",
        email,
        role,
        planCode, // Plan identification ke liye important hai
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
          try {
            const verifyRes = await Api.post("payment/verify", {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              email,
              role,
              amountToPay,
              planCode,
            });

            if (verifyRes.status === 200) {
              alert("Congratulations! Payment Successful.");
              if (onSuccess) {
                onSuccess();
              }
            }
          } catch (verifyErr) {
            console.error("Verification failed", verifyErr);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: { email: email },
        theme: { color: "#4f46e5" }, // Matching your indigo theme
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment could not start. Please try again.");
    }
  };

  return (
    <button className="upgrade-btn owner big" onClick={handlePayment}>
      {value}
    </button>
  );
}

export default RazorPayConfig;
