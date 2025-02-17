import React, { useState, useEffect } from 'react';
import { Card, Form, FormControl, FormGroup, FormLabel, Button, Row, Col, Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useServices } from '../../Hooks';
import { DELETE, POST, PUT } from '../../fetching/http.fetching';
import ModalBasic from '../ModalBasic/ModalBasic';


const FormClient = ( {type, clientID, payload, isLoadingServices} ) => {
  const [view, setView] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const navigate = useNavigate();

  const formInputs = {
    clientID: '',
    personID: '',
    nombre: '',
    apellido: '',
    direccion: '',
    fecha_nacimiento: '',
    telefono: '',
    tipo_consumidor: '',
    banco: '',
    tipo_cuenta: '',
    cbu: '',
    provincia: '',
    localidad: '',
    cuil: '',
    telefono2: '',
    observaciones: '',
    tipo_cliente: '',
    email: '',
  };

  const [formData, setFormData] = useState({
    formInputs,
    tiposDeCuenta: [],
    tiposDeConsumidor: [],
    tiposDeCliente: [],
  });


  useEffect(() => {
    if(clientID != '0' && !isLoadingServices) {
      for(const element in formInputs) {
        formInputs[element] = payload.clients[0][element]
      }
    }
    
    if (!isLoadingServices) {
      setFormData( {tiposDeCuenta: payload.tiposDeCuenta, tiposDeConsumidor: payload.tiposDeConsumidor, tiposDeCliente: payload.tiposDeCliente, formInputs: formInputs})
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

  const handleOnSubmit = async (e) =>{
    try{
      e.preventDefault();
      const response = await POST(`api/clients/edit/${clientID}`, formData.formInputs);
      navigate(-1);
    }
    catch(error){
      console.log(error)
    }
  }

  const handleOnDelete = (e) =>{
    try{
      e.preventDefault();
      DELETE(`api/clients/edit/${clientID}`);
      navigate(-1);
    }
    catch(error){
      console.log(error)
    }
  }

  console.log(isLoadingServices)


  return (
    <Card >
      <ModalBasic title="Eliminar cliente" text="¿Desea eliminar el cliente de la base de datos?" modalState={viewModal} handleSubmit={handleOnDelete} handleClose={() => setViewModal(false)}/>
      {
        isLoadingServices ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> 
        :
      (
      <>
      <Card.Header>
        <div className="row my-3">
          <h2>{type === 'view' ? 'Visualización de cliente' : clientID == '0' ? 'Nuevo cliente' : 'Edición de cliente'}</h2>
        </div>
        {  
        clientID != '0' &&
        <div className="row my-3">
          <div className="col d-flex align-items-center">
            <h4 className='m-0 me-2'> Nombre y Apellido: </h4>
            <p className='m-0 fs-5'>{formData.formInputs.nombre} {formData.formInputs.apellido}</p>
          </div>
          <div className="col d-flex align-items-center">
            <h4 className='m-0 me-2'>Direccion: </h4>
            <p className='m-0 fs-5'>{formData.formInputs.direccion}</p>
          </div>
        </div>
        }
      </Card.Header>
      <Card.Body>
        <Form onSubmit={(e) => handleOnSubmit(e)}>
          <Row className="my-3">
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="nombre">Nombre: </FormLabel>
              <FormControl type="text" name="nombre" id="nombre" value={formData.formInputs.nombre} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="apellido">Apellido: </FormLabel>
              <FormControl type="text" name="apellido" id="apellido" value={formData.formInputs.apellido} onChange={handleInputChange} disabled={view} />
            </FormGroup>
          </Row>
          <Row className="my-3">
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="provincia">Provincia: </FormLabel>
              <FormControl type="text" name="provincia" id="provincia" value={formData.formInputs.provincia} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="localidad">Localidad: </FormLabel>
              <FormControl type="text" name="localidad" id="localidad" value={formData.formInputs.localidad} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="direccion">Direccion: </FormLabel>
              <FormControl type="text" name="direccion" id="direccion" value={formData.formInputs.direccion} onChange={handleInputChange} disabled={view} />
            </FormGroup>
          </Row>
          <Row className="my-3">
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="fecha_nacimiento">fecha de nacimiento: </FormLabel>
              <FormControl type="date" name="fecha_nacimiento" id="fecha_nacimiento" value={formData.formInputs.fecha_nacimiento ? formData.formInputs.fecha_nacimiento.split('T')[0] : ''} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="cuil">Cuit/Cuil: </FormLabel>
              <FormControl type="text" name="cuil" id="cuil" value={formData.formInputs.cuil} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="tipo_consumidor">Tipo de consumidor</FormLabel>
              <FormControl as="select" name="tipo_consumidor" id="tipo_consumidor" onChange={handleInputChange} disabled={view} value={formData.formInputs.tipo_consumidor ? formData.formInputs.tipo_consumidor : 'null'}>
                <option value='null'>Seleccione tipo de consumidor</option>
                {formData.tiposDeConsumidor.length > 0 && formData.tiposDeConsumidor.map(item => <option key={item.tt_param_id} value={item.tt_param_id}>{item.tt_param_nombre}</option>)}
              </FormControl>
            </FormGroup>
          </Row>
          <Row className="my-3">
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="telefono">Telefono 1: </FormLabel>
              <FormControl type="text" name="telefono" id="telefono" value={formData.formInputs.telefono} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="telefono2">Telefono 2: </FormLabel>
              <FormControl type="text" name="telefono2" id="telefono2" value={formData.formInputs.telefono2} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={6}>
              <FormLabel htmlFor="email">Email: </FormLabel>
              <FormControl type="text" name="email" id="email" value={formData.formInputs.email} onChange={handleInputChange} disabled={view} />
            </FormGroup>
          </Row>
          <Row className="my-3">
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="banco">Banco: </FormLabel>
              <FormControl type="text" name="banco" id="banco" value={formData.formInputs.banco} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="tipo_cuenta">Tipo de cuenta: </FormLabel>
              <FormControl as="select" name="tipo_cuenta" id="tipo_cuenta" onChange={handleInputChange} disabled={view} value={formData.formInputs.tipo_cuenta ? formData.formInputs.tipo_cuenta : 'null'}>
                <option value='null'>Seleccione tipo de cuenta</option>
                {formData.tiposDeCuenta.length > 0 && formData.tiposDeCuenta.map(item => <option key={item.tt_param_id} value={item.tt_param_id}>{item.tt_param_nombre}</option>)}
              </FormControl>
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="cbu">CBU:  </FormLabel>
              <FormControl type="text" name="cbu" id="cbu" value={formData.formInputs.cbu} onChange={handleInputChange} disabled={view} />
            </FormGroup>
            <FormGroup as={Col} md={3}>
              <FormLabel htmlFor="tipo_cliente">Tipo de cliente</FormLabel>
              <FormControl as="select" name="tipo_cliente" id="tipo_cliente" onChange={handleInputChange} disabled={view} value={formData.formInputs.tipo_cliente ? formData.formInputs.tipo_cliente : 'null'} >
                <option value='null'>Seleccione tipo de cliente</option>
                {formData.tiposDeCliente.length > 0 && formData.tiposDeCliente.map(item => <option key={item.tt_param_id} value={item.tt_param_id}>{item.tt_param_nombre}</option>)}
              </FormControl>
            </FormGroup>
          </Row>
          <Row className="my-4">
            <FormGroup as={Col}>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Observaciones </Accordion.Header>
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
            <Button variant="primary" disabled={view} type='submit'>Guardar</Button>
            <Button variant="danger" disabled={view} onClick={() => setViewModal(true)} hidden={clientID == '0'}>Eliminar</Button>
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

export default FormClient;