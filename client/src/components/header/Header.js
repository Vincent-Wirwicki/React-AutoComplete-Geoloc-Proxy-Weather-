import SearchBar from "./SearchBar";
import "../../styles/components/header/header.css";

const Header = ({ cityList, getGeoCode, setSearch, search, setQueryCity }) => {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };

  return (
    <section className="header">
      <SearchBar
        cityList={cityList}
        getGeoCode={getGeoCode}
        setSearch={setSearch}
        search={search}
        setQueryCity={setQueryCity}
      />
      <p className="header__date">
        {date.toLocaleDateString("en-EN", options)}
      </p>
    </section>
  );
};

export default Header;
