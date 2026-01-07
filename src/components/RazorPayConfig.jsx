import { useEffect } from "react";
import Api from "../api/Api";

function RazorPayConfig({ amountToPay, value }) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");


  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {

      const res = await Api.post("payment/create-order", {
        amountToPay: amountToPay, currency: "INR"
      })

      const { orderId, razorpayKey } = res.data;

      const options = {
        key: razorpayKey,
        amount: amountToPay * 100,
        currency: "INR",
        name: "RoomsDekho",
        description: "Premium Plan Payment",
        order_id: orderId,
        // call by razorpy only when payment success
        handler: async (response) => {
          await Api.post("payment/verify", {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            username: email,
            role: role,
            amountPaid: amountToPay
          });
          alert("Payment Successful!");
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log(options)
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className="upgrade-btn owner big" onClick={handlePayment}>
      {value}
    </button>

  )
}

export default RazorPayConfig;