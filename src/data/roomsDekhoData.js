import {
  Shield, Clock, Star, TrendingUp, Users, CheckCircle
} from "lucide-react";

export const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'];
export const propertyTypes = ['Apartment', 'Villa', 'Studio', 'PG', 'Independent House'];

export const featuredProperties = [
  { id: 1, title: '2BHK Luxury Apartment', location: 'Bandra West, Mumbai', price: '₹35,000', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop', rating: 4.8, beds: 2, baths: 2, sqft: 1200, type: 'Apartment' },
  { id: 2, title: 'Cozy Studio Near Metro', location: 'Koramangala, Bangalore', price: '₹18,000', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop', rating: 4.6, beds: 1, baths: 1, sqft: 450, type: 'Studio' },
  { id: 3, title: '3BHK Family Home', location: 'Gurgaon, Delhi NCR', price: '₹45,000', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop', rating: 4.9, beds: 3, baths: 2, sqft: 1800, type: 'Villa' },
  { id: 4, title: 'Premium PG Accommodation', location: 'HSR Layout, Bangalore', price: '₹12,000', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop', rating: 4.5, beds: 1, baths: 1, sqft: 200, type: 'PG' },
  { id: 5, title: 'Spacious 4BHK Penthouse', location: 'Worli, Mumbai', price: '₹85,000', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop', rating: 4.9, beds: 4, baths: 3, sqft: 2500, type: 'Apartment' },
  { id: 6, title: 'Modern 1BHK Flat', location: 'Whitefield, Bangalore', price: '₹22,000', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop', rating: 4.7, beds: 1, baths: 1, sqft: 650, type: 'Apartment' },
];

export const features = [
  { icon: Shield, title: 'Verified Properties', desc: 'Every property is thoroughly verified by our team to ensure authenticity and safety for our users.' },
  { icon: Clock, title: 'Quick Process', desc: 'Our streamlined booking process lets you find and secure your dream home within minutes.' },
  { icon: Star, title: 'Top Rated', desc: 'Trusted by over 100,000 happy tenants with an average rating of 4.7 stars.' },
  { icon: TrendingUp, title: 'Best Prices', desc: 'We guarantee the most competitive rental rates with transparent pricing and no hidden costs.' },
  { icon: Users, title: 'Expert Support', desc: 'Our dedicated support team is available 24/7 to assist you with any queries or concerns.' },
  { icon: CheckCircle, title: 'Easy Documentation', desc: 'Hassle-free documentation process with digital agreements and secure payment options.' },
];

export const testimonials = [
  { name: 'Priya Sharma', role: 'Software Engineer', city: 'Bangalore', text: 'RoomsDekho made my apartment hunting so easy! Found my perfect 2BHK in just 2 days. The verification process gave me complete peace of mind.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { name: 'Rahul Mehta', role: 'Marketing Manager', city: 'Mumbai', text: 'Excellent service! The team was very professional and helped me negotiate a great deal. Highly recommend RoomsDekho for anyone looking for rental properties.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { name: 'Sneha Patel', role: 'Student', city: 'Pune', text: 'As a student, finding affordable PG accommodation was tough until I discovered RoomsDekho. Great options and transparent pricing!', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];

export const cities_popular = [
  { name: 'Mumbai', properties: '5,000+', image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=300&h=200&fit=crop' },
  { name: 'Bangalore', properties: '4,500+', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&h=200&fit=crop' },
  { name: 'Delhi NCR', properties: '6,000+', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=200&fit=crop' },
  { name: 'Pune', properties: '3,000+', image: 'https://images.unsplash.com/photo-1566983008165-a671eb97d0dc?w=300&h=200&fit=crop' },
];

export const stats = [
  { number: '100K+', label: 'Happy Customers' },
  { number: '25K+', label: 'Properties Listed' },
  { number: '50+', label: 'Cities Covered' },
  { number: '4.8', label: 'Average Rating' },
];

export const howItWorks = [
  { step: '1', title: 'Search Properties', desc: 'Browse through thousands of verified listings in your preferred location and budget range.' },
  { step: '2', title: 'Schedule Visit', desc: 'Book a property viewing at your convenience with our easy scheduling system.' },
  { step: '3', title: 'Complete Documentation', desc: 'Submit required documents online and complete the verification process securely.' },
  { step: '4', title: 'Move In', desc: 'Get your keys and move into your new home with complete peace of mind.' },
];


export const premiumOwnerFeatures = [
  "Top position in search",
  "Priority direct contact",
  "Featured owner badge",
  "Spam / fake lead protection",
  "Unlimited room listings",
  "Verified owner badge",
  "3–5x more enquiries"
];

export const premiumPlans = {
  "7D_OWNER": {
    name: "Starter Plan",
    duration: "7 Days",
    roomLimit: 3,
    features: [
      "Top position in search (7 Days)",
      "Add up to 3 rooms",
      "Verified owner badge",
      "Priority direct contact",
      "Spam protection",
    ],
  },
  "30D_OWNER": {
    name: "Professional Plan",
    duration: "30 Days",
    roomLimit: 6,
    features: [
      "Top position in search (30 Days)",
      "Add up to 6 rooms",
      "Featured owner badge",
      "Priority direct contact",
      "3x more enquiries",
    ],
  },
  "180D_OWNER": {
    name: "Business Plan",
    duration: "180 Days",
    roomLimit: 15,
    features: [
      "Top position in search (6 Months)",
      "Add up to 15 rooms",
      "Featured owner badge",
      "Priority direct contact",
      "5x more enquiries",
      "Spam / fake lead protection",
    ],
  },
  "365D_OWNER": {
    name: "Enterprise Plan",
    duration: "1 Year",
    roomLimit: 40,
    features: [
      "Top position in search (Full Year)",
      "Add up to 40 rooms",
      "Verified + Featured badge",
      "Priority direct contact",
      "Max visibility & enquiries",
      "Dedicated support",
    ],
  },
};
// Keeping your original prices, just adding descriptive labels for the UI
export const premiumOwnerPlans = [
  { label: "Trial Boost", amount: 99, duration: "7 Days", code: "OWNER_TRIAL", note: "Quick visibility" },
  { label: "1 Month Premium", amount: 199, duration: "1 Month", code: "OWNER_1M", note: "Standard" },
  { label: "6 Months Premium", amount: 999, duration: "6 Months", code: "OWNER_6M", isPopular: true, save: "16% Off" },
  { label: "1 Year Premium", amount: 1499, duration: "1 Year", code: "OWNER_12M", save: "25% Off" }
];

export const premiumUserPlans = [
  { label: "1 Month Premium", amount: 69, duration: "1 Month", code: "USER_1M", note: "Basic access" },
  { label: "6 Months Premium", amount: 299, duration: "6 Months", code: "USER_6M", isPopular: true, save: "15% Off" },
  { label: "1 Year Premium", amount: 499, duration: "1 Year", code: "USER_12M", save: "25% Off" }
];

// Add this at the end of your roomsDekhoData.js
export const premiumUserFeatures = [
  "View Unlimited Owner Contacts",
  "Instant Notifications for New Rooms",
  "Priority Support 24/7",
  "Early Access to Hot Deals",
  "No Advertisements"
];
export const ISSUE_LABELS = {
  PAYMENT: "Payment",
  REFUND: "Refund",
  INVOICE: "Invoice",

  ROOM_LISTING: "Room Listing",
  ROOM_UNAVAILABLE: "Room Not Available",
  ROOM_CONDITION: "Room Condition Issue",
  FAKE_LISTING: "Fake Listing",
  PRICE_MISMATCH: "Price Mismatch",

  OWNER_PROBLEM: "Owner Problem",
  OWNER_NOT_RESPONDING: "Owner Not Responding",
  USER_BEHAVIOR: "User Behavior Issue",

  BOOKING_ISSUE: "Booking Issue",
  CHECK_IN_PROBLEM: "Check-in Problem",
  CHECK_OUT_PROBLEM: "Check-out Problem",
  CANCELLATION: "Cancellation",

  ACCOUNT: "Account Issue",
  LOGIN_ISSUE: "Login Issue",
  VERIFICATION_ISSUE: "Verification Issue",
  PROFILE_UPDATE: "Profile Update",

  APP_BUG: "App Bug",
  PAYMENT_FAILURE: "Payment Failed",
  NOTIFICATION_ISSUE: "Notification Issue",

  SAFETY_CONCERN: "Safety Concern",
  FRAUD_REPORT: "Fraud Report",
  POLICY_VIOLATION: "Policy Violation",

  OTHER: "Other"
};





