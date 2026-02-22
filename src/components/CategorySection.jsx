import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import { Home, Users, Building2, Landmark } from "lucide-react";

const categories = [
  { name: "Single Room", icon: Home, type: "Single Room" }, // Backend value 'ROOM' rakhi hai
  // { name: "Shared PG", icon: Users, type: "PG" },
  { name: "Apartment", icon: Building2, type: "FLAT" },
  { name: "Independent", icon: Landmark, type: "HOUSE" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    navigate(`/quick-search/${encodeURIComponent(trimmed)}`);
  };


  return (
    <div className="category-section">
      {categories.map((category) => (
        <div
          key={category.name}
          className="category-card"
          onClick={() => handleCategoryClick(category.type)}
          style={{ cursor: "pointer" }} // Clickable feel dene ke liye
        >
          <category.icon size={30} className="category-icon" />
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
