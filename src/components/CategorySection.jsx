import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Building2, Users, Bed, ChevronDown } from "lucide-react";

const categories = [
  {
    name: "Rooms",
    icon: Home,
    options: [
      { name: "Single Room", type: "SINGLE_ROOM" },
      { name: "Double Room", type: "DOUBLE_ROOM" },
    ],
  },
  {
    name: "Flats",
    icon: Building2,
    options: [
      { name: "1 BHK", type: "1BHK" },
      { name: "2 BHK", type: "2BHK" },
      { name: "3 BHK", type: "3BHK" },
    ],
  },
  {
    name: "Hostels",
    icon: Users,
    options: [
      { name: "Boys Hostel", type: "BOYS_HOSTEL" },
      { name: "Girls Hostel", type: "GIRLS_HOSTEL" },
    ],
  },
  // {
  //   name: "PG",
  //   icon: Bed,
  //   options: [{ name: "Shared PG", type: "PG" }],
  // },
];

const CategorySection = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Bahar click karne par dropdown band karne ke liye logic
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdown(null);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleToggle = (e, index) => {
    e.stopPropagation(); // Dropdown click par document wala logic trigger na ho
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleCategoryClick = (type) => {
    navigate(`/quick-search/${encodeURIComponent(type)}`);
    setActiveDropdown(null);
  };

  return (
    <div className="category-section">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-card"
          // Desktop Hover logic
          onMouseEnter={() =>
            window.innerWidth > 768 && setActiveDropdown(index)
          }
          onMouseLeave={() =>
            window.innerWidth > 768 && setActiveDropdown(null)
          }
          // Mobile Click logic
          onClick={(e) => handleToggle(e, index)}
          // Overlap fix: Active card ka z-index hamesha zyada hona chahiye
          style={{
            zIndex: activeDropdown === index ? 1001 : 10 - index,
          }}
        >
          <category.icon size={30} className="category-icon" />
          <span className="category-name">
            {category.name}
            <ChevronDown
              size={14}
              style={{
                transform: activeDropdown === index ? "rotate(180deg)" : "none",
                transition: "0.3s",
              }}
            />
          </span>

          {activeDropdown === index && (
            <div className="category-dropdown">
              {category.options.map((opt) => (
                <div
                  key={opt.type}
                  className="dropdown-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(opt.type);
                  }}
                >
                  {opt.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
