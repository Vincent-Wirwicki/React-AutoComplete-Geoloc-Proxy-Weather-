import { useState } from "react";
import "../../styles/components/header/search-bar.css";

const SearchBar = ({ cityList, setSearch, search, setQueryCity }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isFocus, setIsFocus] = useState(false);

  const filterSuggestions = e => {
    const input = e.currentTarget.value;
    const results = cityList.filter(({ name }) =>
      name.toLowerCase().startsWith(input.toLowerCase())
    );
    input.length > 3 && results.length > 0 && setSuggestions(results);
  };

  return (
    <div className="search__wrap">
      <div className="search__bar">
        <button
          className="search__bar__clear"
          onClick={() => {
            setSearch("");
            setSuggestions([]);
          }}
        >
          x
        </button>
        <input
          className="search__bar__input"
          type="text"
          placeholder="search"
          value={search || ""}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={e => {
            filterSuggestions(e);
            setSearch(e.target.value);
          }}
        />
        <button
          className="search__bar__find"
          onClick={() => {
            setQueryCity(search);
            setSuggestions([]);
          }}
        >
          go
        </button>
      </div>
      <div className={isFocus ? "search__bar__suggestion__visible" : ""}>
        {isFocus &&
          suggestions.length > 0 &&
          suggestions.map(({ name }, index) => (
            <p
              key={index}
              className={isFocus ? "search__bar__suggestion__item" : ""}
              onMouseDown={e => {
                setSearch(e.target.txtContent);
                setQueryCity(search);
              }}
            >
              {name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
