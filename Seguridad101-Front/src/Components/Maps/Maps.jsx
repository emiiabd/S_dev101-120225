import React from "react";
import "./Maps.css";

const Maps = () => {
  return (
    <>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3349.7938645591184!2d-68.83800204050405!3d-32.90361795844437!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e096b208cb55b%3A0x6e3f0d2d975c6fac!2sSEGURIDAD%20101%20SRL!5e0!3m2!1ses-419!2sar!4v1731008894884!5m2!1ses-419!2sar"
          loading="lazy"
        ></iframe>
        <span>
          Dirección: Pedro B. Palacios 56. Dorrego, Mendoza, Argentina.
          <br />
          Tel.: +54 9 261 424-2428
        </span>
    </>
  );
};
export default Maps;
