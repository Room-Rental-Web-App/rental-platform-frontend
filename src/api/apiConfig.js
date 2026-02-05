// src/apiConfig.js

const isLocal = window.location.hostname === "localhost"; 
const BASE_URL = isLocal ? "http://localhost:8080/api" : "https://rental-platform-backend-esyq.onrender.com/api";

export const API_ENDPOINTS = {
  // Auth Endpoints
  REGISTER_REQUEST: `${BASE_URL}/auth/register-request`,
  LOGIN_REQUEST: `${BASE_URL}/auth/login-request`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  GOOGLE_LOGIN: `${BASE_URL}/auth/google-login`,

  // Room Endpoints
  ADD_ROOM: `${BASE_URL}/rooms/add`,
  UPDATE_ROOM: (id) => `${BASE_URL}/rooms/update/${id}`,
  UPDATE_ROOM_Availability: (id,status) => `${BASE_URL}/rooms/update-status/${id}/${status}`,
  DELETE_ROOM: (id) => `${BASE_URL}/rooms/delete/${id}`,
  MY_LISTINGS: `${BASE_URL}/rooms/my-listings`,
  SEARCH_ROOMS: `${BASE_URL}/rooms/search`,
  FEATURED_ROOMS: `${BASE_URL}/rooms/featured`,
  REVIEWS_TOP: `${BASE_URL}/reviews/top`,
  // Admin Endpoints
  ADMIN_ALL_USERS: `${BASE_URL}/admin/users`,
  ADMIN_ALL_ROOMS: `${BASE_URL}/admin/rooms`,
  ADMIN_ALL_OWNERS: `${BASE_URL}/admin/owners`,
  DELETE_USER: (id) => `${BASE_URL}/admin/users/${id}`,
  DELETE_ROOM_ADMIN: (id) => `${BASE_URL}/admin/rooms/${id}`,
  ADMIN_PENDING_OWNERS: `${BASE_URL}/admin/pending-owners`,
  ADMIN_PENDING_USERS: `${BASE_URL}/admin/pending-users`,
  CITIES_COVERED: `${BASE_URL}/rooms/cities`,
  APPROVE_OWNER: (id) => `${BASE_URL}/admin/approve-owner/${id}`,
  REJECT_OWNER: (id) => `${BASE_URL}/admin/reject-owner/${id}`,
  ADMIN_PENDING_ROOMS: `${BASE_URL}/admin/pending-rooms`,
  APPROVE_ROOM: (id) => `${BASE_URL}/admin/approve-room/${id}`,
  REJECT_ROOM: (id) => `${BASE_URL}/admin/reject-room/${id}`,
  ADMIN_HIGH_INTEREST: `${BASE_URL}/admin/high-interest-rooms`,
  ADMIN_MARK_BOOKED: (id) => `${BASE_URL}/admin/mark-booked/${id}`,
  // Wishlist Endpoints
  WISHLIST_ADD: (roomId) => `${BASE_URL}/wishlist/${roomId}`,
  WISHLIST_REMOVE: (roomId) => `${BASE_URL}/wishlist/${roomId}`,
  WISHLIST_GET: `${BASE_URL}/wishlist`,
  WISHLIST_COUNT: `${BASE_URL}/wishlist/count`,

  GET_ROOM_BY_ID: (id) => `${BASE_URL}/rooms/${id}`,
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};
