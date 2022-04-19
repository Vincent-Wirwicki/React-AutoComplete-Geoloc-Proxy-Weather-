import { useState } from "react";
import "../../styles/components/header/search-bar.css";

const SearchBar = ({
  frenchCity,
  clearSearch,
  getGeoCode,
  queryInput,
  searchCity,
  selectInList,
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const filterSuggestions = e => {
    const input = e.currentTarget.value;
    const results = frenchCity.filter(({ name }) =>
      name.toLowerCase().startsWith(input.toLowerCase())
    );
    input.length > 3 && results.length > 0 && setSuggestions(results);
  };

  const selectSuggestion = e => {
    selectInList(e);
    getGeoCode();
  };

  return (
    <div className="search__wrap">
      <div className="search__bar">
        <button
          className="search__bar__clear"
          onClick={() => {
            clearSearch();
            setSuggestions([]);
          }}
        >
          x
        </button>
        <input
          className="search__bar__input"
          type="text"
          placeholder="search"
          value={queryInput || ""}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={e => {
            filterSuggestions(e);
            searchCity(e);
          }}
        />
        <button
          className="search__bar__find"
          onClick={() => {
            getGeoCode();
            setSuggestions([]);
          }}
        >
          go
        </button>
      </div>
      <div className={isFocus ? "search__bar__suggestion__visible" : ""}>
        {isFocus &&
          suggestions.length >= 1 &&
          suggestions.map(({ name }, index) => (
            <p
              key={index}
              className={isFocus ? "search__bar__suggestion__item" : ""}
              onMouseDown={e => selectSuggestion(e)}
            >
              {name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
