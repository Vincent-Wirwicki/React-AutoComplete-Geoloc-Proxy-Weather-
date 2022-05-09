import "../../styles/components/utils/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__svg__dot">
        <svg viewBox="0 0 100 100" width="200" height="200">
          <circle className="loader__svg__circle" r="2"></circle>
          <circle className="loader__svg__circle" r="4"></circle>
          <circle className="loader__svg__circle" r="4"></circle>
          <circle className="loader__svg__circle" r="2"></circle>
        </svg>
      </div>
      <h3 className="loader__txt">Waiting for data</h3>
    </div>
  );
};

export default Loader;
