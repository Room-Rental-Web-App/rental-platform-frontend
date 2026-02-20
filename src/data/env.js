
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

export const googleClientId = "1059255546776-6fiqjph21l9v7e7ab0uui6k0u1ocudo4.apps.googleusercontent.com";

export const razorPayKeyId = "rzp_test_1DP5mmOlF5G5ag";

const isLocalhost = window.location.hostname === "localhost"

export const API_BASE = isLocalhost ? "http://localhost:8080/api" : "https://api.roomsdekho.in/api";