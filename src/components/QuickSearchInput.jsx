import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/quickSearchInput.css";


function QuickSearchInput() {
  const navTo = useNavigate();
  const{searchInput} = useParams()
  const [input, setInput] = useState(searchInput || "");

  function search() {
    if (!input.trim()) return; // basic sanity check
    navTo(`/quick-search/${input}`);
  }

  return (
    <div className="search-wrapper">
      <input
        type="text"
        className="search-input"
        placeholder="Search by City, area, landmark or pincode"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && search()}
      />

      <button className="hero-search-btn" onClick={search}>
        <Search size={18} />
        <span>Search</span>
      </button>
    </div>
  );
}

export default QuickSearchInput;
