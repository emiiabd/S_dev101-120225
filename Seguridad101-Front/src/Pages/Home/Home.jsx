import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ContacForm, Footer, Maps, NavBar, PresentationBanner, CardsHome, WhyUsHome, ValuesHome, OurClients} from "../../Components";
import "./home.css";
import { ParallaxBanner } from 'react-scroll-parallax'

const Home = () => {
  const navigate = useNavigate();
  

  const handlePlaceSelected = (place) => {
    if (place.geometry) {
      console.log("Place details:", place);
      console.log("Formatted address:", place.formatted_address);
    } else {
      console.log("No details available for input:", place.name);
    }
  };




  return (
    <>
      {/* NAVBAR */}
      <ParallaxBanner layers={[{ image: "./intro_slide_2-30.jpg", speed: 30 }]} className="presentationBanner">
        <NavBar from={"home"}/>
        <PresentationBanner />
      </ParallaxBanner>
      {/* CARDS */}
        <CardsHome />
      {/* WHY US? */}
        <WhyUsHome />
      {/* VALUES */}
        <ValuesHome />
      {/* OUR CLIENTS */}
        <OurClients />
      {/* MAPS */}
        <div className="container-fluid section section-five m-0 py-5" id='contact'>
        <div className="container text-center py-5 h-100 w-100">
          <h2 className="pb-5">¿Dónde encontrarnos?</h2>
          <div className="content d-flex gap-4 align-items-top flex-column flex-lg-row">
            <div className="col-12 col-lg-6">
              <ContacForm handlerPlaceSelected={handlePlaceSelected} title={"Contacto"} 
              spanTitle={"Envie el formulario para pedir una cotización gratuita"}/>
            </div>
            <div className="col-12 col-lg-6 maps d-flex flex-column justify-content-between">
            <Maps />
            </div>
          </div>
        </div>
        </div>
      {/* FOOTER */}
        <Footer />
    </>
  );
};

export default Home;
