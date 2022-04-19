import SearchBar from "./SearchBar";
import "../../styles/components/header/header.css";

const Header = ({
  clearSearch,
  frenchCity,
  getGeoCode,
  queryInput,
  searchCity,
  selectInList,
}) => {
  return (
    <div className="header">
      <SearchBar
        clearSearch={clearSearch}
        frenchCity={frenchCity}
        getGeoCode={getGeoCode}
        queryInput={queryInput}
        searchCity={searchCity}
        selectInList={selectInList}
      />
    </div>
  );
};

export default Header;
