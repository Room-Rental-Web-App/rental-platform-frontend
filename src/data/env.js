export const googleClientId ="1059255546776-6fiqjph21l9v7e7ab0uui6k0u1ocudo4.apps.googleusercontent.com";
export const razorPayKeyId = "rzp_test_1DP5mmOlF5G5ag";

const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

export const API_BASE = isMobile? "http://192.168.1.6:8080/api": "http://localhost:8080/api";
// export const API_BASE =  "http://localhost:8080/api";

