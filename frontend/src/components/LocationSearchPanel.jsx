import React from "react";

const LocationSearchPanel = ({
  suggestions = [],
  loading,
  onSuggestionClick,
}) => {
  return (
    <div>
      {loading && <div className="p-4 text-gray-500">Loading...</div>}
      {!loading && suggestions.length === 0 && (
        <div className="p-4 text-gray-400">No suggestions</div>
      )}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => onSuggestionClick(elem)}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center justify-start my-2 cursor-pointer"
        >
          <h2 className="bg-[#eee] h-8 w-8 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill text-xl"></i>
          </h2>
          <h4 className="text-lg font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
