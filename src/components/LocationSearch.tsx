import React, { FC, useState } from "react";
import "./LocationSearch.css"

interface LocationSearchProps {
  onSearch: (search: string) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({ onSearch }) => {
  const [locationSearch, setLocationSearch] = useState("");

  const _handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSearch(locationSearch);
      setLocationSearch("");
    }
  };

  return (
    <div className="containerSearch">
      <input
        className="textSearchLocation"
        type="search"
        value={locationSearch}
        placeholder="Input location and Enter to search"
        onChange={(e) => setLocationSearch(e.target.value)}
        onKeyDown={_handleKeyDown}
      />
    </div>
  );
};
