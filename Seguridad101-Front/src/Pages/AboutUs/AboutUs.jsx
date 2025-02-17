import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { Footer, PresentationBanner } from "../../Components";
import './AboutUs.css'
import { Link } from "react-router-dom";
import { ParallaxBanner } from "react-scroll-parallax";

const AboutUs = () => {
  return (
    <>
    <ParallaxBanner layers={[{ image: "./intro_slide_3-30.jpg", speed: 30 }]} >
      <NavBar/>
      <PresentationBanner from={"AboutUs"}/>
    </ParallaxBanner>
    <Footer/>
    </>
  );
};

export default AboutUs;
