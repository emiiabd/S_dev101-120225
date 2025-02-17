import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faInfo, faBriefcase, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./TableComponentServices.css";

const TableComponentServices = ({ data, client, search, searcher, isLoading }) => {
  const [showItems, setShowItems] = useState(10);

  const navigate = useNavigate();

  const handleShowItems = (e) => {
    setShowItems(e.target.value);
  };

  return (
    <div className="p-3 bg-white">
      {
        isLoading ?
        <></> 
        :
        <div className="row border-bottom pb-3">
          <div className="col-12 text-center">
            <h3 className="fw-semibold fs-3 ">Servicios</h3>
          </div>
          <div className="col-12 text-center text-md-start col-md-6 fs-5 pt-2 ">
            <p className="text-muted">{client.nombre}</p>
            <span className="text-muted">{client.telefono} {client.telefono2 ? " - " + client.telefono2 : ""}</span>
          </div>
          <div className="col-12 col-md-6 fs-5 text-center text-md-end pt-2 mt-3 mt-md-0 ">
            <p className="text-muted">{client.direccion}</p>
          </div>
          <div className="col-12 col-md-6 fs-6 text-center text-md-start pt-2 mt-3 mt-md-0 ">
            {
              client.cambioBateria && <p className="text-muted p-0 m-0"><strong>Ultimo cambio de bateria:  </strong>{client.cambioBateria}</p>
            }
            {
              client.alertaBateria && <p className="text-muted pt-1 m-0 text-decoration-underline"><strong>El cliente no requiere seguimiento de bateria</strong></p>
            }
          </div>
          <div className="col-12 col-md-6 fs-5 text-center text-md-end pt-2 mt-3 mt-md-0 ">
            <button className="btn btn-secondary" onClick={() => navigate(`/log/s101/products/${client.clientID}`) }>
              Productos instalados
            </button>
          </div>
        </div>
      }
      <div className="row align-items-center my-3">
        <div className="col  d-flex align-items-center p-3 gap-2">
          <p className="m-0">Mostrar</p>
          <input type="text" className="form-control input-show" aria-label="" value={showItems} onChange={handleShowItems} />
          {
            isLoading ?
            <></> 
            :
            <span className="text-muted"> total: {data.length} servicios</span>
          }
        </div>
        <div className="col ">
          <input type="text" placeholder="Buscar" value={search} onChange={searcher} className="form-control input-search"/>
        </div>
        <div className="col d-flex justify-content-end pe-5 gap-2">
          <button className="btn btn-secondary" onClick={() => navigate(-1) }>
            Volver
          </button>
          <button className="btn btn-primary" onClick={() => navigate(`/log/s101/services/0/${client.clientID}`) }>
            Añadir
          </button>
        </div>
      </div>
      <div className="row">
        <div className="row">
          <p className="col-8 col-md-4 col-lg-3 col-xl-2 fw-medium text-center fs-5 d-md-block">Servicio</p>
          <p className="col col-md-3 col-lg-2 col-xl-2 fw-medium text-center fs-5 d-none d-md-block">Precio</p>
          <p className="col col-lg-2 col-xl-2 fw-medium text-center fs-5 d-none d-lg-block">Tecnico</p>
          <p className="col col-md-3 col-lg-2 col-xl-2 fw-medium text-center fs-5 d-none d-md-block">Fecha</p>
          <p className="col col-lg-2 col-xl-1 fw-medium text-center fs-5 d-none d-lg-block">Estado</p>
          <p className="col col-xl-2 col-xl-2 fw-medium text-center fs-5 d-none d-xl-block">Estado de pago</p>
          <p className="col-2 col-lg-1"></p>
        </div>
        <div className="col-12">
          {isLoading ? (
              <div className="col-12 text-center py-4">
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
          ) : (
            data.map((item, index) => {
              if (index < showItems) {
                return (
                  <Accordion defaultActiveKey="1" className="row acord" key={index}>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                      <p className="col-8 col-md-4 col-lg-3 col-xl-2  text-center d-md-block">{item.tipo}</p>
                      <p className="col col-md-3 col-lg-2 col-xl-2  text-center d-none d-md-block">$ {item.precio}</p>
                      <p className="col col-lg-2 col-xl-2  text-center d-none d-lg-block">{item.tecnico}</p>
                      <p className="col col-md-3 col-lg-2 col-xl-2  text-center d-none d-md-block">{item.fecha ? item.fecha.split('T')[0] : ''}</p>
                      <p className="col col-lg-2 col-xl-1  text-center d-none d-lg-block">{item.estado == 1 ? "Pendiente" : "Finalizado" }</p>
                      <p className="col col-xl-2 col-xl-2  text-center d-none d-xl-block">{item.estadoPago == 1 ? "Pagado" : "Pendiente" }</p>
                      <div className="col-2 col-lg-1 d-flex flex-row align-items-center justify-content-center gap-2" z-index="2">
                        <a className="btn btn-primary btn-sm " onClick={() => {navigate(`/log/s101/services/${item.serviceID}/view`) } }>
                          <FontAwesomeIcon icon={faEye} />
                        </a>
                        <a className="btn btn-warning btn-sm" onClick={() =>{navigate(`/log/s101/services/${item.serviceID}/edit`)}}>
                          <FontAwesomeIcon icon={faEdit} />
                        </a>
                      </div>
                      </Accordion.Header>
                      <Accordion.Body className="d-flex flex-row align-items-center justify-content-center">
                        <p className="col-12">
                          <strong>Observaciones: </strong>{item.observaciones}
                        </p>
                        {/* <p className="col-8 col-md-4 col-lg-3 col-xl-2  text-center d-md-block">{item.tipo}</p>
                        <p className="col col-md-3 col-lg-2 col-xl-2  text-center d-none d-md-block">$ {item.precio}</p>
                        <p className="col col-lg-2 col-xl-2  text-center d-none d-lg-block">{item.tecnico}</p>
                        <p className="col col-md-3 col-lg-2 col-xl-2  text-center d-none d-md-block">{item.fecha ? item.fecha.split('T')[0] : ''}</p>
                        <p className="col col-lg-2 col-xl-1  text-center d-none d-lg-block">{item.estado == 1 ? "Pendiente" : "Finalizado" }</p>
                        <p className="col col-xl-2 col-xl-2  text-center d-none d-xl-block">{item.estadoPago == 1 ? "Pagado" : "Pendiente" }</p> */}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TableComponentServices;
