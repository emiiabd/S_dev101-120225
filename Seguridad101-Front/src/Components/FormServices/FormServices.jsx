import React, { useState, useEffect } from 'react';
import { Card, Form, FormControl, FormGroup, FormLabel, Button, Row, Col, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ModalBasic from '../ModalBasic/ModalBasic';


const FormServices = ( {type, payload, isLoadingServices, formInputs, formData, setFormData, handleOnSubmit, handleOnDelete} ) => {
  const [view, setView] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if(payload.services){
      for(const element in formInputs) {
        if(payload.services[0][element]){
          formInputs[element] = payload.services[0][element]
        }
      }
      setFormData( {tiposDePago: payload.tiposDePago, tiposDeServicio: payload.tiposDeServicios, formInputs: formInputs})
    }

    if (type === 'view') {
      setView(true)
    } else {
      setView(false)
    }
    
  }, [isLoadingServices]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      formInputs: {...formData.formInputs, [e.target.name]: e.target.value}
    });
  };

  const handleCheckboxChange = (e) => {
    if (e.target.name === 'cambioBateria') {
      let fechaDeCambio = new Date().toISOString();

      if (!e.target.checked){
        fechaDeCambio = payload.services[0].cambioBateria
      } 
      
      setFormData({
        ...formData,
        formInputs: {...formData.formInputs, [e.target.name]: fechaDeCambio}
      });
    }
    else {
      setFormData({
        ...formData,
        formInputs: {...formData.formInputs, [e.target.name]: e.target.checked}
      });
    }
  };

  

  console.log(formData)
  return (
    <Card >
      <ModalBasic title="Eliminar servicio" text="¿Desea eliminar el servicio?" modalState={viewModal} handleSubmit={handleOnDelete} handleClose={() => setViewModal(false)}/>
      {
        isLoadingServices ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div> 
        :
      (
      <>
      <Card.Header>
        <div className="row my-3">
          <h2>{type === 'view' ? 'Visualización de servicio' : type === 'edit' ? 'Edición de servicio' : 'Creación de servicio'}</h2>
        </div>
        <div className="row my-3">
          <div className="col d-flex align-items-center">
            <h4 className='m-0 me-2'> Nombre: </h4>
            <p className='m-0 fs-5'>{formData.formInputs.cliente}</p>
          </div>
          <div className="col d-flex align-items-center">
            <h4 className='m-0 me-2'>Direccion: </h4>
            <p className='m-0 fs-5'>{formData.formInputs.direccion}</p>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <Row className="my-3">
            <FormGroup as={Col}>
              <FormLabel htmlFor="tipo">Tipo de servicio</FormLabel>
              <FormControl as="select" name="tipo" id="tipo" onChange={handleInputChange} value={formData.formInputs.tipo} disabled={view} >
                <option value="">Seleccione un servicio</option>
                {formData.tiposDeServicio.length > 0 && formData.tiposDeServicio.map(item => <option key={item.tt_param_id} value={item.tt_param_id}>{item.tt_param_nombre}</option>)}
              </FormControl>
            </FormGroup>
            <FormGroup as={Col}>
              <FormLabel htmlFor="fecha">Fecha</FormLabel>
              <FormControl type="date" name="fecha" id="fecha" value={formData.formInputs.fecha ? formData.formInputs.fecha.split('T')[0] : ''} onChange={handleInputChange} disabled={view} />
            </FormGroup>
          </Row>
          <Row className="my-3">
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="precio">Precio</FormLabel>
              <FormControl type="text" name="precio" id="precio" value={formData.formInputs.precio} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="pagadoPorCliente">Pago Parcial</FormLabel>
              <FormControl type="text" name="pagadoPorCliente" id="pagadoPorCliente" value={formData.formInputs.pagadoPorCliente} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="tecnico">Técnico</FormLabel>
              <FormControl type="text" name="tecnico" id="tecnico" value={formData.formInputs.tecnico} onChange={handleInputChange} disabled={view} />
            </FormGroup>
          </Row>
          <Row className="my-3 align-items-center justify-content-center">
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="estado">Estado</FormLabel>
              <FormControl as="select" name="estado" id="estado" value={formData.formInputs.estado} onChange={handleInputChange} disabled={view}>
                <option value="">Seleccione un estado</option>
                <option value="1">Pendiente</option>
                <option value="2">Finalizado</option>
                <option value="3">Reprogramado</option>
              </FormControl>
            </FormGroup>
            <FormGroup as={Col} md={3} className='mt-3'>
              <Form.Check 
                type="switch"
                id="estadoPago" 
                name="estadoPago" 
                checked={formData.formInputs.estadoPago} 
                onChange={handleCheckboxChange}
                label="Servicio pagado"
                disabled={view}
                />
              <Form.Check 
                type="switch"
                id="comunicacionTelefonica" 
                name="comunicacionTelefonica" 
                checked={formData.formInputs.comunicacionTelefonica} 
                onChange={handleCheckboxChange}
                label="Comunicación Telefónica"
                disabled={view}
                />
            </FormGroup>
            <FormGroup as={Col} md={3} className='mt-3'>
              <Form.Check 
                type="switch"
                id="cambioBateria" 
                name="cambioBateria" 
                onChange={handleCheckboxChange}
                label="Se cambió de batería?"
                disabled={view}
                />
              <Form.Check 
                type="switch"
                id="alertaBateria" 
                name="alertaBateria" 
                checked={formData.formInputs.alertaBateria} 
                onChange={handleCheckboxChange}
                label="El cliente no requiere seguimiento"
                disabled={view}
                />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="formaPago">Forma de Pago</FormLabel>
              <FormControl as="select" name="formaPago" id="formaPago" value={formData.formInputs.formaPago} onChange={handleInputChange} disabled={view}>
                <option value="">Seleccione una forma de pago </option>
                {formData.tiposDePago.map(item => <option key={ item.tt_param_id } value={item.tt_param_id}>{item.tt_param_nombre}</option>)}
              </FormControl>
            </FormGroup>
          </Row>
          <Row className="my-3">
          {  
            formData.formInputs.cambioBateria 
            && 
            formData.formInputs.cambioBateria.length > 0 
            &&
            !formData.formInputs.alertaBateria
            &&
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="cambioBateria">Fecha de cambio de bateria:</FormLabel>
              <FormControl type="date" name="cambioBateria" id="cambioBateria" value={formData.formInputs.cambioBateria ? formData.formInputs.cambioBateria.split('T')[0] : ''} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            
            }
          </Row>
          <Row className="my-4">
            <FormGroup as={Col}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Trabajo Realizado: </Accordion.Header>
                <Accordion.Body className='p-0 '>
                  <FormControl as="textarea" style={{ height: '100px' }} name="observaciones" id="observaciones" value={formData.formInputs.observaciones} onChange={handleInputChange} disabled={view}/>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </FormGroup>
          </Row>

          <div className='d-flex justify-content-between my-3'>
            <div>
              <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
            </div>
            <div className='d-flex gap-2'>
            <Button variant="primary" disabled={view} type='submit' hidden={type === 'view' ? true : false}>Guardar</Button>
            <Button variant="danger" disabled={view} onClick={() => setViewModal(true)} hidden={type === 'new' ? true : false || type === 'view' ? true : false}>Eliminar</Button>
            </div>
          </div>

        </Form>
      </Card.Body>
    </>
      )
  }
    </Card>
    
  );
};

export default FormServices;