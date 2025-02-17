import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="pt-5 footer mt-4 container-fluid">
      <div className="container fs-6">
        <div className="row row-cols-2 row-cols-lg-3 text-center text-lg-start ">
          <div className="fs-5 col col-12 col-lg-4 mb-3 gap-3 d-flex flex-column justify-content-center text-center">
            <Link to="/Contact" className="text-decoration-none">
              Información de Contacto
            </Link>
            <Link to="/AboutUs" className="text-decoration-none">
              Sobre Nosotros
            </Link>
            <div className="d-flex justify-content-center gap-3">
              <Link to="https://www.instagram.com/seguridad_101/?hl=es-la" target="_blank" className="text-decoration-none">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="https://www.facebook.com/seguridad101.oficial?locale=es_LA" target="_blank" className="text-decoration-none">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="https://wa.me/+5492615994142" target="_blank" className="text-decoration-none">
                <i className="bi bi-whatsapp"></i>
              </Link>
            </div>
          </div>
          <div className="col col-12 col-lg-4 d-flex flex-column gap-0 g-lg-0">
            <div className="mb-3">
              <h5 className="">Teléfonos</h5>
              <p>+54 9 2615 99-4142</p>
              <p>+54 9 2614 54-5412</p>
            </div>
            <div>
              <h5>Correo Electrónico</h5>
              <p>info@seguridad101.com.ar</p>
            </div>
          </div>
          <div className="col col-12 col-lg-4 d-flex flex-column gap-3 g-4 g-lg-0">
            <div className="mb-3">
              <h5>Dirección</h5>
              <p>Pedro B. Palacios 56, Dorrego, Mendoza, Argentina.</p>
            </div>
            <div>
              <h5>Horario de Atención</h5>
              <p>Lun - Vie: 9 am - 1:30 pm, 3:30 pm - 6:30 pm</p>
              <p>Sáb: 9 am - 1:30 pm</p>
              <p>Dom: Cerrado</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} Seguridad 101. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
