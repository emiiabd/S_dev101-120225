import React from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { ContacForm, Footer, PresentationBanner } from "../../Components";
import './Contact.css'
import { Link } from "react-router-dom";
import { ParallaxBanner } from "react-scroll-parallax";

const Contact = () => {

  
  return (
    <>
    <ParallaxBanner layers={[{ image: "./intro_slide_3-30.jpg", speed: 30 }]} className="presentationBanner" >
      <NavBar/>
      <PresentationBanner from={"contact"}/>
    </ParallaxBanner>
    <div className="container contactInfo py-5 ">
      <div className="row row-cols-1 row-cols-lg-2 py-3 g-4">
        <div className="col col-lg-6 text-center text-md-start">
          <h2>Información de Contacto</h2>
          <p className="text-muted mb-5">
            Si tienes preguntas sobre nuestros servicios, por favor contáctanos usando los
            detalles abajo o completa el formulario de contacto.
          </p>
          <div className="row row-cols-1 row-cols-md-2 g-3 ">
            <div className="col d-flex flex-column pb-md-3">
              <h5>Teléfono</h5> 
              <Link to="https://wa.me/+5492615994142" target="_blank" className="text-decoration-none">+54 9 2615 99-4142</Link>
              <Link to="https://wa.me/+5492614545412" target="_blank" className="text-decoration-none">+54 9 2614 54-5412</Link>
            </div>
            <div className="col pb-md-3">
              <h5>Dirección</h5>
              <Link to="https://maps.app.goo.gl/22FrCA17bX8eXeGp9" target="_blank" className="text-decoration-none">
                Pedro B. Palacios 56, Dorrego, Mendoza, Argentina
              </Link>
            </div>
            <div className="col pb-md-3">
              <h5>Correo Electrónico</h5> 
              <p>info@seguridad101.com.ar</p> 
            </div>
            <div className="col pb-md-3">
              <h5>Horario de Atención</h5> 
              <p>Lun - Vie: 9 - 13:30, 15:30 - 18:30</p>
              <p>Sáb: 9 - 13:30 pm</p> 
              <p>Dom: Cerrado</p>
            </div>
          </div>
        </div>
        <div className="col col-lg-6 contactFormScreen">
          <ContacForm title={"Formulario de Contacto"}/>
        </div>
      </div>
    </div>
    
    <Footer/>
    </>
  );
};

export default Contact;
