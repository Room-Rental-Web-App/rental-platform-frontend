import React from "react";
import { Star } from "lucide-react";
// import avatarImg from "../../assets/avatar-placeholder.jpg"; 

const testimonials = [
  {
    id: 1,
    name: "Anjali S.",
    // avatar: avatarImg,
    quote: "Found a great PG near my college! Seamless experience.",
    rating: 5,
  },
  {
    id: 2,
    name: "Dosmar S.",
    // avatar: avatarImg,
    quote: "Easy to use platform, very helpful customer support.",
    rating: 4,
  },
  {
    id: 3,
    name: "Rohan M.",
    // avatar: avatarImg,
    quote: "Saved a lot on brokerage, directly connected with owner.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        fill={i < rating ? "var(--warning)" : "none"}
        stroke={i < rating ? "var(--warning)" : "var(--text-tertiary)"}
      />
    ));
  };

  return (
    <section className="testimonial-section-wrapper">
      <div className="section-header">
        <h2>What Our Renters Say</h2>
        <p>Hear from our happy customers.</p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="renter-info">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="renter-avatar"
              />
              <p className="renter-name">{testimonial.name}</p>
            </div>
            <p className="renter-quote">"{testimonial.quote}"</p>
            <div className="renter-rating">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
