import React from "react";
import { MapPin, Bed, Bath, LayoutGrid, Heart } from "lucide-react";
// import roomImg from "../../assets/room-placeholder.jpg"; // Example room image

const properties = [
  {
    id: 1,
    // image: roomImg,
    title: "Cozy Studio in Hitech City",
    price: "₹12,000/month",
    location: "Gachibowli, Hyderabad",
    beds: 2,
    baths: 1,
    area: "850 sqft",
    verified: true,
  },
  {
    id: 2,
    // image: roomImg,
    title: "Full Flat near Kondapur",
    price: "₹15,000/month",
    location: "Kondapur, Hyderabad",
    beds: 2,
    baths: 2,
    area: "1000 sqft",
    verified: true,
  },
  // Add more properties here
];

const FeaturedProperties = () => {
  return (
    <div className="featured-properties-grid">
      {properties.map((property) => (
        <div key={property.id} className="property-card">
          <div className="property-image-container">
            <img
              src={property.image}
              alt={property.title}
              className="property-image"
            />
            {property.verified && (
              <span className="verified-badge">Verified</span>
            )}
            <button className="wishlist-btn">
              <Heart size={20} />
            </button>
          </div>
          <div className="property-details">
            <h3 className="property-title">{property.title}</h3>
            <p className="property-price">{property.price}</p>
            <p className="property-location">
              <MapPin size={14} /> {property.location}
            </p>
            <div className="property-amenities">
              <span>
                <Bed size={14} /> {property.beds} Beds
              </span>
              <span>
                <Bath size={14} /> {property.baths} Bath
              </span>
              <span>
                <LayoutGrid size={14} /> {property.area}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
