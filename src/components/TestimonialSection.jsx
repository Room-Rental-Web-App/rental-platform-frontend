import React, { useEffect, useState } from "react";
import { Star, User } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiConfig";
import "../CSS/TestimonialSection.css";

const TestimonialSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeReviews = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.REVIEWS_TOP);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home reviews:", error);
        setLoading(false);
      }
    };
    fetchHomeReviews();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? "#fbbf24" : "none"}
        color="#fbbf24"
      />
    ));
  };

  if (loading || reviews.length === 0) return null;

  return (
    <section className="testimonial-section-wrapper">
      <div className="section-header-compact">
        <h2>What Our Renters Say</h2>
      </div>
      <div className="testimonial-grid-three">
        {reviews.map((rev) => (
          <div key={rev.id} className="testimonial-card-small">
            <div className="renter-info-compact">
              {/* Kyunki aapke model mein avatar nahi hai, hum icon use karenge */}
              <div className="avatar-placeholder">
                <User size={20} />
              </div>
              <div className="renter-meta">
                {/* Email ka pehla part as Name dikhayenge (e.g. 'ram' from 'ram@gmail.com') */}
                <p className="renter-name-small">
                  {rev.userEmail.split("@")[0]}
                </p>
                <div className="renter-rating-small">
                  {renderStars(rev.rating)}
                </div>
              </div>
            </div>
            {/* Model mein field ka naam 'comment' hai */}
            <p className="renter-quote-small">"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
