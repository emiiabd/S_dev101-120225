import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faInfo, faBriefcase, faPlus, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Accordion, Col, Form, FormControl, FormGroup, FormLabel, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./TableProductsClients.css";
import { DELETE, POST } from "../../fetching/http.fetching";

const TableProductsClients = ({ data, client, isLoading }) => {
  const navigate = useNavigate();
  const [showItems, setShowItems] = useState(10);
  const [viewModal, setViewModal] = useState({view: false, success: false});

  const formInputs = {
    nombre: '',
    fecha: '',
    observaciones: '',
  };

  const [formData, setFormData] = useState({formInputs});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      formInputs: {...formData.formInputs, [e.target.name]: e.target.value}
    });
  };

  const handleOnSubmit = async (e) =>{
    try{
      e.preventDefault();
      data.push(formData.formInputs);
      const response = await POST(`api/clients/products/${client.clientID}`, data);

      setViewModal({view: true, success: true});
    }
    catch(error){
      console.log(error)
    }
  }

  const handleOnDelete = async (e, nombre) =>{
    try{
      const newArray = data.filter(item => item.nombre !== nombre)
      const response = await POST(`api/clients/products/${client.clientID}`, newArray);
      setViewModal({view: true, success: true});
    }
    catch(error){
      console.log(error)
    }
  }

  const handleShowItems = (e) => {
    setShowItems(e.target.value);
  };

  console.log(data);
  return (
    <div className="p-3 bg-white">
      
      {
        isLoading ?
        <></> 
        :
        <>
        <Modal show={viewModal.view} onHide={() => setViewModal({view: !viewModal, success: false})} size="md">
        <Modal.Header closeButton>
          <Modal.Title>{client.nombre}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            viewModal.success ?
            <div className="alert alert-success" role="alert">
              Producto modificado con éxito
            </div>
            :
            
            <Form onSubmit={(e) => handleOnSubmit(e)}>
              <Row className="my-3 g-2">
                <FormGroup as={Col} md={12}>
                  <FormLabel htmlFor="nombre">Nombre del producto: </FormLabel>
                  <FormControl type="text" name="nombre" id="nombre" value={formData.formInputs.nombre} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup as={Col} md={12}>
                  <FormLabel htmlFor="fecha">Fecha de instalación: </FormLabel>
                  <FormControl type="date" name="fecha" id="fecha" value={formData.formInputs.fecha} onChange={handleInputChange} />
                </FormGroup>
                <FormGroup as={Col} md={12}>
                  <FormLabel htmlFor="observaciones">Observaciones: </FormLabel>
                  <FormControl as={"textarea"} rows={3} name="observaciones" id="observaciones" value={formData.formInputs.observaciones} onChange={handleInputChange} />
                </FormGroup>
              </Row>
            </Form>
          }
        </Modal.Body>
        <Modal.Footer>
          {
            viewModal.success 
            ?
            <button className="btn btn-secondary" onClick={() => (setViewModal({view: !viewModal, success: false}), navigate(0))}>
              Cerrar
            </button>
            :
            <button className="btn btn-success" onClick={handleOnSubmit}>
              Aceptar
            </button>

          }
        </Modal.Footer>
      </Modal>
        <div className="row border-bottom pb-3">
          <div className="col-12 text-center my-3">
            <h3 className="fw-semibold fs-3 ">Productos instalados</h3>
          </div>
          <div className="col-12 text-center text-md-start col-md-6 fs-5 pt-2 ">
            <p className="text-muted">{client.nombre}</p>
            <span className="text-muted">{client.telefono} {client.telefono2 ? " - " + client.telefono2 : ""}</span>
          </div>
          <div className="col-12 col-md-6 fs-5 text-center text-md-end pt-2 mt-3 mt-md-0 ">
            <p className="text-muted">{client.direccion}</p>
          </div>
          <div className="col-12 col-md-6 fs-6 text-center text-md-start pt-2 mt-3 mt-md-0 ">
            <p className="text-muted p-0 m-0"><strong>Ultimo cambio de bateria:  </strong>{client.cambioBateria}</p>
            {
              !client.alertaBateria ?
              <p className="text-muted pt-1 m-0 text-decoration-underline"><strong>El cliente no requiere seguimiento de bateria</strong></p>
              :
              <></>
            }
          </div>
        </div>
        </>
      }
      <div className="row align-items-center my-3">
        <div className="col  d-flex align-items-center p-3 gap-2">
          <p className="m-0">Mostrar</p>
          <input type="text" className="form-control input-show" aria-label="" value={showItems} onChange={handleShowItems} />
          {
            isLoading ?
            <></> 
            :
            <span className="text-muted"> total: {data.length}</span>
          }
        </div>
        <div className="col d-flex justify-content-end pe-5 gap-2">
          <button className="btn btn-secondary" onClick={() => navigate(`/log/s101/services/${client.clientID}`) }>
            Volver
          </button>
          <button className="btn btn-primary" onClick={() => setViewModal({view: true, success: false}) }>
            Añadir
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 pt-3">
          <div className="row">
            <p className="col col-md-3 fw-medium fs-5 text-center d-md-block">Producto</p>
            <p className="col col-md-3 fw-medium fs-5 text-center d-none d-md-block">Fecha de instalacion</p>
            <p className="col col-md-5 fw-medium fs-5 text-center d-none d-md-block">Observaciones</p>
            <div className="col col-md-1 " >
            </div>
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
                  <div className="row border py-3" key={index}>
                    <p className="col col-md-3 text-center m-0 align-self-center d-md-block">{item.nombre}</p>
                    <p className="col col-md-3 text-center m-0 align-self-center d-none d-md-block">{item.fecha}</p>
                    <p className="col col-md-5 text-center m-0 align-self-center d-none d-md-block">{item.observaciones}</p>
                    <div className="col col-md-1 d-flex flex-row align-items-center justify-content-center gap-2" z-index="2">
                      <a className="btn btn-danger btn-sm" onClick={(e) =>{handleOnDelete(e, item.nombre)}}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </a>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default TableProductsClients;
