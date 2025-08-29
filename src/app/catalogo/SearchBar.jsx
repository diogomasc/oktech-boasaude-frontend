// src/app/catalogo/SearchBar.jsx
"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center mb-6">
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-l-xl outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-r-xl hover:bg-green-600"
      >
        Buscar
      </button>
    </form>
  );
}
