import SearchBar from "./SearchBar";
import "../../styles/components/header/header.css";

const Header = ({
  cityNotFound,
  frenchCity,
  getGeoCode,
  setSearch,
  search,
  setQueryCity,
}) => {
  return (
    <section className="header">
      {cityNotFound && (
        <p className="header__city__not__found">{search} not found</p>
      )}
      <SearchBar
        frenchCity={frenchCity}
        getGeoCode={getGeoCode}
        setSearch={setSearch}
        search={search}
        setQueryCity={setQueryCity}
      />
    </section>
  );
};

export default Header;
