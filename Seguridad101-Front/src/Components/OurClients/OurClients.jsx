import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./OurClients.css";
import { OverlayTrigger } from "react-bootstrap";
import Tooltip from 'react-bootstrap/Tooltip';

const OurClients = () => {
  const Img = ({id, title, src }) => (
    <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
      <img
      id={id}
      src={src}
      title={title}
      alt={title}
      className="brand-image"
      />
    </OverlayTrigger>
  )
  return (
    <>
    <div className="container-fluid carousel-container my-4 d-none d-lg-flex flex-column gap-3 text-center alin-items-center">
      <h2 className="pt-5">Nuestros Clientes</h2>
    <Carousel interval={2200} data-bs-theme="dark" >
      <Carousel.Item>
        <div className="container brandsBox d-flex flex-direction-row justify-content-center gap-5 align-items-center">
          <Img src="./brands/gobiernoDeMendoza.png" title="Gobierno de Mendoza" id="gobiernoDeMendoza"/>
          <Img src="./brands/andreu.svg" className="brand-image" title="Transportes Andreu" id="transportesAndreu" />
          <Img src="./brands/barrioBoedoVillage.jpg" className="brand-image" title="Barrio Boedo Village" id="barrioBoedoVillage"/>
          <Img src="./brands/bodegaLaRural.png" className="brand-image" title="Bodega La Rural" id="bodegaLaRural" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container brandsBox d-flex flex-direction-row justify-content-center gap-5 align-items-center">
          <Img src="./brands/afiladosPaoletti.webp" className="brand-image" title="Afilados Paoletti" id="afiladosPaoletti"/>
          <Img src="./brands/hospitalCentral.jpg" className="brand-image" title="Hospital Central" id="hospitalCentral"/>
          <Img src="./brands/logo-valvtronic.png" className="brand-image" title="Valvtronic" id="valvtronic"/>
          <Img src="./brands/CasinoDeMendoza.svg" className="brand-image" title="Casino de Mendoza" id="casinoDeMendoza" />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container brandsBox d-flex flex-direction-row justify-content-center gap-5 align-items-center">
          <Img src="./brands/municipalidadLujanDeCuyo.png" className="brand-image"  title="Municipalidad de Lujan de Cuyo" id="municipalidadLujanDeCuyo" />
          <Img src="./brands/servicioPenitenciario.jpg" className="brand-image" title="Servicio Penitenciario de Mendoza" id="servicioPenitenciario"/>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
    </>
  );
};

export default OurClients;
