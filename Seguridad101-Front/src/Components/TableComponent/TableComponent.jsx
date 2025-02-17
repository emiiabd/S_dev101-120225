import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faInfo, faBriefcase, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Accordion, Modal } from "react-bootstrap";
import "./TableComponent.css";
import { useNavigate } from "react-router-dom";
import { GET } from "../../fetching/http.fetching";
import { orderWithDate } from "../../Helpers/ordersArray";

const TableComponent = ({ of, data, search, searcher, isLoading }) => {
  const [showItems, setShowItems] = useState(10);
  const [viewModal, setViewModal] = useState({view: false, services: []});
  const navigate = useNavigate();

  const schema = {
    headerBattery: [
      <p key={0} className="col-2 fw-medium text-center fs-5 d-none d-md-block">Ultimo cambio</p>,
      <p key={1} className="col-3 col-md-3 fw-medium text-center fs-5">Cliente</p>,
      <p key={2} className="col-3 col-md-3 fw-medium text-center fs-5">Dirección</p>,
      <p key={3} className="col-3 fw-medium text-center fs-5 d-none d-md-block">Tiempo de uso</p>,
      <p key={4} className="col-1 fw-medium text-center fs-5 d-none d-md-block"></p>,
    ],
    headerClients: [
      <p key={0} className="col-6 fw-medium text-center fs-5 d-none d-md-block">Nombre</p>,
      <p key={1} className="col-6 col-md-3 fw-medium text-center fs-5">Apellido</p>
    ],
    headerUsers: [
      <p key={0}className="col-3 fw-medium text-center fs-5 d-none d-md-block">Tipo</p>,
      <p key={1}className="col-6 col-md-3 fw-medium text-center fs-5">Cliente</p>,
      <p key={2}className="col-6 col-md-3 fw-medium text-center fs-5">Dirección</p>,
      <p key={3}className="col-3 fw-medium text-center fs-5 d-none d-md-block">Técnico</p>,
    ],
  };


  const handleShowItems = (e) => {
    setShowItems(e.target.value);
  };

  const handleViewModal = (id, name) => {
    try {
      if(!viewModal.view){
        const getServicesByClientId = async () => {
          const response = await GET(`api/services/${id}`)
          const services = await response.payload.services

          orderWithDate(services)
          setViewModal({view: true, services: response.payload.services, client: name});
        }
        getServicesByClientId();
      }
      else{
        setViewModal({view: false, services: [], client: ''});
      }
    } catch (error) {
      console.log(error)
    }
  };

  //console.log(data)

  return (
    <div className="p-3 bg-white">
      <Modal show={viewModal.view} onHide={handleViewModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Servicios de: {viewModal.client}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            viewModal.services.map((service, index) => (
              <div key={index} className="row border-bottom border-3 my-3 p-2 g-2">
                <div className="col-12 d-flex justify-content-between">
                  <h6><strong>Servicio: </strong>{service.tipo}</h6>
                  <h6><strong>Fecha: </strong>{service.fecha ? service.fecha.split('T')[0] : ''}</h6>
                  <h6><strong>Precio: </strong>$ {service.precio}</h6>
                </div>
                <div className="col-12">
                  <p><strong>Detalle: </strong>{service.observaciones}</p>
                </div>
              
              </div>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info btn-sm" onClick={handleViewModal}>
            <FontAwesomeIcon icon={faInfo} />
          </button>
        </Modal.Footer>
      </Modal>
      <div className="row align-items-center my-3">
        <div className="col  d-flex align-items-center p-3 gap-2">
          <p className="m-0">Mostrar</p>
          <input type="text" className="form-control input-show" aria-label="" value={showItems} onChange={handleShowItems} />
        </div>

        <div className="col ">
          <input type="text" placeholder="Buscar" value={search} onChange={searcher} className="form-control input-search"/>
        </div>
        {
          of === "users" || of === "clients" &&
            <div className="col d-flex justify-content-end pe-5 gap-2">
            <button className="btn btn-secondary" onClick={() => navigate(-1) }>
              Volver
            </button>
            <button className="btn btn-primary" onClick={() => navigate(`/log/s101/clients/0/edit`)}>
              Añadir
            </button>
          </div>  
        }
      </div>
      <div className="row ">
        <div className="col-12">
          <div className="row tableHeader">

          {
            of === "users" 
            ? 
            schema.headerUsers
            :
            of === "clients"
            ?
            schema.headerClients
            :
            of === "battery"
            ?
            schema.headerBattery
            :
            <>
            <p className="col-3 fw-medium text-center fs-5 d-none d-md-block">Tipo</p>
            <p className="col-6 col-md-3 fw-medium text-center fs-5">Cliente</p>
            <p className="col-6 col-md-3 fw-medium text-center fs-5">Dirección</p>
            <p className="col-3 fw-medium text-center fs-5 d-none d-md-block">Técnico</p>
            </>
          }
          </div>
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
                          {
                            of === "users"
                            ?
                            <>
                            <p className="col-3  d-none d-md-block ">{item.type}</p>
                            <p className="col-6 col-md-3 ">{item.client}</p>
                            <p className="col-6 col-md-3  ">{item.address}</p>
                            <p className="col-3   d-none d-md-block">{item.technician}</p>
                            </>
                            :
                            of === "clients"
                            ?
                            <>
                            <p className="col-6 ">{item.nombre}</p>
                            <p className="col-6 ">{item.apellido}</p>
                            </>
                            :
                            of === "battery"
                            ?
                            <>
                            <p className="col-2  d-none d-md-block ">{item.cambioBateria}</p>
                            <p className="col-3 col-md-3 ">{item.client}</p>
                            <p className="col-3 col-md-3  ">{item.address}</p>
                            <p className="col-3   d-none d-md-block">{item.tiempoUso}</p>
                            <div className="col-1 d-flex justify-content-center align-items-center gap-2">
                              <a className="btn btn-info btn-sm" onClick={() => {navigate(`/log/s101/clients/${item.clientID}/view`)}}>
                                <FontAwesomeIcon icon={faEye} />
                              </a>
                              <a className="btn btn-warning btn-sm" onClick={() => navigate(`/log/s101/services/${item.clientID}`)}>
                                <FontAwesomeIcon icon={faBriefcase} />
                              </a>
                            </div>
                            </>
                            :
                            <>
                            <p className="col-3  d-none d-md-block ">{item.type}</p>
                            <p className="col-6 col-md-3 ">{item.client}</p>
                            <p className="col-6 col-md-3  ">{item.address}</p>
                            <p className="col-3   d-none d-md-block">{item.technician}</p>
                            </>
                          }
                      </Accordion.Header>
                      <Accordion.Body className="d-flex flex-row align-items-center justify-content-center">
                        {
                          of === "users"
                          ?
                          <p className="col-3  d-none d-md-block ">{item.direccion}</p>
                          :
                          of === "clients"
                          ?
                          <p className="col-10  d-none d-md-block ">DIRECCION: {item.direccion}</p>
                          :
                          of === "battery"
                          ?
                          <p className="col-12">
                            <strong>Observaciones: </strong>{item.observations}
                          </p>
                          :
                          <p className="col-10">
                            {item.observations}
                          </p>
                        }
                        {
                          of !== "battery" &&
                          <div className="col-2 py-4 px-2 fs-6 d-flex flex-column flex-md-row align-items-center justify-content-center gap-2" z-index="2">
                          <button className="btn btn-primary btn-sm " onClick={
                            () => 
                            {
                              of === "users" 
                              ? 
                              navigate(`/log/s101/users/${item.userID}/view`) 
                              : 
                              of == "clients" 
                              ? 
                              navigate(`/log/s101/clients/${item.clientID}/view`) 
                              : 
                              navigate(`/log/s101/services/${item.serviceID}/view`)
                            }}>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                          <button className="btn btn-warning btn-sm" onClick={
                            () => 
                              {
                              of === "users" 
                              ? 
                              navigate(`/log/s101/users/${item.userID}/edit`) 
                              : 
                              of == "clients" 
                              ? 
                              navigate(`/log/s101/clients/${item.clientID}/edit`) 
                              : 
                              navigate(`/log/s101/services/${item.serviceID}/edit`)
                            }}>
                          <FontAwesomeIcon icon={faEdit} />
                          </button>
                          {
                            of == "clients" 
                            ? 
                          <button className="btn btn-info btn-sm" onClick={() => {handleViewModal(item.clientID, `${item.nombre} ${item.apellido}`)}}>
                            <FontAwesomeIcon icon={faInfo} />
                          </button>
                            :
                            <></>
                          }
                          <button className="btn btn-info btn-sm" onClick={() => navigate(`/log/s101/services/${item.clientID}`)}>
                            <FontAwesomeIcon icon={faBriefcase} />
                          </button>
                        </div>
                        } 
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

export default TableComponent;
