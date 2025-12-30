import React, { useEffect, useState } from "react";
import Api from "../api/Api";
import { Star } from "lucide-react";
import "../css/reviews.css";

function Reviews({ roomId }) {
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (roomId) loadReviews();
  }, [roomId]);

  const loadReviews = async () => {
    const res = await Api.get(`/reviews/room/${roomId}`);
    setReviews(res.data.reviews);
    setAvg(res.data.averageRating);
  };

  const submitReview = async () => {
    if (!email) return alert("Login first");
    if (!rating) return alert("Select rating");
    if (!comment.trim()) return alert("Write comment");

    await Api.post("/reviews/add", {
      userEmail: email,
      roomId,
      rating,
      comment
    });

    setRating(0);
    setComment("");
    loadReviews();
  };

  return (
    <div className="reviews-box">

      <h2>
        Guest Reviews
        <span className="avg">
          {avg.toFixed(1)} <Star size={16} fill="#facc15" />
        </span>
      </h2>

      {/* WRITE REVIEW */}
      <div className="write-review">
        <h3>Write your review</h3>

        <div className="star-input">
          {[1,2,3,4,5].map(i => (
            <Star
              key={i}
              size={26}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(i)}
              fill={(hover || rating) >= i ? "#facc15" : "none"}
            />
          ))}
        </div>

        <textarea
          placeholder="Share your experience..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>
      </div>

      {/* VIEW REVIEWS */}
      {reviews.length === 0 && <p className="no-review">No reviews yet.</p>}

      {reviews.map(r => (
        <div key={r.id} className="review-card">
          <div className="review-header">
            <strong>{r.userEmail}</strong>
            <div className="stars">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={14} fill={i <= r.rating ? "#facc15" : "none"} />
              ))}
            </div>
          </div>

          <p className="comment">{r.comment}</p>
          <span className="date">{new Date(r.createdAt).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
}

export default Reviews;
