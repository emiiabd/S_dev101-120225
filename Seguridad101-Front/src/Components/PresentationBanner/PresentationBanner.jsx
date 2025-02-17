import React from "react";
import "./PresentationBanner.css";
import { INFODATA } from "../../Data/data";

const PresentationBanner = ({ from = null }) => {
  const { PRESENTATION } = INFODATA;

  const render = ({ title, text, btn }) => {

    return (
      <div className="container-fluid  m-0 p-0 position-relative mh-600 secction-one d-flex justify-content-center align-items-center">
        <div className="container row px-0 px-md-4 px-xl-0 mw-1200 form-info ">
          <div className="col-lg-7  text-center text-lg-start">
            <h1 className="presentation-title ">{title}</h1>
            <p className="presentation-text mb-4">{text}</p>
            <a
              href="#contact"
              className="btn button-intro btn-lg btn-primary"
              hidden={!Boolean(btn)}
            >
              {btn}
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {
      !from 
      &&
      render(PRESENTATION.HOME)
      }
      {
      from === "contact" 
      && 
      render(PRESENTATION.CONTACT)
      }
      {
      from === "AboutUs" 
      && 
      render(PRESENTATION.ABOUTUS)
      }
      {
      from === "login" 
      && 
      render(PRESENTATION.LOGIN)
      }
      
    </>
  );
};

export default PresentationBanner;
