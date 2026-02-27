import { useEffect } from "react";
import Api from "../api/Api";

/**
 * useRazorPay
 * Razorpay script load karta hai aur ek `triggerPayment` function return karta hai
 * jo directly call kiya ja sakta hai (e.g., T&C accept hone ke baad)
 *
 * @param {Function} onSuccess - Payment + verify success pe call hota hai
 * @param {Function} onFailure - Koi bhi failure pe call hota hai ("create" | "verify" | "dismissed")
 */
export default function useRazorPay(onSuccess, onFailure) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (document.querySelector('script[src*="checkout.razorpay.com"]')) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const triggerPayment = async ({ amountToPay, planCode }) => {
    try {
      const order = await Api.post("payment/create-order", {
        amountToPay,
        currency: "INR",
        email,
        role,
        planCode,
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
              if (onSuccess) onSuccess();
            }
          } catch (verifyErr) {
            console.error("Verification failed", verifyErr);
            if (onFailure) onFailure("verify");
          }
        },
        modal: {
          ondismiss: () => {
            if (onFailure) onFailure("dismissed");
          },
        },
        prefill: { email },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      if (onFailure) onFailure("create");
    }
  };

  return { triggerPayment };
}
