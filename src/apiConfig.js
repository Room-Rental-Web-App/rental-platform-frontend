// Base URL - In future sirf ye change karke aap pura project server pe daal sakte hain
export const BASE_URL = "http://localhost:8080/api/auth";

// Endpoints mapping
export const API_ENDPOINTS = {
  REGISTER_REQUEST: `${BASE_URL}/register-request`,
  LOGIN_REQUEST: `${BASE_URL}/login-request`,
  VERIFY_OTP: `${BASE_URL}/verify-otp`,
};
