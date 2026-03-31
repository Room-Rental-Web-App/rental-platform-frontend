import { useEffect, useState } from "react";
import Api from "../api/Api";

export default function useRazorPay(onSuccess, onFailure) {
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const [cashfree, setCashfree] = useState(null);

  useEffect(() => {
    if (document.querySelector('script[src*="cashfree.com"]')) return;
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.async = true;
    script.onload = () => {
      setCashfree(window.Cashfree({ mode: "production" }));
    };
    document.body.appendChild(script);
  }, []);

  const triggerPayment = async ({ amountToPay, planCode }) => {
    if (!cashfree) return;

    try {
      const order = await Api.post("payment/create-order", {
        amountToPay,
        email,
        role,
        planCode,
      });

      const { paymentSessionId, orderId } = order.data;

      cashfree
        .checkout({
          paymentSessionId,
          redirectTarget: "_modal",
        })
        .then(async (result) => {
          // result.error is null if payment process completes
          if (result.error) {
            if (onFailure) onFailure("dismissed");
            return;
          }

          // Always verify with backend after modal interaction
          try {
            const verifyRes = await Api.post("payment/verify", {
              orderId,
              email,
              role,
              amountToPay,
              planCode,
            });

            if (verifyRes.status === 200 && onSuccess) {
              onSuccess(); // Ensure this handles your navigation
            }
          } catch (err) {
            console.error("Verification failed", err);
            if (onFailure) onFailure("verify");
          }
        });
    } catch (err) {
      console.error("Error:", err);
      if (onFailure) onFailure("create");
    }
  };

  return { triggerPayment };
}
