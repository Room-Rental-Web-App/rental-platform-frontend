import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import "../CSS/RazorPayConfig.css";

function RazorPayConfig({
  amountToPay,
  value,
  planCode,
  onSuccess,
  onFailure,
}) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    // Loading Cashfree SDK instead of Razorpay
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      // Initialize Cashfree (Use "sandbox" for testing, "production" for live)
      const cf = window.Cashfree({
        mode: "sandbox",
      });
      setCashfree(cf);
    };
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      // Step 1: Create Order on your Backend
      const response = await Api.post("payment/create-order", {
        amountToPay,
        email,
        role,
        planCode,
      });

      const { paymentSessionId, orderId } = response.data;

      if (!paymentSessionId) {
        throw new Error("Payment Session ID not found");
      }

      // Step 2: Open Cashfree Checkout Modal
      let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(async (result) => {
        // Step 3: Handle Result and Verify
        if (result.error) {
          console.error("Payment Error:", result.error);
          if (onFailure) onFailure("dismissed");
        }

        if (result.paymentDetails || !result.error) {
          try {
            // Verification call to your Spring Boot backend
            const verifyRes = await Api.post("payment/verify", {
              orderId: orderId, // Send orderId to verify status
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
        }
      });
    } catch (err) {
      console.error("Payment Trigger Error:", err);
      if (onFailure) onFailure("create");
    }
  };

  return (
    <button className="upgrade-btn owner big" onClick={handlePayment}>
      {value}
    </button>
  );
}

export default RazorPayConfig;
