// src/apiConfig.js
const BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  // Auth Endpoints
  REGISTER_REQUEST: `${BASE_URL}/auth/register-request`,
  LOGIN_REQUEST: `${BASE_URL}/auth/login-request`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,

  // Room Endpoints
  ADD_ROOM: `${BASE_URL}/rooms/add`,
  UPDATE_ROOM: (id) => `${BASE_URL}/rooms/update/${id}`,
  DELETE_ROOM: (id) => `${BASE_URL}/rooms/delete/${id}`,
  MY_LISTINGS: `${BASE_URL}/rooms/my-listings`,
  SEARCH_ROOMS: `${BASE_URL}/rooms/search`,
  // Admin Endpoints
  ADMIN_ALL_USERS: `${BASE_URL}/admin/users`,
  ADMIN_ALL_ROOMS: `${BASE_URL}/admin/rooms`,
  ADMIN_ALL_OWNERS: `${BASE_URL}/admin/owners`,
  DELETE_USER: (id) => `${BASE_URL}/admin/users/${id}`,
  // Add these in your API_ENDPOINTS inside apiConfig.js
  ADMIN_PENDING_OWNERS: `${BASE_URL}/admin/pending-owners`,
  APPROVE_OWNER: (id) => `${BASE_URL}/admin/approve-owner/${id}`,
  REJECT_OWNER: (id) => `${BASE_URL}/admin/reject-owner/${id}`,
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
