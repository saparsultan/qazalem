import { GOOGlE_API_KEY, MAP_GEO } from "@/utils/constants";

const MapGeo = ({ lng }) => {
  const lngMapFunc = () => {
    switch (lng) {
      case "ru":
        return MAP_GEO.ru;
      case "kk":
        return MAP_GEO.kk;
      case "en":
        return MAP_GEO.en;
      case "cn":
        return MAP_GEO.cn;
      default:
        return MAP_GEO.kk;
    }
  };
  const lngMap = lngMapFunc();
  return (
    <div className="map-geo__content" id="map">
      <iframe
        src={lngMap}
        width="100%"
        height="100%"
        aria-hidden="false"
        tabIndex="0"
        style={{
          border: "0",
          borderRadius: "20px",
          backgroundColor: "#f9f9f9",
        }}
      ></iframe>
    </div>
  );
};

export default MapGeo;
