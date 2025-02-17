import ClientsRepository from "../repositories/clients.repositorie.js";
import ParamsRepository from "../repositories/params.repositorie.js";
import PersonRepository from "../repositories/persons.respositorie.js";
import ServicesRepository from "../repositories/services.repositorie.js";
import { orderWithDate } from "../utils/ordersArray.util.js";
import { response200, response500 } from "../utils/responses.util.js";
import { responseServicesCreator } from "../utils/services.util.js";

/* 
ESTADO_PENDIENTE = 1;
ESTADO_FINALIZADO = 2;
ESTADO_REPROGRAMADO = 3; 
*/

const getServicesController = async (req, res) => {
  try {
    const services = await ServicesRepository.getServicesByState(1);

    if (!services) throw { message: 'Services not found' };
    const responseServices = await responseServicesCreator(services);

    const response = response200('Services found', { 
      services: responseServices,
    });

    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const getServicesBatteryChange = async (req, res) => {
  try {
    const clients = await ClientsRepository.getClientBatteryAlert();

    if (!clients) throw { message: 'Clients not found' };
    const today = new Date()

    const responseServices = [];
    for(const client of clients) {
      const date = client.mt_cli_cambioBateria
      /* 
      se deberia verificar en la tabla de clientes el cambio de bateria no en los servicios
      */
     if (date) {
       const yearToChange = date.getFullYear()  
       const monthToChange = date.getMonth() + 1
       
       if((today.getFullYear() - yearToChange) >= 2 && (today.getMonth() - monthToChange) >= 0) {
         
          const persona = await PersonRepository.getPersonById(client.mt_cli_per_id)
          if(client.mt_cli_id == 14){
  
          }
          responseServices.push({
            cambioBateria: client.mt_cli_cambioBateria.toISOString().split('T')[0],
            client: `${persona.mt_per_nombre} ${persona.mt_per_apellido}`,
            clientID: client.mt_cli_id,
            address: client.mt_cli_direccion,
            tiempoUso: `${today.getFullYear() - yearToChange} AÑOS, ${today.getMonth() + 1 - monthToChange} MESES, ${today.getDate() - date.getDate()} DIAS`,
            observations: client.mt_cli_observaciones,
          })
        }
      }
    }

    const response = response200('Services found', { 
      services: responseServices,
    });
    return res.status(200).json(response);
  }
  catch (error) {
    console.log(error)
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const getServicesPaymentPending = async (req, res) => {
  try {
    const services = await ServicesRepository.getServicesPaymentPending();

    if (!services) throw { message: 'Services not found' };
    
    const responseServices = await responseServicesCreator(services);

    const response = response200('Services found', { 
      services: responseServices,
    });
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const getServiceByIdController = async (req, res) => {
  try {
    const serviceID = req.params.serviceID || null;
    const clientID = req.params.clientID || null;
    
    let service = null, client = null, persona = null;
    if (serviceID != 0){
      service = await ServicesRepository.getServiceById(serviceID);
      client = await ClientsRepository.getClientById(service.tt_srvc_cli_id);
      persona = await PersonRepository.getPersonById(client.mt_cli_per_id);
    }
    else {
      client = await ClientsRepository.getClientById(clientID);
      persona = await PersonRepository.getPersonById(client.mt_cli_per_id);
    }

    const tiposDeServicios = await ParamsRepository.getParamsByCode('TIPO_SERVICIO');
    const tiposDePago = await ParamsRepository.getParamsByCode('TIPO_PAGO');
    
    console.log(client.mt_cli_alertaBateria)
    const services = [];
    if (serviceID != 0){
      services.push({
        precio: service.tt_srvc_precio,
        tipo: service.tt_srvc_tipo,
        cliente: `${persona.mt_per_nombre} ${persona.mt_per_apellido}`,
        direccion: client.mt_cli_direccion,
        tecnico : service.tt_srvc_tecnico,
        observaciones: service.tt_srvc_observaciones,
        estado: service.tt_srvc_estado,
        fecha: service.tt_srvc_fecha ,
        estadoPago: service.tt_srvc_estadoPago,
        formaPago: service.tt_srvc_formaPago,
        pagadoPorCliente: service.tt_srvc_pagadoPorCliente,
        comunicacionTelefonica: service.tt_srvc_comunicacionTelefonica === 1 ? true : false,
        cambioBateria: service.tt_srvc_cambioBateria,
        alertaBateria: client.mt_cli_alertaBateria,
        clientID: service.tt_srvc_cli_id
      })
    }
    else{
      services.push({
        cliente: `${persona.mt_per_nombre} ${persona.mt_per_apellido}`,
        direccion: client.mt_cli_direccion,
        clientID: client.mt_cli_id
      })
    }

    const response = response200('Service found', { services, tiposDePago, tiposDeServicios });
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const getServicesByClientIdController = async (req, res) => {
  try {
    const clientID = req.params.clientID || null;
    const services = await ServicesRepository.getServicesByClientId(clientID);
    const client = await ClientsRepository.getClientById(clientID);
    const persona = await PersonRepository.getPersonById(client.mt_cli_per_id);
    const servicesResponse = [];
    
    if (services) {
      for(const service of services) {
        const tipoDeServicio = await ParamsRepository.getParamsById(service.tt_srvc_tipo);
        servicesResponse.push({
          precio: service.tt_srvc_precio,
          tipo: tipoDeServicio.tt_param_nombre,
          observaciones: service.tt_srvc_observaciones,
          fecha: service.tt_srvc_fecha ,
          tecnico : service.tt_srvc_tecnico,
          estado: service.tt_srvc_estado,
          estadoPago: service.tt_srvc_estadoPago,
          serviceID: service.tt_srvc_id,
          clientID
        })
      }
    }
    
    const response = response200('Services found', { 
      services: servicesResponse, 
      client: { 
        nombre: `${persona.mt_per_nombre} ${persona.mt_per_apellido}`,
        direccion: `${client.mt_cli_direccion}, ${client.mt_cli_localidad}, ${client.mt_cli_provincia}`,
        telefono: client.mt_cli_telefono,
        telefono2: client.mt_cli_telefono2,
        clientID,
        cambioBateria: client.mt_cli_cambioBateria ? client.mt_cli_cambioBateria.toISOString().split('T')[0] : null,
        alertaBateria: client.mt_cli_alertaBateria === 1 ? true : false,
      }
    });
    return res.status(200).json(response);
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const updateServiceByIdController = async (req, res) => {
  try {
    const data = req.body;
    const serviceID = req.params.serviceID || null;
    
    console.log(data)
    const clientUpdate = await ClientsRepository.updateClientBatteryById({ cambioBateria: data.cambioBateria ? data.cambioBateria : null, alertaBateria: data.alertaBateria }, data.clientID);
    
    if (serviceID == 0){
      await ServicesRepository.createService(data);
      return res.status(200).json({ ok: true })
    }
    
    await ServicesRepository.updateService(data, serviceID);

    return res.status(200).json({ ok: true })
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const deleteServiceByIdController = async (req, res) => {
  try {
    const serviceID = Number(req.params.serviceID) || null;
    await ServicesRepository.deleteService(serviceID);

    return res.status(200).json({ ok: true })
  }
  catch (error) {
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

const createServiceController = async (req, res) => {
  try{
    const data = req.body;
    
    const clientID = data.clientID || null;
    const updateClientBatteryById = await ClientsRepository.updateClientBatteryById({ cambioBateria: data.cambioBateria ? data.cambioBateria : null, alertaBateria: !data.alertaBateria }, data.clientID);
    const newService = await ServicesRepository.createService(data, clientID);
    
    const response = response200('Service created', {
      service: newService
    })
    return res.status(200).json(response)
  }
  catch (error) {
    console.log(error)
    const response = response500('INTERNAL SERVER ERROR', { detail: error.message });
    return res.status(500).json(response)
  }
}

export { 
  getServicesController, 
  getServicesBatteryChange, 
  getServicesPaymentPending, 
  getServiceByIdController, 
  updateServiceByIdController,
  deleteServiceByIdController,
  getServicesByClientIdController,
  createServiceController,
}