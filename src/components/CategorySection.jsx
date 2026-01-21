import React from "react";
import { Home, Users, Building2, Landmark } from "lucide-react";

const categories = [
  { name: "Single Room", icon: Home },
  { name: "Shared PG", icon: Users },
  { name: "Apartment", icon: Building2 },
  { name: "Independent", icon: Landmark },
];

const CategorySection = () => {
  return (
    <div className="category-section">
      {categories.map((category) => (
        <div key={category.name} className="category-card">
          <category.icon size={30} className="category-icon" />
          <span className="category-name">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
