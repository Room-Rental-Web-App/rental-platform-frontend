import React, { useEffect, useState } from "react";
import { MapPin, Bed, LayoutGrid, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../api/apiConfig"; //
import "../CSS/FeaturedProperties.css";
import MyLoader from "./MyLoader";
const FeaturedProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.FEATURED_ROOMS); //
        setProperties(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <MyLoader data={"Loading featured rooms "} />;

  return (
    <div className="compact-properties-wrapper">
      <div className="compact-three-grid">
        {properties.map((room) => (
          <div
            key={room.id}
            className="small-card"
            onClick={() => navigate(`/room/${room.id}`)}
          >
            <div className="small-img-box">
              <img src={room.imageUrls?.[0] || "/placeholder.jpg"} alt="" />
              <button
                className="small-heart"
                onClick={(e) => e.stopPropagation()}
              >
                <Heart size={16} />
              </button>
            </div>
            <div className="small-details">
              <div className="small-price-row">
                <span className="small-amt">₹{room.price}</span>
                <span className="small-unit">/mo</span>
              </div>
              <h4 className="small-title">{room.title}</h4>
              <p className="small-loc">
                <MapPin size={12} /> {room.city}
              </p>
              <div className="small-footer">
                <span>
                  <Bed size={12} /> {room.roomType}
                </span>
                <span>
                  <LayoutGrid size={12} /> {room.sqft || 0} sqft
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProperties;
