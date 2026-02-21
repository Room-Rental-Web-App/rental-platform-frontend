import React, { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../CSS/quickSearchInput.css";

const POPULAR_CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Bhopal",
];

function QuickSearchInput() {
  const navigate = useNavigate();
  const { searchInput } = useParams();

  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef();

  /* Sync URL param */
  useEffect(() => {
    if (searchInput) setInput(searchInput);
  }, [searchInput]);

  /* Close dropdown when clicking outside */
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Fetch suggestions only when typing */
  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const debounce = setTimeout(() => {
      setLoading(true);

      // Simulated API filter (replace with real API later)
      const filtered = POPULAR_CITIES.filter((city) =>
        city.toLowerCase().includes(input.toLowerCase())
      );

      setSuggestions(filtered);
      setLoading(false);
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(debounce);
  }, [input]);

  const handleSearch = (value = input) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    navigate(`/quick-search/${encodeURIComponent(trimmed)}`);
    setShowDropdown(false);
  };

  return (
    <div className="search-wrapper-container" ref={wrapperRef}>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search by city, area, landmark or pincode"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          className="hero-search-btn"
          onClick={() => handleSearch()}
        >
          <Search size={18} />
          <span>Search</span>
        </button>
      </div>

      {showDropdown && (
        <div className="search-dropdown">

          {loading && (
            <div className="dropdown-loading">
              Loading...
            </div>
          )}

          {!loading && suggestions.length > 0 && (
            <div className="dropdown-section">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleSearch(item)}
                >
                  <MapPin size={16} />
                  {item}
                </div>
              ))}
            </div>
          )}

          {!loading && suggestions.length === 0 && (
            <div className="dropdown-empty">
              No results found
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default QuickSearchInput;